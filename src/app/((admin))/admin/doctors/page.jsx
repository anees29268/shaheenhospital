"use client";

import AddDoctor from "@/components/admin/AddDoctor";
import ManageDoctors from "@/components/admin/ManageDoctors";
import { MedicalServices, Medication } from "@mui/icons-material";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Doctors_Admin = () => {
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
          <Tab label="Add Doctor" icon={<MedicalServices />} />
          <Tab label="Manage Doctors" icon={<Medication />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <AddDoctor />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <ManageDoctors />
      </Box>
    </Stack>
  );
};

export default Doctors_Admin;
