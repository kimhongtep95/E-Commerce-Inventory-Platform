import BugReportRounded from "@mui/icons-material/BugReportRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import FolderOpenRounded from "@mui/icons-material/FolderOpenRounded";
import GroupRounded from "@mui/icons-material/GroupRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/auth-store";

const drawerWidth = 260;

const navigation = [
  { label: "Dashboard", icon: <DashboardRounded />, to: "/" },
  { label: "Projects", icon: <FolderOpenRounded />, to: "/projects" },
  { label: "Issues", icon: <BugReportRounded />, to: "/issues" },
  { label: "Search", icon: <SearchRounded />, to: "/issues?mode=search" },
  { label: "Admin", icon: <GroupRounded />, to: "/admin/users" },
];

export function AppShell() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(180deg, #F4F1EA 0%, #EEF7F4 100%)" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "rgba(255, 253, 248, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(15, 118, 110, 0.12)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <Typography variant="overline" sx={{ letterSpacing: 2 }}>
              SearchBugs
            </Typography>
            <Typography variant="h6">Bug tracking for teams that ship fast</Typography>
          </div>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography color="text.secondary">{user?.fullName ?? "Architect"}</Typography>
            <Button variant="outlined" endIcon={<LogoutRounded />} onClick={signOut}>
              Sign out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(15, 118, 110, 0.12)",
            background: "linear-gradient(180deg, #123B39 0%, #0F766E 100%)",
            color: "#FFFDF8",
          },
        }}
      >
        <Toolbar />
        <Stack sx={{ px: 3, py: 4, gap: 3, height: "100%" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <BugReportRounded />
            <div>
              <Typography variant="h6">SearchBugs</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Resolve risk before it spreads.
              </Typography>
            </div>
          </Stack>
          <List sx={{ p: 0 }}>
            {navigation.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  "&.active": {
                    backgroundColor: "rgba(255, 253, 248, 0.12)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 10, ml: { md: `${drawerWidth}px` } }}>
        <Outlet />
      </Box>
    </Box>
  );
}

