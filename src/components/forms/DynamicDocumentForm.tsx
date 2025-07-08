import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  PenTool,
  Hash,
  X,
  Menu,
  Save,
  Send,
  Eye,
  Sparkles,
  Bot,
  ChevronRight,
  Star
} from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { generateDynamicSchema } from '../../utils/formSchemaGenerator';
import type { DocumentField } from '../../endpoints/userDocument/getDocumentTypeById';

interface DynamicDocumentFormProps {
  fields: DocumentField[];
  documentTypeName: string;
  onSubmit: (formData: Record<string, any>) => void;
  onSaveDraft: (formData: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DynamicDocumentForm: React.FC<DynamicDocumentFormProps> = ({
  fields,
  documentTypeName,
  onSubmit,
  onSaveDraft,
  onCancel,
  isLoading = false
}) => {
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [previewData, setPreviewData] = useState<Record<string, any>>({});
  const [aiGeneratingField, setAiGeneratingField] = useState<string | null>(null);

  // Generate dynamic Zod schema
  const schema = generateDynamicSchema(fields);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  // Sort fields by sortOrder
  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  const getFieldIcon = (fieldType: string) => {
    const iconProps = { className: "h-4 w-4 text-indigo-600" };
    
    switch (fieldType) {
      case 'email':
        return <Mail {...iconProps} />;
      case 'phone':
        return <Phone {...iconProps} />;
      case 'date':
        return <Calendar {...iconProps} />;
      case 'textarea':
        return <FileText {...iconProps} />;
      case 'signature':
        return <PenTool {...iconProps} />;
      case 'number':
        return <Hash {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  const handleAIGenerate = async (fieldName: string) => {
    setAiGeneratingField(fieldName);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI generated content based on field name
    const mockGeneratedContent = {
      'fullName': 'John Alexander Smith',
      'email': 'john.smith@example.com',
      'phone': '+1 (555) 123-4567',
      'address': '123 Main Street, New York, NY 10001',
      'description': 'This is an AI-generated description that provides relevant and contextual content based on the field requirements.',
      'company': 'Tech Solutions Inc.',
      'position': 'Senior Software Engineer'
    };
    
    const generatedValue = mockGeneratedContent[fieldName as keyof typeof mockGeneratedContent] || 'AI generated content';
    setValue(fieldName, generatedValue);
    setPreviewData(prev => ({ ...prev, [fieldName]: generatedValue }));
    setAiGeneratingField(null);
  };

  const onFormSubmit = (data: any) => {
    const submitData = {
      ...data,
      documentType: documentTypeName,
      createdAt: new Date().toISOString(),
      isDraft: false
    };
    onSubmit(submitData);
  };

  const onSaveDraftClick = () => {
    const draftData = {
      documentType: documentTypeName,
      createdAt: new Date().toISOString(),
      isDraft: true
    };
    onSaveDraft(draftData);
  };

  const renderField = (field: DocumentField) => {
    const error = errors[field.fieldName];
    const hasError = !!error;
    const isAIGenerating = aiGeneratingField === field.fieldName;
    
    const baseInputClasses = `
      h-12 text-sm border-2 border-gray-100 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm
      focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:bg-white
      hover:border-gray-200 hover:bg-white
      ${hasError 
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
        : ''
      }
    `;

    const aiButton = (
      <Button
        type="button"
        onClick={() => handleAIGenerate(field.fieldName)}
        disabled={isAIGenerating}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 flex items-center justify-center group"
      >
        {isAIGenerating ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform" />
        )}
      </Button>
    );

    switch (field.fieldType) {
      case 'textarea':
        return (
          <div className="relative">
            <Textarea
              {...register(field.fieldName)}
              placeholder={field.placeholder}
              className={`${baseInputClasses} min-h-[100px] resize-none pr-12`}
              rows={4}
            />
            <div className="absolute right-2 top-2">
              {aiButton}
            </div>
          </div>
        );
        
      case 'select':
        const options = field.options ? JSON.parse(field.options) : [];
        return (
          <div className="relative">
            <Select
              onValueChange={(value) => setValue(field.fieldName, value)}
            >
              <SelectTrigger className={baseInputClasses}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent className="border-2 border-gray-100 rounded-xl shadow-xl">
                {options.map((option: string, index: number) => (
                  <SelectItem key={index} value={option} className="rounded-lg hover:bg-indigo-50">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              {aiButton}
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className="relative">
            <Input
              type="date"
              {...register(field.fieldName)}
              className={`${baseInputClasses} pr-12`}
            />
            {aiButton}
          </div>
        );
        
      case 'number':
        return (
          <div className="relative">
            <Input
              type="number"
              {...register(field.fieldName)}
              placeholder={field.placeholder}
              className={`${baseInputClasses} pr-12`}
              min={field.minLength || undefined}
              max={field.maxLength || undefined}
            />
            {aiButton}
          </div>
        );
        
      default:
        return (
          <div className="relative">
            <Input
              type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
              {...register(field.fieldName)}
              placeholder={field.placeholder}
              className={`${baseInputClasses} pr-12`}
            />
            {aiButton}
          </div>
        );
    }
  };

  const renderPreviewField = (fieldName: string, value: any, label: string) => {
    if (!value) return null;
    
    return (
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
        <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wider flex items-center gap-2">
          <Star className="h-3 w-3" />
          {label}
        </div>
        <div className="text-sm text-gray-800 leading-relaxed font-medium">
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-max bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar - Shows when form is collapsed */}
      {!isFormExpanded && (
        <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col items-center py-8 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFormExpanded(true)}
            className="w-12 h-12 rounded-xl mb-6 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm">
              <Eye className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      )}

      {/* Form Panel */}
      <div 
        className={`transition-all duration-500 ease-in-out bg-white/90 backdrop-blur-sm border-r border-gray-200 shadow-xl overflow-hidden ${
          isFormExpanded ? 'w-2/5' : 'w-0'
        }`}
      >
        {isFormExpanded && (
          <div className="h-full flex flex-col">
            {/* Form Header */}
            <div className="px-8 py-6 bg-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {documentTypeName}
                      </h2>
                      <p className="text-indigo-100 text-sm flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        AI-powered form filling
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFormExpanded(false)}
                    className="text-white hover:bg-white/20 w-10 h-10 rounded-xl backdrop-blur-sm transition-all duration-300">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
                {sortedFields.map((field) => (
                  <div key={field.id} className="space-y-4 group">
                    <div className="flex items-center gap-3 p-2 rounded-lg group-hover:bg-indigo-50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                        {getFieldIcon(field.fieldType)}
                      </div>
                      <div className="flex-1">
                        <Label 
                          htmlFor={field.fieldName}
                          className="text-sm font-semibold text-gray-800 flex items-center gap-2"
                        >
                          {field.label}
                          {field.isRequired && (
                            <span className="text-red-500 text-lg">*</span>
                          )}
                          <ChevronRight className="h-3 w-3 text-gray-400" />
                        </Label>
                        {field.helpText && (
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {field.helpText}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="pl-4">
                      {renderField(field)}
                    </div>
                    
                    {errors[field.fieldName] && (
                      <div className="pl-4 flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <p className="text-red-600 text-sm font-medium">
                          {errors[field.fieldName]?.message as string}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </form>
            </div>

             {/* Form Actions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <Button 
                  type="submit"
                  onClick={handleSubmit(onFormSubmit)}
                  disabled={isLoading}
                  className="flex-1 h-11 bg-blue-500 text-white transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Create
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  onClick={onSaveDraftClick}
                  variant="outline" 
                  disabled={isLoading}
                  className="h-11 border-gray-300 hover:bg-gray-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Draft
                </Button>
              </div>
              
              <Button 
                type="button"
                onClick={onCancel}
                variant="ghost" 
                className="w-full mt-2 h-9 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* A4 Preview Panel */}
      <div className="flex-1 bg-gray-200 p-4 rounded-2xl">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Document Preview</h3>
              <p className="text-sm text-gray-600">Live preview of your document</p>
            </div>
            <Badge variant="outline" className="bg-white">
              A4 Size
            </Badge>
          </div>
          
          {/* A4 Paper */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ aspectRatio: '210/297' }}>
            <div className="h-full p-12 overflow-y-auto">
              {/* Document Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {documentTypeName}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>

              {/* Document Content */}
              <div className="space-y-6">
                {sortedFields.map((field) => 
                  renderPreviewField(
                    field.fieldName, 
                    previewData[field.fieldName], 
                    field.label
                  )
                )}
                
                {Object.keys(previewData).length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Start filling the form to see your document preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDocumentForm;