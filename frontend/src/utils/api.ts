export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5005";
  const token = localStorage.getItem("jwt");

  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Only set a JSON content type if the caller provides a body and hasn't
  // already specified a different content type (e.g. for FormData uploads)
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.headers) {
    const incoming = new Headers(options.headers);
    incoming.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const { headers: _omit, ...rest } = options;
  const res = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
};
