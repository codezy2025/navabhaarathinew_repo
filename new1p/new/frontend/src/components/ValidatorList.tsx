/**
 * 🏗️  DEVELOPMENT GUIDE - Validator List Component
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
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import React, { useState } from 'react';
import { Validator } from '../types/ValidatorTypes';

interface NumericValidatorProps {
  onValidation?: (isValid: boolean, value: number | null) => void;
}

const NumericValidator: React.FC<NumericValidatorProps> = ({ onValidation }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateNumeric = (value: string): boolean => {
    if (value.trim() === '') {
      setErrorMessage('Input cannot be empty');
      return false;
    }

    // Check for valid numeric format (integers, decimals, negatives)
    const numericRegex = /^-?\d*\.?\d+$/;
    if (!numericRegex.test(value)) {
      setErrorMessage('Invalid numeric format');
      return false;
    }

    // Check if it can be converted to a finite number
    const num = parseFloat(value);
    if (isNaN(num) || !isFinite(num)) {
      setErrorMessage('Invalid number');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const valid = validateNumeric(value);
    setIsValid(valid);
    
    if (onValidation) {
      onValidation(valid, valid ? parseFloat(value) : null);
    }
  };

  return (
    <div className="numeric-validator">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
        className={`validator-input ${isValid === false ? 'invalid' : isValid ? 'valid' : ''}`}
      />
      {isValid === false && (
        <div className="error-message">{errorMessage}</div>
      )}
      {isValid && (
        <div className="success-message">Valid number</div>
      )}
    </div>
  );
};

export default NumericValidator;