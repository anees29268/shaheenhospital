"use client";

import GeneralRecords from "@/components/users/GeneralRecords";
import { recordsData } from "@/data/demo";
import { MedicalServices, Medication, Print } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import PrintPreviews from "../preview/page";

const Records = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [generalRecords, setGeneralRecords] = useState();

  const [pat, setPat] = useState();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handlePatPreview = (row) => {
    const _id = row.original._id;

    const newRecord = generalRecords
      ? generalRecords.find((item) => item._id === _id)
      : null;

    setPat(newRecord);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 10,
        enableEditing: false,
      },
      {
        accessorKey: "actions",
        header: "Preview",
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <IconButton color="secondary" onClick={() => handlePatPreview(row)}>
            <Print />
          </IconButton>
        ),
      },
      {
        accessorKey: "cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "fatherName",
        header: "Father Name",
        size: 100,
      },

      {
        accessorKey: "fee", //normal accessorKey
        header: "FEE",
        size: 100,
      },
      {
        accessorKey: "contact", //normal accessorKey
        header: "Contact",
        size: 100,
      },
      {
        accessorKey: "caseType", //normal accessorKey
        header: "Case Type",
        size: 70,
        editVariant: "select",
        editSelectOptions: ["emergency", "general"],
        Cell: ({ renderedCellValue, row }) => (
          <i
            style={{
              textTransform: "capitalize",
            }}
          >
            {row.original.case}
          </i>
        ),
      },
      {
        accessorKey: "bloodGroup", //normal accessorKey
        header: "Blood Group",
        size: 50,
        editVariant: "select",
        editSelectOptions: ["A+", "A-", "O+", "O-", "B+", "B-", "AB+", "AB-"],
        Cell: ({ renderedCellValue, row }) => (
          <i
            style={{
              textTransform: "capitalize",
            }}
          >
            {renderedCellValue}
          </i>
        ),
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Reg. Date",
        enableEditing: false,
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
    ],
    []
  );

  const getAllRecords = async () => {
    try {
      const res = await axios.get("/api/user/patients");

      if (res.status === 200) {
        setGeneralRecords(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  const handleSaveDoctor = async ({ values, table }) => {
    try {
      const res = await axios.put("/api/user/patients", values);
      if (res.status === 200) {
        alert(`${res.data}`);
        getAllRecords();
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      table.setEditingRow(null); //exit editing mode
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: generalRecords ? generalRecords : [],
    enableEditing: true,
    onEditingRowSave: handleSaveDoctor,
  });

  function identifyGenderFromCNIC(cnic) {
    // Extract the last digit of the CNIC number
    const lastDigit = parseInt(cnic[cnic.length - 1]);

    // Check if the last digit is even or odd
    if (lastDigit % 2 === 0) {
      return "Female";
    } else {
      return "Male";
    }
  }

  return (
    <Stack direction="column" spacing={1} p={3}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="All Patients" icon={<MedicalServices />} />
          <Tab label="Appointed Patients" icon={<Medication />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <MaterialReactTable table={table} />
        <br />
        <br />
        {pat ? (
          <PrintPreviews
            name={pat.name}
            father_husband={pat.fatherName}
            cnic={pat.cnic}
            gender={identifyGenderFromCNIC(pat.cnic)}
            age={pat.age}
            patientType={pat.case}
            address={pat.address}
            contact={pat.contact}
            regDate={pat.regDate}
          />
        ) : (
          <>Waiting for Preview...</>
        )}
      </Box>
      <Box hidden={tabIndex !== 1}>
        <GeneralRecords />
      </Box>
    </Stack>
  );
};

export default Records;
