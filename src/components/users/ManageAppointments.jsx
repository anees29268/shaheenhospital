"use client";

import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

import { appointmentsData } from "@/data/demo";
import {
  Autocomplete,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const ManageAppointments = () => {
  const [apptData, setApptData] = useState();
  const columns = useMemo(
    () => [
      {
        accessorKey: "patient.cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "patient.name", //access nested data with dot notation
        header: "Patient",
        size: 150,
      },
      {
        accessorKey: "doctor.name",
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Booking Date",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "fee", //normal accessorKey
        header: "Fee",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <>{renderedCellValue.toLocaleString()}</>
        ),
      },
      {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
    ],
    []
  );
  // bookingDate: `${dayjs("2024-04-04T23:30:00").format(
  //   "DD MMMM, YYYY hh:mm A"
  // )}`,

  const getAppData = async () => {
    try {
      const res = await axios.get("/api/user/appointments");
      if (res.status === 200) {
        setApptData(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getAppData();
  }, []);

  const handleAptDelete = async (row) => {
    const data = row.original;
    try {
      const _id = row.original._id;
      const res = await axios.delete("/api/user/appointments", { data });
      if (res.status === 200) {
        alert(res.data);
      }
    } catch (error) {
      alert(`${error.response.data}`);
    } finally {
      getAppData();
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: apptData ? apptData : [],
    enableEditing: true,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleAptDelete(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });
  return (
    <Box>
      <Paper
        elevation={10}
        sx={{
          p: 1,
        }}
      >
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  );
};

export default ManageAppointments;
