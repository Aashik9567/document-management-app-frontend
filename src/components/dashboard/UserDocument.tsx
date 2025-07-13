import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FileText,
  Search,
  Download,
  Eye,
  Edit3,
  Share2,
  Trash2,
  Calendar,
  Clock,
  FolderOpen,
  Grid3X3,
  List,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { getUserDocuments } from "../../endpoints/userDocument/getUserDocument";
import { deleteUserDocument } from "../../endpoints/userDocument/deleteUserDocument";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../states/authStore";

interface DocumentType {
  id: string;
  name: string;
  category: string;
  icon: string | null;
}
interface Document {
  id: string;
  title: string;
  status: "Draft" | "Completed" | "Archived" | "Published";
  createdAt: string;
  updatedAt: string;
  lastGeneratedAt: string | null;
  version: number;
  documentType: DocumentType;
}

const statusColors = {
  completed: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
  archived: "bg-gray-50 text-gray-700 border-gray-200",
  published: "bg-blue-50 text-blue-700 border-blue-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

const docIcons = {
  nda: "📄",
  contract: "📋",
  agreement: "🤝",
  letter: "✉️",
  default: "📄",
};

export default function UserDocument() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "draft" | "completed" | "archived">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const queryClient = useQueryClient();
  const { user, isAuthenticated} = useAuthStore();
  const token = localStorage.getItem("token");
 



  const {
    data: documentsResponse,
    isLoading,
    isRefetching,
    error,
    refetch: refetchUserDocuments,
  } = useQuery({
    queryKey: ["user-documents"],
    queryFn: getUserDocuments,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });


  useEffect(() => {
    refetchUserDocuments();
  },[user, isAuthenticated, token]);


  const { mutate: deleteDocument, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserDocument,
    onSuccess: () => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.message || "Failed to delete document";
      toast.error(errorMessage);
    },
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  const handleDeleteClick = (doc: Document) => {
    setDocumentToDelete(doc);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => documentToDelete && deleteDocument(documentToDelete.id);
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const documents: Document[] = documentsResponse?.data || [];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      || doc.documentType.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || doc.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "name": return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const filterOptions = [
    { value: "all", label: "All Documents", count: documents.length },
    { value: "draft", label: "Drafts", count: documents.filter((d) => d.status.toLowerCase() === "draft").length },
    { value: "completed", label: "Completed", count: documents.filter((d) => d.status.toLowerCase() === "completed").length },
    { value: "archived", label: "Archived", count: documents.filter((d) => d.status.toLowerCase() === "archived").length },
  ];

  if (isLoading || isRefetching) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (<div key={i} className="h-20 bg-gray-200 rounded-xl"></div>))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-red-100 mb-6">
              <FileText className="h-10 w-10 text-red-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Error loading documents</h4>
            <p className="text-sm text-gray-600 mb-4">
              {error instanceof Error ? error.message : "Something went wrong while fetching your documents"}
            </p>
            <button
              onClick={() => refetchUserDocuments()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-100/70">
      {/* Header */}
      <div className="p-7 border-b border-gray-200 bg-white/80 rounded-t-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 text-white shadow-lg">
              <FolderOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">My Documents</h3>
              <p className="text-base text-gray-500 mt-1">
                {documents.length} document{documents.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/document/create")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow"
          >
            <Plus className="h-4 w-4" />
            New Document
          </button>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50 shadow-sm"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50 shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-gray-50">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2.5 transition-colors", viewMode === "grid"
                  ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2.5 transition-colors", viewMode === "list"
                  ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Documents Content */}
      <div className="p-7">
        {sortedDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-gray-100 mb-6 shadow-md">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedFilter !== "all" ? "No documents found" : "No documents created"}
            </h4>
            <p className="text-gray-600 mb-6 max-w-md">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first document. Choose from templates or start from scratch."}
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-all shadow">
              <Plus className="h-4 w-4" />
              Create Your First Document
            </button>
          </div>
        ) : (
          <div className={cn("grid gap-7",
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="group relative flex flex-col rounded-2xl bg-white border-0 shadow-[0_8px_32px_0_rgba(60,120,220,0.13),_0_2px_8px_0_rgba(80,80,120,0.10)] hover:shadow-[0_16px_48px_0_rgba(60,120,220,0.20),_0_4px_16px_0_rgba(80,80,120,0.12)] transition-all duration-300"
              >
                {/* Top Section: Icon & Status */}
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 max-w-[75%]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-2xl shadow">
                      {docIcons[(doc.documentType.name || "").toLowerCase() as keyof typeof docIcons] || docIcons.default}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-base truncate">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-gray-500 capitalize truncate">
                        {doc.documentType.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap shadow",
                        statusColors[doc.status.toLowerCase() as keyof typeof statusColors] || statusColors.default
                      )}
                    >
                      {doc.status}
                    </div>
                  </div>
                </div>
                {/* Date Info */}
                <div className="flex flex-wrap gap-6 p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 border border-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDate(doc.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 border border-purple-100">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Updated</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDate(doc.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Footer Actions */}
                <div className="flex items-center justify-between p-6">
                  <div className="flex gap-3">
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors shadow">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-colors shadow">
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors shadow">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors shadow">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(doc);
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 className={`h-5 w-5 ${isDeleting ? "text-gray-400" : "text-red-500"}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <DialogTitle>Delete Document</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                "{documentToDelete?.title}"
              </span>
              ? This will permanently remove the document and all its associated data.
            </p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="flex-1 hover:cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-800 hover:cursor-pointer hover:bg-gray-100 hover:text-red-900"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}