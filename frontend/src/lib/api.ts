import { config } from './config';

// API Configuration
export const API_CONFIG = {
  BASE_URL: config.API_BASE_URL,
  USERNAME: config.API_USERNAME,
  PASSWORD: config.API_PASSWORD,
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
      'Authorization': 'Basic ' + btoa(`${API_CONFIG.USERNAME}:${API_CONFIG.PASSWORD}`),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      // Include more detailed error information
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      (error as any).externalStatusCode = data.externalStatusCode;
      throw error;
    }

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