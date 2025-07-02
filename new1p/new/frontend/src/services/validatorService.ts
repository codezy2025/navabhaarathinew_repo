/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Validator[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ValidatorStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { Validator, ValidatorCreate, ValidatorUpdate } from '../types/ValidatorTypes';

const API_BASE_URL = '/api/validators';

export const validatorService = {
    getAll: async (): Promise<Validator[]> => {
        const response = await axios.get<Validator[]>(API_BASE_URL);
        return response.data;
    },
    create: async (validator: ValidatorCreate): Promise<Validator> => {
        const response = await axios.post<Validator>(API_BASE_URL, validator);
        return response.data;
    },
    update: async (id: string, validator: ValidatorUpdate): Promise<Validator> => {
        const response = await axios.put<Validator>(`${API_BASE_URL}/${id}`, validator);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};