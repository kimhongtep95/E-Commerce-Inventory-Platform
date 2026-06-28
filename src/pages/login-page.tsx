import { useMutation } from "@tanstack/react-query";
import { Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const { register, handleSubmit } = useForm<LoginValues>({
    defaultValues: {
      email: "admin@searchbugs.dev",
      password: "Password123!",
    },
  });

  const loginMutation = useMutation({
    mutationFn: api.login,
    onSuccess: (tokens) => {
      signIn({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        user: {
          id: "current-user",
          email: "admin@searchbugs.dev",
          fullName: "SearchBugs Admin",
          role: "admin",
        },
      });
      navigate("/");
    },
  });
  const errorMessage = loginMutation.error instanceof Error ? loginMutation.error.message : null;

  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center" sx={{ px: 2, background: "linear-gradient(135deg, #F4F1EA 0%, #D6F3EF 100%)" }}>
      <Paper sx={{ maxWidth: 460, width: "100%", p: 4, border: "1px solid rgba(15,118,110,0.12)" }}>
        <Stack spacing={3}>
          <div>
            <Typography variant="overline" sx={{ letterSpacing: 2 }}>
              SearchBugs
            </Typography>
            <Typography variant="h3">Welcome back</Typography>
            <Typography color="text.secondary">Sign in to manage bugs, sprints, and delivery health.</Typography>
          </div>
          <Stack component="form" spacing={2} onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
            <TextField label="Email" fullWidth {...register("email", { required: true })} />
            <TextField label="Password" type="password" fullWidth {...register("password", { required: true })} />
            <Button type="submit" variant="contained" size="large" disabled={loginMutation.isPending}>
              Sign in
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Link component={RouterLink} to="/register">
              Create account
            </Link>
            <Link component={RouterLink} to="/forgot-password">
              Forgot password
            </Link>
          </Stack>
          {errorMessage ? <Typography color="error">{errorMessage}</Typography> : null}
        </Stack>
      </Paper>
    </Stack>
  );
}
