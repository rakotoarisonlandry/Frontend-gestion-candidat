export function extractApiError(
  err: unknown,
  fallback = "Une erreur inattendue est survenue.",
): string {
  if (!err || typeof err !== "object") return fallback;

  const axiosErr = err as { response?: { data?: unknown; status?: number } };
  const data = axiosErr.response?.data;

  if (!data) return fallback;

  // string brut
  if (typeof data === "string" && data.trim()) return data.trim();

  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;

    // { message: string }
    if (typeof d.message === "string" && d.message.trim())
      return d.message.trim();

    // { error: string }
    if (typeof d.error === "string" && d.error.trim()) return d.error.trim();

    // { errors: string[] }
    if (Array.isArray(d.errors)) {
      const first = d.errors[0];
      if (typeof first === "string") return first;
      // express-validator: { msg: string }
      if (
        typeof first === "object" &&
        first !== null &&
        typeof (first as Record<string, unknown>).msg === "string"
      ) {
        return (first as Record<string, unknown>).msg as string;
      }
    }
  }

  return fallback;
}

export function extractApiSuccess(
  res: unknown,
  fallback = "Opération réussie.",
): string {
  if (!res || typeof res !== "object") return fallback;

  const r = res as { data?: unknown };
  const data = r.data;

  if (!data) return fallback;
  if (typeof data === "string" && data.trim()) return data.trim();

  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    if (typeof d.message === "string" && d.message.trim())
      return d.message.trim();
    if (typeof d.success === "string" && d.success.trim())
      return d.success.trim();
  }

  return fallback;
}
