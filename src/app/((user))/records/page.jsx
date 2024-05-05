"use client";

import { recordsData } from "@/data/demo";
import { Paper, Stack } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

const Records = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "S.No",
        size: 10,
      },
      {
        accessorKey: "patientCNIC", //access nested data with dot notation
        header: "Patient CNIC",
        size: 50,
      },
      {
        accessorKey: "patientName",
        header: "patient Name",
        size: 100,
      },
      {
        accessorKey: "caseType", //normal accessorKey
        header: "Case Type",
        size: 100,
      },
      {
        accessorKey: "checkedBy", //access nested data with dot notation
        header: "Checked By",
        size: 100,
      },
      {
        accessorKey: "appointmentDate", //access nested data with dot notation
        header: "Appointment Date",
        size: 100,
      },
      {
        accessorKey: "releasedDate",
        header: "Released Date",
        size: 100,
      },
      {
        accessorKey: "fee", //normal accessorKey
        header: "FEE",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorKey: "remarks", //normal accessorKey
        header: "Remarks",
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: recordsData,
  });

  return (
    <Stack direction="column" spacing={1} p={1}>
      <Paper
        elevation={10}
        sx={{
          p: 1,
        }}
      >
        <MaterialReactTable table={table} />
      </Paper>
    </Stack>
  );
};

export default Records;
