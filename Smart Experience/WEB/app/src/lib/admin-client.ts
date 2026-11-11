// Helper para llamadas desde el panel admin.
// Todas las server functions admin esperan { token: string, ...resto }.
// adminCall inyecta el token automaticamente desde localStorage.

export function getAdminToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || "";
}

// Llama a una server function admin inyectando el token.
export async function adminCall<TData extends Record<string, unknown>, TResult>(
  fn: (args: { data: { token: string } & TData }) => Promise<TResult>,
  data: TData
): Promise<TResult> {
  const token = getAdminToken();
  return fn({ data: { token, ...data } } as any);
}

// Version para funciones que solo necesitan el token (sin data extra).
export async function adminCallEmpty<TResult>(
  fn: (args: { data: { token: string } }) => Promise<TResult>
): Promise<TResult> {
  const token = getAdminToken();
  return fn({ data: { token } } as any);
}
