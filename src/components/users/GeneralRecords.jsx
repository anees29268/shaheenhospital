"use client"

import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";

const GeneralRecords = () => {

    const columns = useMemo(
        () => [
          {
            accessorKey: "id", //access nested data with dot notation
            header: "S.No",
            size: 10,
            enableEditing: false,
          },
          {
            accessorKey: "patientCNIC", //access nested data with dot notation
            header: "Patient CNIC",
            size: 50,
          },
          {
            accessorKey: "patientName",
            header: "Patient Name",
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
        data: [],
      });
    return (
        <>
         <MaterialReactTable table={table} />
        </>
    );
}

export default GeneralRecords;