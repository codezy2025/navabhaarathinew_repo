/**
 * 🏗️  DEVELOPMENT GUIDE - Form Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Form[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{FormStats}>
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
import { Form, FormCreateRequest, FormUpdateRequest } from '../types/FormTypes';

const API_BASE_URL = 'http://localhost:3000/api/forms';

export const formService = {
    getAll: async (): Promise<Form[]> => {
        const response = await axios.get<Form[]>(API_BASE_URL);
        return response.data;
    },
    create: async (formData: FormCreateRequest): Promise<Form> => {
        const response = await axios.post<Form>(API_BASE_URL, formData);
        return response.data;
    },
    update: async (id: string, formData: FormUpdateRequest): Promise<Form> => {
        const response = await axios.put<Form>(`${API_BASE_URL}/${id}`, formData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};