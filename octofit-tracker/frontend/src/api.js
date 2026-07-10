const DEFAULT_API_BASE = 'http://localhost:8000/api';

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return DEFAULT_API_BASE;
}

export async function fetchCollection(endpoint) {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${baseUrl}${normalizedEndpoint}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${normalizedEndpoint}: ${response.status}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return payload ? [payload] : [];
}
