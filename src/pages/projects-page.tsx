import Grid from "@mui/material/Grid2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

type ProjectFormValues = {
  name: string;
  key: string;
  description: string;
};

export function ProjectsPage() {
  const token = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProjectFormValues>();

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getProjects(token ?? ""),
    enabled: Boolean(token),
    retry: false,
    placeholderData: [],
  });

  const createProjectMutation = useMutation({
    mutationFn: (payload: ProjectFormValues) => api.createProject(token ?? "", payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
      reset();
    },
  });

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
        <div>
          <Typography variant="h3">Projects</Typography>
          <Typography color="text.secondary">Create delivery spaces, invite teammates, and archive work when it ships.</Typography>
        </div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Project
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {projectsQuery.data?.map((project) => (
          <Grid size={{ xs: 12, md: 6, xl: 4 }} key={project.id}>
            <Card sx={{ height: "100%", background: "linear-gradient(135deg, #FFFDF8 0%, #E7F7F4 100%)" }}>
              <CardContent>
                <Typography variant="overline" color="secondary.main">
                  {project.key}
                </Typography>
                <Typography variant="h5">{project.name}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {project.description}
                </Typography>
                <Button component={RouterLink} to={`/projects/${project.id}`} sx={{ mt: 2, px: 0 }}>
                  Open workspace
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <Stack component="form" spacing={2} sx={{ mt: 1 }} onSubmit={handleSubmit((values) => createProjectMutation.mutate(values))}>
            <TextField label="Name" {...register("name", { required: true })} />
            <TextField label="Key" {...register("key", { required: true, maxLength: 5 })} />
            <TextField label="Description" multiline minRows={3} {...register("description", { required: true })} />
            <Button type="submit" variant="contained" disabled={createProjectMutation.isPending}>
              Create project
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
