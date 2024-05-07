"use client";

import { changeSidebarMode } from "@/redux/slice";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
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

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ userName }) => {
  const match = useMediaQuery("(max-width:800px)");
  const sidebar = useSelector((data) => data.isSidebarOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function pickCapitalH(str) {
    // Check if the string starts with 'H'
    if (str.charAt(0) === "H") {
      // If it does, return 'H' capitalized
      return "H";
    } else {
      // Otherwise, return an empty string
      return "";
    }
  }

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
        <Typography variant="h6">Shaheen Hospital</Typography>
        <Box mr={"50px"}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userName}>{pickCapitalH(userName)}</Avatar>
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
            <MenuItem>
              <Logout />
              <Typography ml={2} textAlign="center">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;