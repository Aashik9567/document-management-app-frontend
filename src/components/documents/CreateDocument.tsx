import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  FileText, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  Plus,
  ArrowLeft
} from "lucide-react";
import { getDocumentTypes } from "../../endpoints/userDocument/getDocumentTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import type { DocumentType } from "../../types/document";


interface DocumentTypesResponse {
  success: boolean;
  data: DocumentType[];
  message?: string;
}

export default function CreateDocument() {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: documentTypesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<DocumentTypesResponse>({
    queryKey: ["document-types"],
    queryFn: getDocumentTypes,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const documentTypes = documentTypesResponse?.data || [];

  // Filter document types based on search term
  const filteredDocumentTypes = documentTypes.filter((docType) =>
    docType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docType.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group document types by category
  const groupedDocumentTypes = filteredDocumentTypes.reduce((acc, docType) => {
    if (!acc[docType.category]) {
      acc[docType.category] = [];
    }
    acc[docType.category].push(docType);
    return acc;
  }, {} as Record<string, DocumentType[]>);

  const getDocumentIcon = (type: string, icon: string | null) => {
    if (icon) return icon;
    
    switch (type.toLowerCase()) {
      case "nda":
      case "non-disclosure agreement":
        return "🔒";
      case "contract":
        return "📋";
      case "agreement":
        return "🤝";
      case "letter":
        return "✉️";
      case "invoice":
        return "💰";
      case "proposal":
        return "📊";
      case "report":
        return "📈";
      case "memo":
        return "📝";
      default:
        return "📄";
    }
  };

  const handleDocumentTypeSelect = (documentType: DocumentType) => {
    setSelectedDocumentId(documentType.id);
    // Here you can add logic to proceed to the next step
    console.log("Selected document type:", documentType);
  };

  const handleBackToSelection = () => {
    setSelectedDocumentId(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Loading Document Types</h3>
                <p className="text-sm text-gray-600 mt-1">Please wait while we fetch available templates...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Error Loading Document Types</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {error instanceof Error ? error.message : "Something went wrong"}
                </p>
              </div>
              <Button onClick={() => refetch()} className="w-full">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no document type is selected, show selection interface
  if (!selectedDocumentId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Document</h1>
            <p className="text-lg text-gray-600 mt-2">
              Choose a document type to get started with your template
            </p>
          </div>

          {/* Document Types Grid */}
          {filteredDocumentTypes.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Document Types Found</h3>
                <p className="text-gray-600">
                  {searchTerm ? "Try adjusting your search criteria" : "No document types are available at the moment"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedDocumentTypes).map(([category, types]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {types.length} {types.length === 1 ? 'template' : 'templates'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {types.map((docType) => (
                      <Card
                        key={docType.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
                        onClick={() => handleDocumentTypeSelect(docType)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-2xl group-hover:bg-blue-100 transition-colors">
                                {getDocumentIcon(docType.name, docType.icon)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                  {docType.name}
                                </CardTitle>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs mt-1 capitalize"
                                >
                                  {docType.category}
                                </Badge>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // If a document type is selected, show the selected state (you can expand this)
  const selectedDocumentType = documentTypes.find(dt => dt.id === selectedDocumentId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToSelection}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Selection
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-2xl">
              {getDocumentIcon(selectedDocumentType?.name || '', selectedDocumentType?.icon || null)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create {selectedDocumentType?.name}
              </h1>
              <p className="text-gray-600">
                Selected document type: {selectedDocumentType?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Document creation form would go here */}
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
            <CardDescription>
              Fill in the details for your new {selectedDocumentType?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title
                </label>
                <Input
                  placeholder={`Enter ${selectedDocumentType?.name} title`}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <Input
                  placeholder="Brief description of the document"
                  className="w-full"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1">
                  Create Document
                </Button>
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}