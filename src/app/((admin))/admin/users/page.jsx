"use client";

import AddUsers from "@/components/admin/AddUsers";
import ManageUsers from "@/components/admin/ManageUsers";
import { AddAlert, Settings } from "@mui/icons-material";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Users_Admin = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack direction={"column"} p={2}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Add Users" icon={<AddAlert />} />
          <Tab label="Manage Users" icon={<Settings />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <AddUsers />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <ManageUsers />
      </Box>
    </Stack>
  );
};

export default Users_Admin;
