"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const ManagePayments = () => {
  const [payments, setPayments] = useState();

  const getPayments = async () => {
    try {
      const res = await axios.get("/api/admin/payments");
      if (res.status === 200) {
        setPayments(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getPayments();
  }, []);

  const handleSaveDoctor = async ({ values, table }) => {
    try {
      const res = await axios.put("/api/admin/payments", values);
      if (res.status === 200) {
        alert(`${res.data}`);
        getPayments();
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      table.setEditingRow(null); //exit editing mode
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 1,
        enableEditing: false,
      },
      {
        accessorKey: "title", //access nested data with dot notation
        header: "Title",
        size: 150,
      },

      {
        accessorKey: "amount", //access nested data with dot notation
        header: "Amount (RS)",
        size: 150,
        editVariant: "number",
        Cell: ({ renderedCellValue, row }) => (
          <>{renderedCellValue.toLocaleString()}</>
        ),
      },
    ],
    []
  );

  const handleDoctorDelete = async (row) => {
    const data = row.original;
    try {
      const res = await axios.delete("/api/admin/payments", { data });
      if (res.status === 200) {
        alert("Payment Deleted");
        getPayments();
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: payments ? payments : [],
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Payments</DialogTitle>
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
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default ManagePayments;
