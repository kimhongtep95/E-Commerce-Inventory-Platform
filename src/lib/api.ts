import { DashboardData, Issue, Project } from "../types/models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(path: string, method: HttpMethod, token?: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ detail: "Request failed." }));
    throw new Error(payload.detail ?? "Request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: { email: string; password: string }) =>
    request<{ access_token: string; refresh_token: string }>("/auth/login", "POST", undefined, payload),
  register: (payload: { email: string; password: string; full_name: string; role: string }) =>
    request("/auth/register", "POST", undefined, payload),
  forgotPassword: (payload: { email: string }) => request("/auth/forgot-password", "POST", undefined, payload),
  verifyEmail: (token: string) => request(`/auth/verify-email?token=${encodeURIComponent(token)}`, "GET"),
  getProjects: (token: string) => request<Project[]>("/projects", "GET", token),
  createProject: (token: string, payload: { name: string; key: string; description: string }) =>
    request<Project>("/projects", "POST", token, payload),
  inviteProjectMember: (token: string, projectId: string, payload: { user_id: string; role: string }) =>
    request(`/projects/${projectId}/members`, "POST", token, payload),
  getIssues: (token: string, projectId: string) =>
    request<Issue[]>(`/issues?project_id=${encodeURIComponent(projectId)}`, "GET", token),
  searchIssues: (token: string, params: URLSearchParams) =>
    request<Issue[]>(`/issues/search/results?${params.toString()}`, "GET", token),
  createIssue: (token: string, payload: Record<string, unknown>) => request<Issue>("/issues", "POST", token, payload),
  updateIssue: (token: string, issueId: string, payload: Record<string, unknown>) =>
    request<Issue>(`/issues/${issueId}`, "PATCH", token, payload),
  getDashboard: (token: string, projectId?: string) =>
    request<DashboardData>(
      `/dashboard/statistics${projectId ? `?project_id=${encodeURIComponent(projectId)}` : ""}`,
      "GET",
      token,
    ),
};

