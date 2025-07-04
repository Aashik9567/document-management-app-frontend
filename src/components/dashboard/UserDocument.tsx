import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { getUserDocuments } from '../../endpoints/userDocument/getUserDocument';

interface DocumentType {
  id: string;
  name: string;
  category: string;
  icon: string | null;
}

interface Document {
  id: string;
  title: string;
  status: 'Draft' | 'Completed' | 'Archived' | 'Published';
  createdAt: string;
  updatedAt: string;
  lastGeneratedAt: string | null;
  version: number;
  documentType: DocumentType;
}

export default function UserDocument() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'draft' | 'completed' | 'archived'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const {
    data: documentsResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['user-documents'],
    queryFn: getUserDocuments,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Extract documents array from response
  const documents: Document[] = documentsResponse?.data || [];

  const filteredDocuments = documents.filter((doc: Document) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentType.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doc.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'published':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'nda':
        return '📄';
      case 'contract':
        return '📋';
      case 'agreement':
        return '🤝';
      case 'letter':
        return '✉️';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All Documents', count: documents.length },
    { value: 'draft', label: 'Drafts', count: documents.filter((d: Document) => d.status.toLowerCase() === 'draft').length },
    { value: 'completed', label: 'Completed', count: documents.filter((d: Document) => d.status.toLowerCase() === 'completed').length },
    { value: 'archived', label: 'Archived', count: documents.filter((d: Document) => d.status.toLowerCase() === 'archived').length },
  ];

  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl shadow-2xl shadow-black/5">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl shadow-2xl shadow-black/5">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-red-100 to-red-200 mb-6">
              <FileText className="h-10 w-10 text-red-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Error loading documents</h4>
            <p className="text-sm text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'Something went wrong while fetching your documents'}
            </p>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl shadow-2xl shadow-black/5">
      
      {/* Header */}
      <div className="relative flex flex-col space-y-6 p-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
              <FolderOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                My Documents
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {documents.length} document{documents.length !== 1 ? 's' : ''} total
              </p>
            </div>
          </div>
          <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
            
            <div className="flex rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2.5 transition-colors",
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2.5 transition-colors",
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Content */}
      <div className="relative p-8 pt-0">
        {sortedDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 mb-6">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedFilter !== 'all' ? 'No documents found' : 'No documents created'}
            </h4>
            <p className="text-gray-600 mb-6 max-w-md">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first document. Choose from templates or start from scratch.'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg">
              <Plus className="h-4 w-4" />
              Create Your First Document
            </button>
          </div>
        ) : (
         <div
  className={cn(
    "grid gap-6",
    viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
  )}
>
  {sortedDocuments.map((document) => (
    <div
      key={document.id}
      className="group relative flex flex-col rounded-2xl border border-white/30 bg-white/60 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
    >
      {/* Top Section: Icon & Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 max-w-[75%]">
          <div className="text-2xl shrink-0">
            {getDocumentIcon(document.documentType.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-base truncate">
              {document.title}
            </h4>
            <p className="text-sm text-gray-500 capitalize truncate">
              {document.documentType.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
            getStatusColor(document.status)
          )}>
            {document.status}
          </div>
    
        </div>
      </div>

      {/* Date Info */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(document.createdAt)}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDate(document.updatedAt)}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors">
            <Edit3 className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
        <button className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
}