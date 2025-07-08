import React, { useState, useEffect } from 'react';
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
  Clock,
  MapPin,
  Building,
  Briefcase
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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [aiGeneratingField, setAiGeneratingField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for preview
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Generate dynamic Zod schema
  const schema = generateDynamicSchema(fields);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  // Watch all form values for live preview
  const watchedValues = watch();
  
  useEffect(() => {
    setFormData(watchedValues);
  }, [watchedValues]);

  // Sort fields by sortOrder
  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  // Fields that should have AI generation button
  const fieldsWithAI = ['textarea', 'text', 'email', 'select'];
  
  const shouldShowAIButton = (fieldType: string, fieldName: string) => {
    return fieldsWithAI.includes(fieldType) && 
           (fieldType === 'textarea' || 
            fieldName.toLowerCase().includes('description') ||
            fieldName.toLowerCase().includes('summary') ||
            fieldName.toLowerCase().includes('content') ||
            fieldName.toLowerCase().includes('details') ||
            fieldName.toLowerCase().includes('address') ||
            fieldName.toLowerCase().includes('company') ||
            fieldName.toLowerCase().includes('position'));
  };

  const getFieldIcon = (fieldType: string, fieldName: string) => {
    const iconProps = { className: "h-4 w-4 text-indigo-600" };
    
    if (fieldName.toLowerCase().includes('company')) return <Building {...iconProps} />;
    if (fieldName.toLowerCase().includes('position') || fieldName.toLowerCase().includes('job')) return <Briefcase {...iconProps} />;
    if (fieldName.toLowerCase().includes('address')) return <MapPin {...iconProps} />;
    
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

  const handleAIGenerate = async (fieldName: string, fieldType: string) => {
    setAiGeneratingField(fieldName);
    
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Enhanced AI generated content based on field context
      const mockGeneratedContent: Record<string, string> = {
        'fullName': 'Alexander James Rodriguez',
        'firstName': 'Alexander',
        'lastName': 'Rodriguez',
        'email': 'alexander.rodriguez@techcorp.com',
        'phone': '+1 (555) 987-6543',
        'address': '456 Innovation Drive, Suite 200, San Francisco, CA 94105, United States',
        'description': 'A comprehensive and detailed description that demonstrates expertise and professionalism. This content is dynamically generated based on the specific requirements and context of the field, ensuring relevance and accuracy while maintaining a high standard of quality.',
        'summary': 'Executive summary highlighting key achievements, core competencies, and strategic value proposition with measurable impact metrics.',
        'company': 'TechCorp Solutions Inc.',
        'organization': 'Global Technology Innovations',
        'position': 'Senior Software Engineering Manager',
        'title': 'Lead Technical Architect',
        'jobTitle': 'Principal Software Engineer',
        'role': 'Head of Engineering Operations',
        'department': 'Product Development & Innovation',
        'experience': '8+ years of progressive leadership experience in software development, team management, and strategic technology implementation.',
        'skills': 'Full-stack development, Cloud architecture, Team leadership, Agile methodologies, DevOps practices',
        'education': 'Master of Science in Computer Science, Stanford University',
        'qualifications': 'Certified Solutions Architect, PMP Certified, Agile Scrum Master'
      };

      // Try to find the best match for the field
      let generatedValue = mockGeneratedContent[fieldName];
      
      if (!generatedValue) {
        // Generate based on field name patterns
        const lowerFieldName = fieldName.toLowerCase();
        if (lowerFieldName.includes('description') || lowerFieldName.includes('summary')) {
          generatedValue = mockGeneratedContent.description;
        } else if (lowerFieldName.includes('company') || lowerFieldName.includes('organization')) {
          generatedValue = mockGeneratedContent.company;
        } else if (lowerFieldName.includes('position') || lowerFieldName.includes('title') || lowerFieldName.includes('job')) {
          generatedValue = mockGeneratedContent.position;
        } else if (lowerFieldName.includes('address') || lowerFieldName.includes('location')) {
          generatedValue = mockGeneratedContent.address;
        } else if (fieldType === 'email') {
          generatedValue = mockGeneratedContent.email;
        } else if (fieldType === 'phone') {
          generatedValue = mockGeneratedContent.phone;
        } else {
          generatedValue = `AI-generated content for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        }
      }
      
      setValue(fieldName, generatedValue);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setAiGeneratingField(null);
    }
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
      ...formData,
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
    const showAI = shouldShowAIButton(field.fieldType, field.fieldName);
    
    const baseInputClasses = `
      text-sm border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/90 backdrop-blur-sm
      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:bg-white
      hover:border-indigo-300 hover:bg-white hover:shadow-sm
      ${hasError 
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
        : ''
      }
    `;

    // AI Button Component - Fixed positioning and z-index
    const aiButton = showAI && (
      <Button
        type="button"
        onClick={() => handleAIGenerate(field.fieldName, field.fieldType)}
        disabled={isAIGenerating}
        className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 flex items-center justify-center group z-20 border-0"
        title="Generate with AI"
      >
        {isAIGenerating ? (
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Sparkles className="h-3 w-3 group-hover:scale-110 transition-transform" />
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
              className={`${baseInputClasses} min-h-[120px] h-[120px] resize-none pt-3 pb-3 pr-14 pl-4`}
              rows={4}
            />
            {aiButton}
          </div>
        );
        
      case 'select':
        const options = field.options ? JSON.parse(field.options) : [];
        return (
          <div className="relative">
            <Select
              onValueChange={(value) => setValue(field.fieldName, value)}
            >
              <SelectTrigger className={`${baseInputClasses} h-12 ${showAI ? 'pr-14' : 'pr-4'} pl-4`}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent className="border-2 border-gray-200 rounded-xl shadow-xl bg-white/95 backdrop-blur-sm z-50">
                {options.map((option: string, index: number) => (
                  <SelectItem 
                    key={index} 
                    value={option} 
                    className="rounded-lg hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showAI && (
              <Button
                type="button"
                onClick={() => handleAIGenerate(field.fieldName, field.fieldType)}
                disabled={isAIGenerating}
                className="absolute top-1/2 transform -translate-y-1/2 right-12 h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 flex items-center justify-center group z-10 border-0"
                title="Generate with AI"
              >
                {isAIGenerating ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3 group-hover:scale-110 transition-transform" />
                )}
              </Button>
            )}
          </div>
        );
        
      case 'date':
        return (
          <Input
            type="date"
            {...register(field.fieldName)}
            className={`${baseInputClasses} h-12 pr-4 pl-4`}
          />
        );
        
      case 'number':
        return (
          <Input
            type="number"
            {...register(field.fieldName)}
            placeholder={field.placeholder}
            className={`${baseInputClasses} h-12 pr-4 pl-4`}
            min={field.minLength || undefined}
            max={field.maxLength || undefined}
          />
        );
        
      default:
        return (
          <div className="relative">
            <Input
              type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
              {...register(field.fieldName)}
              placeholder={field.placeholder}
              className={`${baseInputClasses} h-12 ${showAI ? 'pr-14' : 'pr-4'} pl-4`}
            />
            {showAI && (
              <Button
                type="button"
                onClick={() => handleAIGenerate(field.fieldName, field.fieldType)}
                disabled={isAIGenerating}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 flex items-center justify-center group z-10 border-0"
                title="Generate with AI"
              >
                {isAIGenerating ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3 group-hover:scale-110 transition-transform" />
                )}
              </Button>
            )}
          </div>
        );
    }
  };

  const renderPreviewField = (fieldName: string, value: any, label: string, fieldType: string) => {
    if (!value || (typeof value === 'string' && !value.trim())) return null;
    
    const isLongText = fieldType === 'textarea' || (typeof value === 'string' && value.length > 50);
    
    return (
      <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-xs font-bold text-indigo-700 mb-3 uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          {label}
        </div>
        <div className={`text-gray-800 leading-relaxed ${isLongText ? 'text-sm' : 'text-base font-medium'}`}>
          {fieldType === 'date' && value ? new Date(value).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : value}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar - Shows when form is collapsed */}
      {!isFormExpanded && (
        <div className="w-20 bg-white/90 backdrop-blur-sm border-r border-gray-200 flex flex-col items-center py-8 shadow-xl">
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
        className={`transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl overflow-hidden ${
          isFormExpanded ? 'w-2/4' : 'w-0'
        }`}
      >
        {isFormExpanded && (
          <div className="h-full flex flex-col">
            {/* Enhanced Form Header */}
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
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
                      <p className="text-white/80 text-sm flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        AI-powered smart filling
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFormExpanded(false)}
                    className="text-white hover:bg-white/20 w-10 h-10 rounded-xl backdrop-blur-sm transition-all duration-300"
                  >
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
                    <div className="flex items-center gap-3 p-3 rounded-xl group-hover:bg-indigo-50/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        {getFieldIcon(field.fieldType, field.fieldName)}
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
                          {shouldShowAIButton(field.fieldType, field.fieldName) && (
                            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
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
                      <div className="pl-4 flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <p className="text-red-600 text-sm font-medium">
                          {errors[field.fieldName]?.message as string}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </form>
            </div>

            {/* Enhanced Form Actions */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <Button 
                  type="submit"
                  onClick={handleSubmit(onFormSubmit)}
                  disabled={isLoading}
                  className="flex-1 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Create Document
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  onClick={onSaveDraftClick}
                  variant="outline" 
                  disabled={isLoading}
                  className="h-12 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
              
              <Button 
                type="button"
                onClick={onCancel}
                variant="ghost" 
                className="w-full mt-3 h-10 text-gray-600 hover:text-gray-800 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced A4 Preview Panel */}
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="max-w-4xl mx-auto h-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                Live Document Preview
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4" />
                Updates in real-time as you type
              </p>
            </div>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-indigo-200 text-indigo-700 px-3 py-1">
              A4 Format
            </Badge>
          </div>
          
          {/* Enhanced A4 Paper */}
          <div 
            className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200" 
            style={{ aspectRatio: '210/297', height: 'calc(100vh - 200px)' }}
          >
            <div className="h-full p-12 overflow-y-auto">
              {/* Enhanced Document Header */}
              <div className="text-center mb-10 pb-6 border-b-2 border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {documentTypeName}
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-3"></div>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Generated on {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Enhanced Document Content */}
              <div className="space-y-6">
                {sortedFields.map((field) => 
                  renderPreviewField(
                    field.fieldName, 
                    formData[field.fieldName], 
                    field.label,
                    field.fieldType
                  )
                )}
                
                {Object.keys(formData).filter(key => formData[key] && String(formData[key]).trim()).length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-10 w-10 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Your Document Preview
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Start filling out the form on the left to see your document come to life in real-time
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-600">
                      <Sparkles className="h-4 w-4" />
                      Use AI assistance for faster completion
                    </div>
                  </div>
                )}
                
                {/* Document Footer */}
                {Object.keys(formData).filter(key => formData[key] && String(formData[key]).trim()).length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-400">
                      Document generated on {currentTime.toLocaleString()}
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