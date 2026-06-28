import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { api } from "../lib/api";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const query = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => api.verifyEmail(token),
    enabled: Boolean(token),
    retry: false,
  });
  const errorMessage = query.error instanceof Error ? query.error.message : "Provide a verification token to continue.";

  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center" sx={{ px: 2, background: "linear-gradient(135deg, #F4F1EA 0%, #D6F3EF 100%)" }}>
      <Paper sx={{ maxWidth: 480, width: "100%", p: 4 }}>
        <Stack spacing={2} alignItems="center">
          {query.isPending ? <CircularProgress /> : null}
          <Typography variant="h4">Verify your email</Typography>
          <Typography color="text.secondary" textAlign="center">
            {query.isSuccess
              ? "Your account is verified. You can return to login."
              : query.error
                ? errorMessage
                : "Provide a verification token to continue."}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
