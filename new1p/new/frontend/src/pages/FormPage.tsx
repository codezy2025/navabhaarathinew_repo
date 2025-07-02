/**
 * 🏗️  DEVELOPMENT GUIDE - Form Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript form component that implements numeric validation similar to validator.py. The component should include:
1. A text input field for numeric entry
2. Real-time validation feedback
3. Visual indication of valid/invalid state
4. Submit button that's only enabled when input is valid
5. Error message display for invalid inputs

The validation logic should mirror the Python implementation:
- Accept integer/decimal strings
- Reject non-numeric strings
- Handle negative numbers
- Return boolean validation result

Include TypeScript interfaces for the props and state as needed.
 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useState, useEffect } from 'react';
import FormForm from '../components/FormForm';
import FormList from '../components/FormList';
import formService from '../services/formService';
import { FormData } from '../types/FormTypes';

const FormPage: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<FormData | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await formService.getAllForms();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (currentForm) {
        await formService.updateForm(currentForm.id, formData);
      } else {
        await formService.createForm(formData);
      }
      setCurrentForm(null);
      fetchForms();
    } catch (err) {
      setError('Failed to save form');
    }
  };

  const handleEdit = (form: FormData) => {
    setCurrentForm(form);
  };

  const handleDelete = async (id: string) => {
    try {
      await formService.deleteForm(id);
      fetchForms();
    } catch (err) {
      setError('Failed to delete form');
    }
  };

  const handleCancel = () => {
    setCurrentForm(null);
  };

  return (
    <div>
      <h1>Form Management</h1>
      {error && <div className="error">{error}</div>}
      <FormForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        initialData={currentForm} 
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <FormList 
          forms={forms} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default FormPage;