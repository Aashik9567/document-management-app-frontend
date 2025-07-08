import { z } from 'zod';
import type { DocumentField } from '../endpoints/userDocument/getDocumentTypeById';

export const generateDynamicSchema = (fields: DocumentField[]) => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.fieldType) {
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email address');
        break;
      
      case 'phone':
        fieldSchema = z.string().regex(
          /^[\+]?[\d\s\-\(\)]+$/,
          'Please enter a valid phone number'
        );
        break;
      
      case 'date':
        fieldSchema = z.string().refine(
          (val) => !isNaN(Date.parse(val)),
          'Please enter a valid date'
        );
        break;
      
      case 'number':
        fieldSchema = z.coerce.number();
        if (field.minLength) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(field.minLength, `Minimum value is ${field.minLength}`);
        }
        if (field.maxLength) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(field.maxLength, `Maximum value is ${field.maxLength}`);
        }
        break;
      
      default:
        fieldSchema = z.string();
        if (field.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(field.minLength, `Minimum ${field.minLength} characters required`);
        }
        if (field.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(field.maxLength, `Maximum ${field.maxLength} characters allowed`);
        }
        break;
    }

    // Handle required fields
    if (field.isRequired) {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      } else if (fieldSchema instanceof z.ZodNumber) {
        // For numbers, .min(1) means minimum value is 1, adjust if needed
        fieldSchema = fieldSchema;
      }
      // For other types, just leave as is (required)
    } else {
      fieldSchema = fieldSchema.optional();
    }

    schemaObject[field.fieldName] = fieldSchema;
  });

  return z.object(schemaObject);
};