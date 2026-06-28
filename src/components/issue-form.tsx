import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

import { Issue } from "../types/models";

export type IssueFormValues = {
  title: string;
  description: string;
  project_id: string;
  issue_type: Issue["issue_type"];
  priority: Issue["priority"];
  severity: Issue["severity"];
  due_date: string;
  sprint: string;
  labels: string;
};

interface IssueFormProps {
  defaultProjectId?: string;
  onSubmit: (payload: IssueFormValues) => Promise<void>;
}

export function IssueForm({ defaultProjectId = "", onSubmit }: IssueFormProps) {
  const { handleSubmit, register, reset, formState } = useForm<IssueFormValues>({
    defaultValues: {
      title: "",
      description: "",
      project_id: defaultProjectId,
      issue_type: "bug",
      priority: "high",
      severity: "major",
      due_date: "",
      sprint: "",
      labels: "",
    },
  });

  return (
    <Paper sx={{ p: 3, border: "1px solid rgba(194, 65, 12, 0.12)" }}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5">Create Issue</Typography>
          <Typography color="text.secondary">Capture bugs, features, and delivery work from one place.</Typography>
        </div>
        <Grid container spacing={2} component="form" onSubmit={handleSubmit(async (values) => {
          await onSubmit(values);
          reset({ ...values, title: "", description: "", labels: "" });
        })}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Title" fullWidth {...register("title", { required: true })} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Project ID" fullWidth {...register("project_id", { required: true })} />
          </Grid>
          <Grid size={12}>
            <TextField label="Description" fullWidth multiline minRows={4} {...register("description", { required: true })} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Issue Type" select fullWidth defaultValue="bug" {...register("issue_type")}>
              {["bug", "feature", "improvement", "epic", "task"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Priority" select fullWidth defaultValue="high" {...register("priority")}>
              {["low", "medium", "high", "critical"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Severity" select fullWidth defaultValue="major" {...register("severity")}>
              {["minor", "major", "critical", "blocker"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Due Date" type="date" InputLabelProps={{ shrink: true }} fullWidth {...register("due_date")} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Sprint" fullWidth {...register("sprint")} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Labels (comma separated)" fullWidth {...register("labels")} />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" disabled={formState.isSubmitting}>
              Add to backlog
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
