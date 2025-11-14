// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://findmyleak.onrender.com',
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
      'Authorization': 'Basic ' + btoa('vikas:vikas123'),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
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