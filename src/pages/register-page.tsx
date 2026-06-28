import { useMutation } from "@tanstack/react-query";
import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { api } from "../lib/api";

type RegisterValues = {
  email: string;
  password: string;
  full_name: string;
  role: "admin" | "project_manager" | "developer" | "qa_tester";
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterValues>({
    defaultValues: {
      role: "project_manager",
    },
  });

  const mutation = useMutation({
    mutationFn: api.register,
    onSuccess: () => navigate("/login"),
  });
  const errorMessage = mutation.error instanceof Error ? mutation.error.message : null;

  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center" sx={{ px: 2, background: "linear-gradient(135deg, #F4F1EA 0%, #FFE7D6 100%)" }}>
      <Paper sx={{ maxWidth: 520, width: "100%", p: 4 }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <Typography variant="h3">Create your team account</Typography>
            <Typography color="text.secondary">SearchBugs supports admins, PMs, developers, and QA testers out of the box.</Typography>
          </div>
          <TextField label="Full Name" fullWidth {...register("full_name", { required: true })} />
          <TextField label="Email" fullWidth {...register("email", { required: true })} />
          <TextField label="Password" type="password" fullWidth {...register("password", { required: true })} />
          <TextField label="Role" select fullWidth defaultValue="project_manager" {...register("role")}>
            {["admin", "project_manager", "developer", "qa_tester"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" size="large" disabled={mutation.isPending}>
            Register
          </Button>
          {errorMessage ? <Typography color="error">{errorMessage}</Typography> : null}
        </Stack>
      </Paper>
    </Stack>
  );
}
