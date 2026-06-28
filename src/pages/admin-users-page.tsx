import Grid from "@mui/material/Grid2";
import { Chip, Paper, Stack, Typography } from "@mui/material";

const roles = [
  {
    name: "Admin",
    responsibilities: ["Platform governance", "Security policy", "Cross-project visibility"],
  },
  {
    name: "Project Manager",
    responsibilities: ["Roadmap ownership", "Sprint planning", "Team coordination"],
  },
  {
    name: "Developer",
    responsibilities: ["Implementation", "Fix ownership", "Technical feedback"],
  },
  {
    name: "QA Tester",
    responsibilities: ["Reproduction steps", "Regression validation", "Release confidence"],
  },
];

export function AdminUsersPage() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3">Role Governance</Typography>
        <Typography color="text.secondary">Define who can triage work, assign bugs, and close delivery loops.</Typography>
      </div>

      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid size={{ xs: 12, md: 6 }} key={role.name}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5">{role.name}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
                {role.responsibilities.map((responsibility) => (
                  <Chip key={responsibility} label={responsibility} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
