import { config } from './config';

// API Configuration
export const API_CONFIG = {
  BASE_URL: config.API_BASE_URL,
  ENDPOINTS: {
    SCAN: '/api/scan',
    DELETE_REQUEST: '/api/delete-request'
  }
};

// API Helper functions
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${config.API_USERNAME}:${config.API_PASSWORD}`),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

export const scanForLeaks = async (query: string) => {
  return apiCall(API_CONFIG.ENDPOINTS.SCAN, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
};

export const submitDeleteRequest = async (requestData: {
  fullName: string;
  email?: string;
  phone?: string;
  reason?: string;
}) => {
  return apiCall(API_CONFIG.ENDPOINTS.DELETE_REQUEST, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
};