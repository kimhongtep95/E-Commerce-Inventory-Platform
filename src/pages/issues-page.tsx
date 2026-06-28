import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Chip,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { IssueForm, IssueFormValues } from "../components/issue-form";
import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

export function IssuesPage() {
  const token = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const [projectId, setProjectId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const issuesQuery = useQuery({
    queryKey: ["issues", projectId, statusFilter],
    queryFn: () => {
      if (statusFilter) {
        const params = new URLSearchParams();
        if (projectId) params.set("project_id", projectId);
        params.set("status", statusFilter);
        return api.searchIssues(token ?? "", params);
      }
      return projectId ? api.getIssues(token ?? "", projectId) : Promise.resolve([]);
    },
    enabled: Boolean(token),
    placeholderData: [],
  });

  const createIssueMutation = useMutation({
    mutationFn: async (values: IssueFormValues) => {
      const payload = {
        ...values,
        due_date: values.due_date || null,
        sprint: values.sprint || null,
        labels: values.labels
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      };
      return api.createIssue(token ?? "", payload);
    },
    onSuccess: async (_, values) => {
      setProjectId(values.project_id);
      await queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3">Issues</Typography>
        <Typography color="text.secondary">Manage bugs, tasks, features, improvements, and epic-level delivery work.</Typography>
      </div>

      <IssueForm
        defaultProjectId={projectId}
        onSubmit={async (values) => {
          await createIssueMutation.mutateAsync(values);
        }}
      />

      <Paper sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Project ID" value={projectId} onChange={(event) => setProjectId(event.target.value)} fullWidth />
          <TextField label="Status" select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} fullWidth>
            <MenuItem value="">All</MenuItem>
            {["open", "in_progress", "ready_for_qa", "closed"].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sprint</TableCell>
                <TableCell>Labels</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuesQuery.data?.map((issue) => (
                <TableRow key={issue.id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{issue.title}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {issue.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{issue.issue_type}</TableCell>
                  <TableCell>{issue.priority}</TableCell>
                  <TableCell>{issue.status}</TableCell>
                  <TableCell>{issue.sprint ?? "Backlog"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {issue.labels.map((label) => (
                        <Chip key={label} label={label} size="small" />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
