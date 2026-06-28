import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppShell } from "./layouts/app-shell";
import { useAuthStore } from "./store/auth-store";
import { theme } from "./theme";
import { AdminUsersPage } from "./pages/admin-users-page";
import { DashboardPage } from "./pages/dashboard-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page";
import { IssuesPage } from "./pages/issues-page";
import { LoginPage } from "./pages/login-page";
import { ProjectDetailPage } from "./pages/project-detail-page";
import { ProjectsPage } from "./pages/projects-page";
import { RegisterPage } from "./pages/register-page";
import { VerifyEmailPage } from "./pages/verify-email-page";

const queryClient = new QueryClient();

function ProtectedRoute() {
  const token = useAuthStore((state) => state.accessToken);
  return token ? <AppShell /> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetailPage />,
      },
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "admin/users",
        element: <AdminUsersPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

