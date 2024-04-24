"use client";

import { Box, useTheme } from "@mui/material";

const SidebarHeading = ({ type }) => {
  const theme = useTheme();
  return (
    <Box
      className="global"
      p="15px 10px"
      sx={{
        span: {
          textTransform: "uppercase",
          fontWeight: 600,
          color: theme.palette.text.secondary,
        },
      }}
    >
      <span>{type ? type : "loading..."}</span>
    </Box>
  );
};

export default SidebarHeading;
