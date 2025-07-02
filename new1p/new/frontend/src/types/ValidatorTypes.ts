/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Validator>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum ValidatorStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type ValidatorSearchParams = Pick<Validator, 'name' | 'status'>
 * - export type ValidatorUpdateData = Partial<Omit<Validator, 'id' | 'createdAt'>>
 */

export interface Validator {
  isValid: boolean;
  errorMessage: string;
  validate: (input: string) => void;
}

export interface ValidatorFormData {
  inputValue: string;
  validationResult: Validator;
}