"use client";

import ManageAppointments from "@/components/users/ManageAppointments";
import { AddBox, ManageAccounts } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Appointments = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack direction="column" spacing={1} p={1}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Add Appointments" icon={<AddBox />} />
          <Tab label="Manage Appointments" icon={<ManageAccounts />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}></Box>

      {/* Manage Appointments */}

      <Box hidden={tabIndex !== 1}>
        <ManageAppointments />
      </Box>
    </Stack>
  );
};

export default Appointments;
