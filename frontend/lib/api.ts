import { getSession } from './auth';

/**
 * Fetch wrapper that automatically attaches JWT token from session
 */
export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const session = await getSession();
  const token = session?.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};

/**
 * Helper functions for common HTTP methods
 */
export const apiGet = (endpoint: string, options?: RequestInit) =>
  apiClient(endpoint, { ...options, method: 'GET' });

export const apiPost = (endpoint: string, data?: any, options?: RequestInit) =>
  apiClient(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });

export const apiPut = (endpoint: string, data?: any, options?: RequestInit) =>
  apiClient(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });

export const apiDelete = (endpoint: string, options?: RequestInit) =>
  apiClient(endpoint, { ...options, method: 'DELETE' });