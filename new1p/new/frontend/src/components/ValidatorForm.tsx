/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Validator> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { ValidatorFormProps, ValidatorFormData } from '../types/ValidatorTypes';

const ValidatorForm: React.FC<ValidatorFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ValidatorFormData>();
  const inputValue = watch('inputValue');

  const validateNumber = (value: string): boolean => {
    if (value === '') return false;
    return !isNaN(Number(value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="validator-form">
      <div className="form-group">
        <label htmlFor="inputValue">Enter a number:</label>
        <input
          id="inputValue"
          type="text"
          {...register('inputValue', {
            required: 'This field is required',
            validate: (value) => validateNumber(value) || 'Please enter a valid number'
          })}
          className={`form-control ${errors.inputValue ? 'is-invalid' : ''}`}
        />
        {errors.inputValue && (
          <div className="invalid-feedback">{errors.inputValue.message}</div>
        )}
      </div>

      <div className="validation-result mt-3">
        {inputValue && (
          <div className={`alert ${validateNumber(inputValue) ? 'alert-success' : 'alert-danger'}`}>
            {validateNumber(inputValue)
              ? `"${inputValue}" is a valid number`
              : `"${inputValue}" is not a valid number`}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default ValidatorForm;