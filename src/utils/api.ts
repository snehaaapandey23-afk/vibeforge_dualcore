export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    ...options,
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `API request failed: ${response.status}`)
  }
  return response.json()
}
