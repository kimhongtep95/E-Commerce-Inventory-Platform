import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Divider, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

type InviteFormValues = {
  user_id: string;
  role: "admin" | "project_manager" | "developer" | "qa_tester";
};

export function ProjectDetailPage() {
  const { projectId = "" } = useParams();
  const token = useAuthStore((state) => state.accessToken);
  const { register, handleSubmit } = useForm<InviteFormValues>({
    defaultValues: { role: "developer" },
  });

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getProjects(token ?? ""),
    enabled: Boolean(token),
    placeholderData: [],
  });

  const project = projectsQuery.data?.find((item) => item.id === projectId);

  const inviteMutation = useMutation({
    mutationFn: (payload: InviteFormValues) => api.inviteProjectMember(token ?? "", projectId, payload),
  });

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="overline" color="secondary.main">
          {project?.key ?? "PROJECT"}
        </Typography>
        <Typography variant="h3">{project?.name ?? "Project workspace"}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {project?.description ?? "Project details and team role management."}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} component="form" onSubmit={handleSubmit((values) => inviteMutation.mutate(values))}>
          <Typography variant="h5">Invite member</Typography>
          <Divider />
          <TextField label="User ID" {...register("user_id", { required: true })} />
          <TextField label="Role" select defaultValue="developer" {...register("role")}>
            {["admin", "project_manager", "developer", "qa_tester"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained">
            Send invite
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

