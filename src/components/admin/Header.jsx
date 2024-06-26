"use client";

import { changeSidebarMode } from "@/redux/slice";
import { Logout, Menu as MenuIcon, Navigation } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ userName }) => {
  const match = useMediaQuery("(max-width:800px)");
  const sidebar = useSelector((data) => data.isSidebarOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const session = useSession();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      className="global"
      sx={{
        bgcolor: theme.palette.mainAccent[300],
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
      >
        <IconButton
          onClick={() => dispatch(changeSidebarMode(!sidebar))}
          sx={{
            display: "none",
            "@media (max-width:800px)": {
              display: "flex",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box className="global" gap={1}>
          <Avatar src="/assets/logo.jpg" />
          <Typography variant="h6" textTransform={"uppercase"}>
            Shaheen Hospital
          </Typography>
        </Box>

        <Box mr={"50px"}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={session?.data?.user?.name}>
                {session?.data?.user?.name?.toUpperCase().charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => handleLogout()}>
              <Logout />
              <Typography ml={2} textAlign="center">
                Logout
              </Typography>
            </MenuItem>
            {session?.data?.user?.role === "admin" ? (
              <MenuItem onClick={() => router.push("/")}>
                <Navigation />
                <Typography ml={2} textAlign="center">
                  User Side
                </Typography>
              </MenuItem>
            ) : null}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
