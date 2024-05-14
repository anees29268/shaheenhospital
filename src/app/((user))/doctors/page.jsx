"use client";

import { doctorsData } from "@/data/demo";
import { MedicalServices, Medication } from "@mui/icons-material";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const Doctors = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [doctorsTiming, setDoctorsTiming] = useState();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "doctor", //access nested data with dot notation
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "timing", //access nested data with dot notation
        header: "Timing",
        size: 150,
      },
      {
        accessorKey: "days",
        header: "Days",
        size: 150,
      },
      {
        accessorKey: "desc", //normal accessorKey
        header: "Description",
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: doctorsData,
  });

  const getDoctorsTiming = async () => {
    try {
      const res = await axios.get("/api/admin/timing");

      if (res.status === 200) {
        setDoctorsTiming(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getDoctorsTiming();
  }, []);

  console.log(doctorsTiming);
  return (
    <Stack direction="column" spacing={1} p={1}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Available Doctors" icon={<MedicalServices />} />
          <Tab label="Doctors Details" icon={<Medication />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <Paper
          elevation={10}
          sx={{
            p: 1,
          }}
        >
          <MaterialReactTable table={table} />
        </Paper>
      </Box>
      <Box hidden={tabIndex !== 1}></Box>
    </Stack>
  );
};

export default Doctors;
