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
          <>{dayjs(renderedCellValue).format("h:mm A")}</>
        ),
      },
      {
        accessorKey: "endTime", //access nested data with dot notation
        header: "End Timing",
        size: 150,

        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("h:mm A")}</>
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
  const doctorsColumns = useMemo(
    () => [
      {
        accessorKey: "doctorId.name", //access nested data with dot notation
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "doctorId.contact", //access nested data with dot notation
        header: "Contact",
        size: 150,
      },
      {
        accessorKey: "doctorId.specialization", //access nested data with dot notation
        header: "Specialization",
        size: 150,
      },
      {
        accessorKey: "doctorId.address", //access nested data with dot notation
        header: "Address",
        size: 150,
      },
    ],
    []
  );

  console.log(doctorsTiming);

  const table = useMaterialReactTable({
    columns,
    data: doctorsTiming ? doctorsTiming : [],
  });
  const doctorTable = useMaterialReactTable({
    columns: doctorsColumns,
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
    <Stack direction="column" spacing={3} p={3}>
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

      <Box hidden={tabIndex !== 0} mt={2}>
        <MaterialReactTable table={table} />
      </Box>
      <Box hidden={tabIndex !== 1} mt={2}>
        <MaterialReactTable table={doctorTable} />
      </Box>
    </Stack>
  );
};

export default Doctors;
