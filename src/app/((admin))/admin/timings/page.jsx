"use client";

import AddTiming from "@/components/admin/AddTiming";
import ManageTiming from "@/components/admin/ManageTiming";
import { LockClock, Timelapse } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Admin_Timings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <Stack direction={"column"} p={3}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Add Timing" icon={<LockClock />} />
          <Tab label="Manage Timings" icon={<Timelapse />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <AddTiming />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <ManageTiming />
      </Box>
    </Stack>
  );
};

export default Admin_Timings;
