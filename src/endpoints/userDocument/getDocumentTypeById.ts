import { apiClient } from '../apiClient';

export interface DocumentField {
  id: string;
  documentTypeId: string;
  fieldName: string;
  label: string;
  fieldType: 'text' | 'email' | 'phone' | 'date' | 'textarea' | 'signature' | 'select' | 'number';
  isRequired: boolean;
  sortOrder: number;
  placeholder: string;
  defaultValue: string;
  validation: string | null;
  options: string | null;
  helpText: string;
  section: string | null;
  minLength: number | null;
  maxLength: number | null;
  dependsOn: string | null;
  dependsValue: string | null;
}

export interface DocumentTypeDetails {
  id: string;
  name: string;
  description: string;
  templatePath: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  icon: string | null;
  fields: DocumentField[];
}

export interface DocumentTypeDetailsResponse {
  success: boolean;
  data: DocumentTypeDetails;
  message?: string;
}

export const getDocumentTypeById = async (documentTypeId: string): Promise<DocumentTypeDetailsResponse> => {
  const response = await apiClient.get(`/api/document-types/${documentTypeId}`);
  return response.data;
};