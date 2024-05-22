"use client";

import { Box, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const ManagePaymentCat = () => {
  const [cat, setCat] = useState();
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
        accessorKey: "desc", //access nested data with dot notation
        header: "Description",
        size: 150,
      },
    ],
    []
  );

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/admin/payment-category");
      if (res.status === 200) {
        setCat(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSaveCat = async ({ values, table }) => {
    // console.log(values);
    try {
      const res = await axios.put("/api/admin/payment-category", values);
      if (res.status === 200) {
        alert(`${res.data}`);
        getCategories();
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      table.setEditingRow(null); //exit editing mode
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: cat ? cat : [],
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Payment Category</DialogTitle>
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
    onEditingRowSave: handleSaveCat,
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default ManagePaymentCat;
