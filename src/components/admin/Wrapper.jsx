"use client";

import {
  Copyright,
  HomeMaxOutlined,
  Menu as MenuIcon,
  Sync,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { changeSidebarMode } from "@/redux/slice";
// import SidebarHeading from "../SidebarHeading";

import { useRouter } from "next/navigation";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { doctorsData } from "@/data/demo";
import Header from "./Header";
import SidebarHeading from "./SidebarHeading";
import { doctorMenu } from "@/data/siderbars";
import { useSession } from "next-auth/react";

export default function Wrapper({ children }) {
  const theme = useTheme();
  const match = useMediaQuery("(max-width:800px)");
  const sidebar = useSelector((data) => data.isSidebarOpen);

  const dispatch = useDispatch();
  const router = useRouter();
  const loading = false;
  const session = useSession();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {loading ? (
        <Box className="global" mt={5}>
          {" "}
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"}>
          {/* Sidebar */}

          <Drawer
            variant={match ? "temporary" : "permanent"}
            open={sidebar}
            onClose={() => dispatch(changeSidebarMode(!sidebar))}
          >
            <Stack
              direction={"column"}
              spacing={1}
              width={250}
              className="siderbarbg"
              sx={{
                bgcolor: theme.palette.mainAccent[300],
                height: "100%",
              }}
            >
              <SidebarHeading type={"ADMIN"} />
              <Divider />
              <List>
                {doctorMenu.map((item, key) => (
                  <ListItem disablePadding key={key}>
                    <ListItemButton onClick={() => router.push(item.url)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Drawer>
          <Stack
            direction={"column"}
            spacing={1}
            sx={{
              height: "100%",
              minHeight: "100vh",
              overflowX: "hidden",
              ml: match ? "0px" : "250px",
            }}
          >
            {/* Header */}
            <Header userName={"Haris"} />
            {/* Main Body */}

            {children}

            {/* Footer */}
            <div
              className="global"
              style={{
                marginTop: "auto",
                gap: "10px",
                padding: "20px 5px",
                backgroundColor: theme.palette.mainAccent[300],
              }}
            >
              <Copyright />
              <Typography variant="body1">Shaheen Hospital</Typography>
            </div>
          </Stack>
        </Box>
      )}
    </LocalizationProvider>
  );
}
