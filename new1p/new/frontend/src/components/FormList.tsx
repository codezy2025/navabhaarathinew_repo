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

import React, { useState, ChangeEvent } from 'react';
import { FormData } from '../types/FormTypes';

interface NumericInputFormProps {
  onSubmit: (value: string) => void;
}

interface FormState {
  value: string;
  isValid: boolean;
  errorMessage: string;
}

const NumericInputForm: React.FC<NumericInputFormProps> = ({ onSubmit }) => {
  const [state, setState] = useState<FormState>({
    value: '',
    isValid: false,
    errorMessage: '',
  });

  const validateInput = (input: string): boolean => {
    if (input === '') {
      setState(prev => ({
        ...prev,
        isValid: false,
        errorMessage: 'Input cannot be empty',
      }));
      return false;
    }

    if (!/^-?\d*\.?\d+$/.test(input)) {
      setState(prev => ({
        ...prev,
        isValid: false,
        errorMessage: 'Input must be a valid number',
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      isValid: true,
      errorMessage: '',
    }));
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    validateInput(value);
    setState(prev => ({ ...prev, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.isValid) {
      onSubmit(state.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={state.value}
          onChange={handleChange}
          className={state.isValid ? 'valid' : 'invalid'}
        />
        {!state.isValid && state.errorMessage && (
          <div className="error-message">{state.errorMessage}</div>
        )}
      </div>
      <button type="submit" disabled={!state.isValid}>
        Submit
      </button>
    </form>
  );
};

export default NumericInputForm;