import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  ChevronRight,
  Layers,
  FileText,
  Crown,
  Rocket,
  Shield,
  Users,
  Briefcase,
  Award,
  TrendingUp
} from "lucide-react";
import { getDocumentTypes } from "../../endpoints/userDocument/getDocumentTypes";
import { getDocumentTypeById } from "../../endpoints/userDocument/getDocumentTypeById";
import {
  Card,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
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
  
  const handleCancel = () => {
    setSelectedDocumentId(null);
  };

  // Group document types by category for better organization
  const groupedDocumentTypes = documentTypes.reduce((acc, docType) => {
    const category = docType.category || "Available Document Templates";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(docType);
    return acc;
  }, {} as Record<string, DocumentType[]>);

  const categoryConfig = {
    "Legal": {
      gradient: "from-red-500 via-rose-500 to-pink-500",
      icon: Shield,
      bgGradient: "from-red-50 to-pink-50",
      description: "Legal documents and agreements"
    },
    "HR": {
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      icon: Users,
      bgGradient: "from-blue-50 to-cyan-50",
      description: "Human resources documentation"
    },
    "Business": {
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: TrendingUp,
      bgGradient: "from-green-50 to-emerald-50",
      description: "Business operations and processes"
    },
    "Employment": {
      gradient: "from-purple-500 via-indigo-500 to-blue-500",
      icon: Briefcase,
      bgGradient: "from-purple-50 to-indigo-50",
      description: "Employment-related documents"
    },
    "professional": {
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      icon: Award,
      bgGradient: "from-orange-50 to-amber-50",
      description: "Professional certifications and documents"
    },
    "Available Document Templates": {
      gradient: "from-gray-500 via-slate-500 to-zinc-500",
      icon: FileText,
      bgGradient: "from-gray-50 to-slate-50",
      description: "General document templates"
    }
  };

  const getCategoryConfig = (category: string) => {
    return categoryConfig[category as keyof typeof categoryConfig] || categoryConfig["Available Document Templates"];
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

  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
    // Example: createDocument(formData)
  };

  const handleSaveDraft = (formData: Record<string, any>) => {
    console.log('Draft saved:', formData);
  };

  // Loading state for document types
  if (isLoadingTypes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-2xl mb-6 animate-pulse">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Templates</h3>
          <p className="text-gray-600 text-lg">Discovering amazing document templates...</p>
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state for document types
  if (typesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-100 mb-6 shadow-lg">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-8 text-lg">Unable to load document templates. Let's try again!</p>
          <Button 
            onClick={() => refetchTypes()} 
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Document type selection view
  if (!selectedDocumentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Document</h1>
                <p className="text-xl text-gray-600 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Choose from our premium template collection
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{documentTypes.length}</p>
                    <p className="text-gray-600">Templates Available</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">AI</p>
                    <p className="text-gray-600">Powered Generation</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Pro</p>
                    <p className="text-gray-600">Quality Templates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Types Grid */}
          {documentTypes.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Plus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No templates available</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                No document templates are currently available. Check back soon for exciting new templates!
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedDocumentTypes).map(([category, types]) => {
                const config = getCategoryConfig(category);
                const IconComponent = config.icon;
                
                return (
                  <div key={category} className="space-y-8">
                    {/* Category Header */}
                    <div className={`bg-gradient-to-r ${config.bgGradient} rounded-2xl p-8 shadow-lg border border-white/20`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${config.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{category}</h2>
                            <p className="text-gray-600 text-lg">{config.description}</p>
                          </div>
                        </div>
                        <Badge className={`bg-gradient-to-r ${config.gradient} text-white px-4 py-2 rounded-full shadow-lg`}>
                          <Star className="h-4 w-4 mr-2" />
                          {types.length} template{types.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>

                    {/* Document Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {types.map((docType) => (
                        <Card
                          key={docType.id}
                          className="group cursor-pointer border-2 border-gray-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-1"
                          onClick={() => handleDocumentTypeSelect(docType)}
                        >
                          <CardContent className="p-8">
                            <div className="flex flex-col items-center text-center space-y-6">
                              <div className="relative">
                                <div className={`w-20 h-20 bg-gradient-to-r ${config.bgGradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                  {getDocumentIcon(docType.name)}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                  <Sparkles className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                  {docType.name}
                                </h3>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                  <ChevronRight className="h-4 w-4" />
                                  <span>Click to create</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Document creation form view
  const selectedDocumentType = documentTypes.find(dt => dt.id === selectedDocumentId);
  const selectedConfig = getCategoryConfig(selectedDocumentType?.category || "Available Document Templates");

  // Loading state for document details
  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-2xl mb-6 animate-pulse">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Preparing Your Form</h3>
          <p className="text-gray-600 text-lg">Setting up your document template...</p>
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state for document details
  if (detailsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-100 mb-6 shadow-lg">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Failed to load form</h3>
          <p className="text-gray-600 mb-8 text-lg">Unable to load the document template details</p>
          <div className="flex gap-4">
            <Button 
              onClick={() => refetchDetails()} 
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={handleBackToSelection} 
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100 ">
      <div className="max-w-full mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-8 mb-12">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBackToSelection}
            className="flex items-center gap-3 border-2 hover:bg-indigo-50 hover:border-indigo-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Templates
          </Button>
          <div className="flex items-center gap-6">
            <div className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedConfig.gradient} text-4xl shadow-2xl`}>
              {getDocumentIcon(selectedDocumentType?.name || '')}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Create {selectedDocumentType?.name}
              </h1>
              <p className="text-xl text-gray-600 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Professional template ready for customization
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Form Container */}
        <div className="backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {documentTypeDetails?.data?.fields ? (
            <DynamicDocumentForm
              fields={documentTypeDetails.data.fields}
              documentTypeName={selectedDocumentType?.name || ''}
              onSubmit={handleFormSubmit}
              onSaveDraft={handleSaveDraft}
              onCancel={handleCancel}
            />
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Form Fields Available</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                This document type doesn't have any form fields configured yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}