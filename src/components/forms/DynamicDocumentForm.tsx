import React, { useState } from 'react';
import { 
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  PenTool,
  Hash,
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
import { Card, CardContent } from '../ui/card';
import type { DocumentField } from '../../endpoints/userDocument/getDocumentTypeById';

interface DynamicDocumentFormProps {
  fields: DocumentField[];
  documentTypeName: string;
  onSubmit: (formData: Record<string, any>) => void;
  onSaveDraft: (formData: Record<string, any>) => void;
  isLoading?: boolean;
}

export const DynamicDocumentForm: React.FC<DynamicDocumentFormProps> = ({
  fields,
  documentTypeName,
  onSubmit,
  onSaveDraft,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sort fields by sortOrder
  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  const getFieldIcon = (fieldType: string) => {
    const iconProps = { className: "h-4 w-4 text-gray-500" };
    
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

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    sortedFields.forEach(field => {
      if (field.isRequired && !formData[field.fieldName]) {
        newErrors[field.fieldName] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.fieldType === 'email' && formData[field.fieldName]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.fieldName])) {
          newErrors[field.fieldName] = 'Please enter a valid email address';
        }
      }
      
      // Phone validation
      if (field.fieldType === 'phone' && formData[field.fieldName]) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(formData[field.fieldName])) {
          newErrors[field.fieldName] = 'Please enter a valid phone number';
        }
      }
      
      // Length validation
      if (field.minLength && formData[field.fieldName]?.length < field.minLength) {
        newErrors[field.fieldName] = `Minimum ${field.minLength} characters required`;
      }
      
      if (field.maxLength && formData[field.fieldName]?.length > field.maxLength) {
        newErrors[field.fieldName] = `Maximum ${field.maxLength} characters allowed`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isDraft: boolean = false) => {
    if (!isDraft && !validateForm()) {
      return;
    }
    
    const submitData = {
      ...formData,
      documentType: documentTypeName,
      createdAt: new Date().toISOString(),
      isDraft
    };
    
    if (isDraft) {
      onSaveDraft(submitData);
    } else {
      onSubmit(submitData);
    }
  };

  const renderField = (field: DocumentField) => {
    const fieldValue = formData[field.fieldName] || field.defaultValue || '';
    const hasError = errors[field.fieldName];
    
    const baseInputClasses = `
      h-12 text-base border-2 rounded-xl transition-all duration-200
      ${hasError 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
      }
    `;

    switch (field.fieldType) {
      case 'textarea':
        return (
          <Textarea
            value={fieldValue}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            placeholder={field.placeholder}
            className={`${baseInputClasses} min-h-[100px] resize-none`}
            rows={4}
          />
        );
        
      case 'select':
        const options = field.options ? JSON.parse(field.options) : [];
        return (
          <Select
            value={fieldValue}
            onValueChange={(value) => handleInputChange(field.fieldName, value)}
          >
            <SelectTrigger className={baseInputClasses}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'date':
        return (
          <Input
            type="date"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className={baseInputClasses}
          />
        );
        
      case 'number':
        return (
          <Input
            type="number"
            value={fieldValue}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
            min={field.minLength || undefined}
            max={field.maxLength || undefined}
          />
        );
        
      default:
        return (
          <Input
            type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {sortedFields.map((field) => (
          <Card key={field.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {getFieldIcon(field.fieldType)}
                  <Label 
                    htmlFor={field.fieldName}
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    {field.label}
                    {field.isRequired && (
                      <span className="text-red-500 text-xs">*</span>
                    )}
                  </Label>
                </div>
                
                {field.helpText && (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {field.helpText}
                  </p>
                )}
                
                {renderField(field)}
                
                {errors[field.fieldName] && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[field.fieldName]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-8 border-t border-gray-200">
        <Button 
          onClick={() => handleSubmit(false)}
          disabled={isLoading}
          size="lg" 
          className="flex-1 h-14 text-lg bg-blue-400 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Creating Document...
            </>
          ) : (
            `Create ${documentTypeName}`
          )}
        </Button>
        
        <Button 
          onClick={() => handleSubmit(true)}
          variant="outline" 
          disabled={isLoading}
          size="lg" 
          className="flex-1 h-14 text-lg border-2 hover:bg-gray-50 disabled:opacity-50"
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default DynamicDocumentForm;