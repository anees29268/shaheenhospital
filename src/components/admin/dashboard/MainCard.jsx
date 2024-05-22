"use client";

import { Avatar, Box, Typography } from "@mui/material";

const MainCard = ({ title, amt, src }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={"15px 15px"}
      alignItems={"center"}
      gap={1}
      sx={{
        background: "linear-gradient(to right, #02aab0, #00cdac);",
        borderRadius: 1,
        minWidth: 200,
      }}
    >
      <Avatar
        src={src}
        variant="square"
        sx={{
          height: 55,
          width: 55,
        }}
      />
      <Typography variant="body1" textAlign={"center"}>
        {title}
      </Typography>
      <Typography variant="body1" fontWeight={700} textAlign={"center"}>
        {amt}
      </Typography>
    </Box>
  );
};

export default MainCard;
