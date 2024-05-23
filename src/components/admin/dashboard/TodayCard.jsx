"use client";

import { Avatar, Box, Typography } from "@mui/material";

const TodayCard = ({ bgcolor, src, title, total }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={"10px 10px"}
      // alignItems={"center"}
      gap={1}
      sx={{
        background: bgcolor,
        borderRadius: 1,
        minWidth: 250,
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Avatar
          src={src}
          variant="square"
          sx={{
            height: 40,
            width: 40,
          }}
        />
        <Typography fontWeight={700} variant="body1">
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        fontWeight={700}
        sx={{
          ml: 2,
          mt: 1,
        }}
      >
        RS. {total ? total.toLocaleString() : 0}
      </Typography>
    </Box>
  );
};

export default TodayCard;
