"use client";

import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

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
import { Delete, Edit } from "@mui/icons-material";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState();

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/admin/doctor");
      if (res.status === 200) {
        setDoctors(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 1,
        enableEditing: false,
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },

      {
        accessorKey: "hiringDate", //access nested data with dot notation
        header: "Hiring's Date",
        size: 150,
        editVariant: "date",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("DD/MM/YYYY")}</>
        ),
      },
      {
        accessorKey: "status", //access nested data with dot notation
        header: "Status",
        size: 150,
        editVariant: "select",
        editSelectOptions: ["active", "non-active"],
      },
      {
        accessorKey: "cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "contact", //access nested data with dot notation
        header: "Contact",
        size: 150,
      },
      {
        accessorKey: "specialization",
        header: "Specialization",
        size: 150,
      },
      {
        accessorKey: "desc", //normal accessorKey
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
    ],
    []
  );
  // bookingDate: `${dayjs("2024-04-04T23:30:00").format(
  //   "DD MMMM, YYYY hh:mm A"
  // )}`,

  const handleSaveDoctor = async ({ values, table }) => {
    try {
      const res = await axios.put("/api/admin/doctor", values);
      if (res.status === 200) {
        alert("Doctor Updated");
        getDoctors();
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      table.setEditingRow(null); //exit editing mode
    }
  };

  const handleDoctorDelete = async (row) => {
    const data = row.original;
    try {
      const res = await axios.delete("/api/admin/doctor", { data });
      if (res.status === 200) {
        alert("Doctor Deleted");
        getDoctors();
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: doctors ? doctors : [],
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    onEditingRowSave: handleSaveDoctor,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDoctorDelete(row)}>
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

export default ManageDoctors;
