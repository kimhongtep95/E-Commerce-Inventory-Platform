export type Role = "admin" | "project_manager" | "developer" | "qa_tester";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  owner_id: string;
  is_archived: boolean;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  issue_type: "bug" | "feature" | "improvement" | "epic" | "task";
  priority: "low" | "medium" | "high" | "critical";
  severity: "minor" | "major" | "critical" | "blocker";
  status: "open" | "in_progress" | "ready_for_qa" | "closed";
  project_id: string;
  reporter_id: string;
  assignee_id: string | null;
  due_date: string | null;
  sprint: string | null;
  labels: string[];
  attachment_urls: string[];
}

export interface DashboardData {
  bugs_by_status: Record<string, number>;
  bugs_by_priority: Record<string, number>;
  open_vs_closed: Record<string, number>;
  assigned_bugs: Record<string, number>;
  sprint_burndown: Array<{ label: string; value: number }>;
  project_progress: number;
}

