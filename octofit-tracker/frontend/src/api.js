const DEFAULT_API_BASE = 'http://localhost:8000/api';

export function getApiBaseUrl() {
  const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return DEFAULT_API_BASE;
}

function normalizePayload(payload) {
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

async function readJsonFromUrl(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Unexpected response from ${url}`);
  }

  return response.json();
}

export async function fetchCollection(endpoint) {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const candidates = [getApiBaseUrl()];

  if (candidates[0] !== DEFAULT_API_BASE) {
    candidates.push(DEFAULT_API_BASE);
  }

  let lastError = null;

  for (const baseUrl of candidates) {
    try {
      const payload = await readJsonFromUrl(`${baseUrl}${normalizedEndpoint}`);
      return normalizePayload(payload);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Failed to load ${normalizedEndpoint}`);
}
