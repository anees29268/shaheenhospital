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

const ManageUsers = () => {
  const [users, setUsers] = useState();
  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getUsers();
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
        accessorKey: "cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        size: 150,
      },
    ],
    []
  );
  // bookingDate: `${dayjs("2024-04-04T23:30:00").format(
  //   "DD MMMM, YYYY hh:mm A"
  // )}`,

  const handleSaveUser = async ({ values, table }) => {
    if (pass.password !== pass.confirmPassword) {
      alert("Passwords Not Matched!");
      table.setEditingRow(null);
      return;
    }
    try {
      const data = {
        _id: values._id,
        name: values.name,
        cnic: values.cnic,
        password: pass.password,
      };
      const res = await axios.put("/api/admin/users", data);
      if (res.status === 200) {
        alert("User Updated");
        getUsers();
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      table.setEditingRow(null); //exit editing mode
    }
  };

  const handleUserDelete = async (row) => {
    const data = row.original;
    try {
      const res = await axios.delete("/api/admin/users", { data });
      if (res.status === 200) {
        alert("User Deleted");
        getUsers();
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: users ? users : [],
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
          <TextField
            fullWidth
            variant="filled"
            label="Password"
            value={pass.password}
            onChange={(e) =>
              setPass({
                ...pass,
                password: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            variant="filled"
            label="Confirm Password"
            value={pass.confirmPassword}
            onChange={(e) =>
              setPass({
                ...pass,
                confirmPassword: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleUserDelete(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });
  return (
    <Box mt={4}>
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

export default ManageUsers;
