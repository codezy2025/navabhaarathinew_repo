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

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormTypes } from '../types/FormTypes';

interface FormFormProps {
  onSubmit: (data: FormTypes) => void;
}

const FormForm: React.FC<FormFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormTypes>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateNumber = (value: string): boolean => {
    if (value === '') return false;
    const numRegex = /^-?\d*\.?\d+$/;
    return numRegex.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidInput = validateNumber(e.target.value);
    setIsValid(isValidInput);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="numericInput">Numeric Input</label>
        <input
          id="numericInput"
          type="text"
          {...register('numericInput', {
            required: 'This field is required',
            validate: (value) => validateNumber(value) || 'Please enter a valid number'
          })}
          onChange={handleInputChange}
          className={errors.numericInput ? 'invalid' : ''}
        />
        {errors.numericInput && (
          <span className="error">{errors.numericInput.message}</span>
        )}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default FormForm;