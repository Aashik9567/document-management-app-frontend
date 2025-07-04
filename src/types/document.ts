export interface DocumentType {
  id: string;
  name: string;
  category: string;
  icon: string | null;
}

export interface DocumentItem {
  id: string;
  title: string;
  status: 'Draft' | 'Completed' | 'Archived' | 'Published';
  createdAt: string;
  updatedAt: string;
  lastGeneratedAt: string | null;
  version: number;
  documentType: DocumentType;
}

export interface GetUserDocumentsResponse {
  success: boolean;
  count: number;
  data: DocumentItem[];
}