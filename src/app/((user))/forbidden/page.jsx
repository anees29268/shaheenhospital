"use client";

import { Stack } from "@mui/material";

export default function Forbidden() {
  return (
    <Stack direction="column" spacing={1} p={3}>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
    </Stack>
  );
}
