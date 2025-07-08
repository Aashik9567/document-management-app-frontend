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
import { getDocumentTypeById } from "../../endpoints/userDocument/getDocumentTypeById";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import DynamicDocumentForm from "../../components/forms/DynamicDocumentForm";
import type { DocumentType } from "../../types/document";

interface DocumentTypesResponse {
  success: boolean;
  data: DocumentType[];
  message?: string;
}

export default function CreateDocument() {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Fetch document types for selection
  const {
    data: documentTypesResponse,
    isLoading: isLoadingTypes,
    error: typesError,
    refetch: refetchTypes,
  } = useQuery<DocumentTypesResponse>({
    queryKey: ["document-types"],
    queryFn: getDocumentTypes,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch specific document type details when one is selected
  const {
    data: documentTypeDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ["document-type-details", selectedDocumentId],
    queryFn: () => getDocumentTypeById(selectedDocumentId!),
    enabled: !!selectedDocumentId,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const documentTypes = documentTypesResponse?.data || [];

  // Group document types by category for better organization
  const groupedDocumentTypes = documentTypes.reduce((acc, docType) => {
    const category = docType.category || "Available Document Templates";
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
    "professional": "from-orange-500 to-amber-500",
    "Available Document Templates": "from-gray-500 to-slate-500"
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors["Available Document Templates"];
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
    console.log(`Document Type Category: ${documentTypeDetails?.data}`);
  };

  const handleBackToSelection = () => {
    setSelectedDocumentId(null);
  };

  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
    // Example: createDocument(formData)
  };

  const handleSaveDraft = (formData: Record<string, any>) => {
    console.log('Draft saved:', formData);
    // Here you would typically save the draft to your API
    // Example: saveDraft(formData)
  };

  // Loading state for document types
  if (isLoadingTypes) {
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

  // Error state for document types
  if (typesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">Unable to load document templates</p>
          <Button onClick={() => refetchTypes()} className="bg-red-600 hover:bg-red-700">
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Create Document</h1>
                <p className="text-gray-600 mt-1">Select a template to get started</p>
              </div>
            </div>
          </div>

          {/* Document Types Grid */}
          {documentTypes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No templates available</h3>
              <p className="text-gray-500">
                No document templates are currently available
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedDocumentTypes).map(([category, types]) => (
                <div key={category} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-medium text-gray-900">{category}</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {types.length} template{types.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Document Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {types.map((docType) => (
                      <Card
                        key={docType.id}
                        className="cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                        onClick={() => handleDocumentTypeSelect(docType)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
                              {getDocumentIcon(docType.name)}
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-base font-medium text-gray-900 leading-tight">
                                {docType.name}
                              </h3>
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

  // Document creation form view
  const selectedDocumentType = documentTypes.find(dt => dt.id === selectedDocumentId);

  // Loading state for document details
  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Form</h3>
          <p className="text-gray-600">Preparing your document template...</p>
        </div>
      </div>
    );
  }

  // Error state for document details
  if (detailsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load form</h3>
          <p className="text-gray-600 mb-6">Unable to load the document template details</p>
          <div className="flex gap-3">
            <Button onClick={() => refetchDetails()} className="bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
            <Button onClick={handleBackToSelection} variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryColor(selectedDocumentType?.category || "Available Document Templates")} text-3xl shadow-lg`}>
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
        </div>

        {/* Dynamic Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Document Details</CardTitle>
            <CardDescription className="text-lg">
              Fill in the required information for your {selectedDocumentType?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documentTypeDetails?.data?.fields ? (
              <DynamicDocumentForm
                fields={documentTypeDetails.data.fields}
                documentTypeName={selectedDocumentType?.name || ''}
                onSubmit={handleFormSubmit}
                onSaveDraft={handleSaveDraft}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No form fields available for this document type.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}