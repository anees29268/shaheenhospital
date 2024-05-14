"use client";

import { doctorsData } from "@/data/demo";
import { MedicalServices, Medication } from "@mui/icons-material";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
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
        accessorKey: "doctorId.name", //access nested data with dot notation
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "startTime", //access nested data with dot notation
        header: "Start Timing",
        size: 150,

        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "endTime", //access nested data with dot notation
        header: "End Timing",
        size: 150,

        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "roomNo", //access nested data with dot notation
        header: "Room No",
        size: 150,
      },

      {
        accessorKey: "daysOfWeek", //access nested data with dot notation
        header: "Days of Week",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>{renderedCellValue.toString()}</>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: doctorsTiming ? doctorsTiming : [],
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
