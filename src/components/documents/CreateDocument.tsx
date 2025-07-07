import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles
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

  const {
    data: documentTypesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<DocumentTypesResponse>({
    queryKey: ["document-types"],
    queryFn: getDocumentTypes,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const documentTypes = documentTypesResponse?.data || [];

  // Group document types by category for better organization
  const groupedDocumentTypes = documentTypes.reduce((acc, docType) => {
    const category = docType.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(docType);
    return acc;
  }, {} as Record<string, DocumentType[]>);

  const categoryColors = {
    "Legal": "from-red-500 to-pink-500",
    "HR": "from-blue-500 to-cyan-500", 
    "Business": "from-green-500 to-emerald-500",
    "Employment": "from-purple-500 to-indigo-500",
    "Other": "from-gray-500 to-slate-500"
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors["Other"];
  };

  const getDocumentIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    
    if (normalizedType.includes("nda") || normalizedType.includes("non-disclosure")) {
      return "🔐";
    } else if (normalizedType.includes("offer letter") || normalizedType.includes("offer")) {
      return "💼";
    } else if (normalizedType.includes("resignation") || normalizedType.includes("regination")) {
      return "📤";
    } else if (normalizedType.includes("service agreement") || normalizedType.includes("service")) {
      return "🤝";
    } else if (normalizedType.includes("experience certificate") || normalizedType.includes("experience")) {
      return "🎓";
    } else if (normalizedType.includes("recommendation") || normalizedType.includes("reference")) {
      return "⭐";
    } else {
      return "📄";
    }
  };

  const handleDocumentTypeSelect = (documentType: DocumentType) => {
    setSelectedDocumentId(documentType.id);
    console.log(`Selected Document Type: ${documentType.name}`);
    console.log(`Document Type ID: ${documentType.id}`);
  };

  const handleBackToSelection = () => {
    setSelectedDocumentId(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Templates</h3>
          <p className="text-gray-600">Fetching available document types...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">Unable to load document templates</p>
          <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Document type selection view
  if (!selectedDocumentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-6">
              <Plus className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Document</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professional templates to get started
            </p>
          </div>

          {/* Document Types Grid */}
          {documentTypes.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-6">
                <Plus className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No templates available</h3>
              <p className="text-gray-600 text-lg">
                No document templates are currently available
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedDocumentTypes).map(([category, types]) => (
                <div key={category} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                      <Badge 
                        variant="secondary" 
                        className="text-sm font-semibold bg-gray-100 text-gray-700"
                      >
                        {types.length} template{types.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                  </div>

                  {/* Document Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {types.map((docType) => (
                      <Card
                        key={docType.id}
                        className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/90 backdrop-blur-sm overflow-hidden"
                        onClick={() => handleDocumentTypeSelect(docType)}
                      >
                        <div className={`h-2 bg-gradient-to-r ${getCategoryColor(docType.category || "Other")}`}></div>
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`flex items-center justify-center w-18 h-18 rounded-2xl bg-gradient-to-r ${getCategoryColor(docType.category || "Other")} text-4xl group-hover:shadow-lg transition-all duration-300 shadow-md`}>
                              {getDocumentIcon(docType.name)}
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                {docType.name}
                              </h3>
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                              >
                                {docType.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
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

  // Document creation form
  const selectedDocumentType = documentTypes.find(dt => dt.id === selectedDocumentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBackToSelection}
            className="flex items-center gap-2 border-2 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryColor(selectedDocumentType?.category || "Other")} text-3xl shadow-lg`}>
                {getDocumentIcon(selectedDocumentType?.name || '')}
              </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create {selectedDocumentType?.name}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Professional template ready to customize
              </p>
            </div>
          </div>
        </div>

        {/* Creation Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Document Details</CardTitle>
            <CardDescription className="text-lg">
              Fill in the details for your new {selectedDocumentType?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Document Title
              </label>
              <Input
                placeholder={`Enter ${selectedDocumentType?.name} title`}
                className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Description (Optional)
              </label>
              <Input
                placeholder="Brief description of the document"
                className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button 
                size="lg" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Document
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 h-12 text-lg border-2 hover:bg-gray-50"
              >
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}