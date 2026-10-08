const BASE_URL = 'https://reqres.in/api';

export async function apiRequest(path, options = {}) {
  const apiKey = import.meta.env.VITE_REQRES_API_KEY;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (apiKey) headers['x-api-key'] = apiKey;

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      message = body.error || body.message || message;
    } catch {}
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}
