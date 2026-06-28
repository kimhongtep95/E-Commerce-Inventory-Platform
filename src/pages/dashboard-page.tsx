import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { Bar, Doughnut } from "react-chartjs-2";
import { Paper, Stack, Typography } from "@mui/material";

import { StatCard } from "../components/stat-card";
import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";
import { DashboardData } from "../types/models";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const fallbackDashboard: DashboardData = {
  bugs_by_status: { open: 18, in_progress: 9, ready_for_qa: 4, closed: 31 },
  bugs_by_priority: { low: 4, medium: 10, high: 22, critical: 8 },
  open_vs_closed: { open: 31, closed: 31 },
  assigned_bugs: { "Ava": 7, "Liam": 5, "Noah": 4, "Mia": 3 },
  sprint_burndown: [
    { label: "Planned", value: 40 },
    { label: "Remaining", value: 17 },
    { label: "Done", value: 23 },
  ],
  project_progress: 50,
};

export function DashboardPage() {
  const token = useAuthStore((state) => state.accessToken);
  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.getDashboard(token ?? ""),
    enabled: Boolean(token),
    retry: false,
  });

  const data = dashboardQuery.data ?? fallbackDashboard;
  const totalBugs = Object.values(data.bugs_by_status).reduce((total, count) => total + count, 0);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="overline" sx={{ letterSpacing: 2 }}>
          Portfolio Health
        </Typography>
        <Typography variant="h3">Engineering signal at a glance</Typography>
        <Typography color="text.secondary">Track delivery risk, backlog pressure, and sprint momentum from one dashboard.</Typography>
      </div>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard eyebrow="Open Work" value={`${data.open_vs_closed.open}`} helper="Issues currently active across projects" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard eyebrow="Closed This Cycle" value={`${data.open_vs_closed.closed}`} helper="Validated and resolved issues" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard eyebrow="Project Progress" value={`${data.project_progress}%`} helper={`${totalBugs} tracked work items in scope`} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Bugs by Status
            </Typography>
            <Bar
              data={{
                labels: Object.keys(data.bugs_by_status),
                datasets: [
                  {
                    label: "Issues",
                    data: Object.values(data.bugs_by_status),
                    backgroundColor: ["#0F766E", "#14B8A6", "#C2410C", "#1B4332"],
                    borderRadius: 12,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Open vs Closed
            </Typography>
            <Doughnut
              data={{
                labels: Object.keys(data.open_vs_closed),
                datasets: [
                  {
                    data: Object.values(data.open_vs_closed),
                    backgroundColor: ["#C2410C", "#0F766E"],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
