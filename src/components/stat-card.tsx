import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { Paper, Stack, Typography } from "@mui/material";

interface StatCardProps {
  eyebrow: string;
  value: string;
  helper: string;
}

export function StatCard({ eyebrow, value, helper }: StatCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        border: "1px solid rgba(15, 118, 110, 0.12)",
        background:
          "linear-gradient(135deg, rgba(255,253,248,1) 0%, rgba(216,243,239,0.9) 100%)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="overline" sx={{ letterSpacing: 2 }}>
          {eyebrow}
        </Typography>
        <TrendingUpRounded color="secondary" />
      </Stack>
      <Typography variant="h3" sx={{ mt: 2 }}>
        {value}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {helper}
      </Typography>
    </Paper>
  );
}

