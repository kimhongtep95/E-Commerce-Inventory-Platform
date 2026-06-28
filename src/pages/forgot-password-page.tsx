import { useMutation } from "@tanstack/react-query";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { api } from "../lib/api";

export function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const mutation = useMutation({
    mutationFn: api.forgotPassword,
  });

  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center" sx={{ px: 2, background: "linear-gradient(135deg, #F4F1EA 0%, #E0F2FE 100%)" }}>
      <Paper sx={{ maxWidth: 480, width: "100%", p: 4 }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <Typography variant="h3">Reset access</Typography>
            <Typography color="text.secondary">We’ll send you a password reset token so you can restore access quickly.</Typography>
          </div>
          <TextField label="Email" fullWidth {...register("email", { required: true })} />
          <Button type="submit" variant="contained" size="large" disabled={mutation.isPending}>
            Send reset email
          </Button>
          {mutation.isSuccess ? <Typography color="secondary.main">Reset instructions queued.</Typography> : null}
        </Stack>
      </Paper>
    </Stack>
  );
}

