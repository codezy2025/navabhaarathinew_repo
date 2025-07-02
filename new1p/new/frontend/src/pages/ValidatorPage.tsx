/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Page Component
 * 
 * 📋 Original Requirements: Create a React TypeScript component that validates numeric input strings similar to the Python validator.py module. The component should:
1. Provide a function to validate if a string can be converted to a number
2. Include a simple UI with an input field and validation feedback
3. Use TypeScript for type safety
4. Follow React best practices
5. Include proper error handling
6. Display validation results visually
7. Support all the same validation cases as the Python version (integers, decimals, negatives, rejects non-numeric strings)
 * 
 * 🚀 Enhancement Ideas:
 * - Add URL-based filtering and search
 * - Implement breadcrumb navigation
 * - Add export/import functionality
 * - Include real-time updates (WebSocket/SSE)
 * - Add keyboard shortcuts for common actions
 * - Implement undo/redo functionality
 * 
 * 💡 State Management Improvements:
 * - Use useReducer for complex state logic
 * - Add optimistic updates for better UX
 * - Implement proper error boundaries
 * - Add loading skeletons instead of spinners
 * 
 * 🔧 User Experience:
 * - Add confirmation dialogs for destructive actions
 * - Implement toast notifications for feedback
 * - Add drag-and-drop for reordering
 * - Include accessibility features (ARIA labels)
 * 
 * 📱 Responsive Design:
 * - Add mobile-specific components
 * - Implement swipe actions for mobile
 * - Consider drawer/modal layouts for small screens
 */

import React, { useState, useEffect } from 'react';
import ValidatorForm from '../components/ValidatorForm';
import ValidatorList from '../components/ValidatorList';
import validatorService from '../services/validatorService';
import { Validator, ValidatorFormData } from '../types/ValidatorTypes';

const ValidatorPage: React.FC = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchValidators();
  }, []);

  const fetchValidators = async () => {
    try {
      setLoading(true);
      const data = await validatorService.getAll();
      setValidators(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch validators');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: ValidatorFormData) => {
    try {
      setLoading(true);
      const newValidator = await validatorService.create(formData);
      setValidators([...validators, newValidator]);
      setError(null);
    } catch (err) {
      setError('Failed to create validator');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: ValidatorFormData) => {
    try {
      setLoading(true);
      const updatedValidator = await validatorService.update(id, formData);
      setValidators(validators.map(v => v.id === id ? updatedValidator : v));
      setError(null);
    } catch (err) {
      setError('Failed to update validator');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await validatorService.delete(id);
      setValidators(validators.filter(v => v.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete validator');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Validator Management</h1>
      {error && <div className="error">{error}</div>}
      <ValidatorForm onSubmit={handleCreate} loading={loading} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ValidatorList
          validators={validators}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ValidatorPage;