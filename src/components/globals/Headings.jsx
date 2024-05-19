"use client";

import { Avatar, Stack, Typography } from "@mui/material";

const Headings = ({ title }) => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      sx={{
        p: 1,
        borderRadius: 1,
        background: "linear-gradient(to right, #93eef1, #c3d4ff)",
      }}
    >
      <Avatar
        src="/assets/title.png"
        variant="square"
        sx={{
          height: 40,
          width: 40,
        }}
      />
      <Typography
        variant="body1"
        className="global"
        fontSize={22}
        fontWeight={700}
        color={"text.secondary"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default Headings;
