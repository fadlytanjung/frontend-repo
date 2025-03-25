"use client";

import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Box,
  CssBaseline,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  PeopleAltOutlined,
  Settings,
  Menu,
  ChevronLeft,
  LogoutOutlined,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/apis/userApi";

const drawerWidth = 240;

const navItems = [
  { text: "Home", icon: <Home />, path: "/main" },
  { text: "Users", icon: <PeopleAltOutlined />, path: "/users" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={isMobile ? toggleDrawer : undefined}
    >
      <Box>
        <Toolbar />
        <Divider />
        <List>
          {navItems.map(({ text, icon, path }) => {
            const selected = pathname === path;
            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Tooltip
                  title={!open && !isMobile ? text : ""}
                  placement="right"
                >
                  <ListItemButton
                    selected={selected}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => router.push(path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={text} />}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={!open && !isMobile ? "Logout" : ""} placement="right">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                mt: 1,
              }}
              onClick={async () => {
                await logoutUser();
                router.push("/login");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "red",
                }}
              >
                <LogoutOutlined />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 72,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
