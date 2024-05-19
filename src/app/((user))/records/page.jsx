"use client";

import GeneralRecords from "@/components/users/GeneralRecords";
import { MedicalServices, Medication, Print } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
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
  const [generalRecords, setGeneralRecords] = useState([]);
  const [emergencyRecords, setEmergencyRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [doctor, setDotor] = useState("");
  const [pat, setPat] = useState(null);
  const [apt, setApt] = useState(null);
  const [allApt, setAllApt] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const getPat = async (id, caseType, d) => {
    if (caseType === "emergency") {
      setAllApt(null);
      setApt(null);
    }
    try {
      const res = await axios.post("/api/user/patients/pat", {
        id,
        caseType,
        doctor: d,
      });
      if (res.status === 200) {
        setPat(res.data);
        if (caseType === "general") {
          setApt(res.data);
          setAllApt(res.data);
        }
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const handlePatPreview = (row) => {
    const id = row.original._id;
    const caseType = row.original.case;

    getPat(id, caseType, doctor);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        size: 10,
        enableEditing: false,
      },
      {
        accessorKey: "createdAt",
        header: "Reg. Date",
        enableEditing: false,
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
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
        accessorKey: "cnic",
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
        accessorKey: "fee",
        header: "FEE",
        size: 100,
      },
      {
        accessorKey: "contact",
        header: "Contact",
        size: 100,
      },
      {
        accessorKey: "caseType",
        header: "Case Type",
        size: 70,
        editVariant: "select",
        editSelectOptions: ["emergency", "general"],
        Cell: ({ renderedCellValue, row }) => (
          <i style={{ textTransform: "capitalize" }}>{row.original.case}</i>
        ),
      },
      {
        accessorKey: "bloodGroup",
        header: "Blood Group",
        size: 50,
        editVariant: "select",
        editSelectOptions: ["A+", "A-", "O+", "O-", "B+", "B-", "AB+", "AB-"],
        Cell: ({ renderedCellValue, row }) => (
          <i style={{ textTransform: "capitalize" }}>{renderedCellValue}</i>
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
        const data = res.data;
        setEmergencyRecords(data.filter((item) => item.case === "emergency"));
        setGeneralRecords(data.filter((item) => item.case === "general"));
        setAllRecords(data);
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
      table.setEditingRow(null);
    }
  };

  const getTableData = () => {
    if (tabIndex === 0) {
      return emergencyRecords;
    } else {
      return generalRecords;
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: getTableData(),
    enableEditing: true,
    onEditingRowSave: handleSaveDoctor,
  });

  const identifyGenderFromCNIC = (cnic) => {
    const lastDigit = parseInt(cnic[cnic.length - 1]);
    return lastDigit % 2 === 0 ? "Female" : "Male";
  };

  const handleDoctorChange = (value) => {
    const data = allApt.filter((item) => item._id === value);
    setApt(data);
  };

  return (
    <Stack direction="column" spacing={1} p={3}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Emergency Patients" icon={<MedicalServices />} />
          <Tab label="Appointed Patients" icon={<Medication />} />
        </Tabs>
      </Box>
      <Box maxWidth={350} hidden={tabIndex !== 1}>
        {allApt && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={doctor}
            label="Select Doctor"
            sx={{ minWidth: 350 }}
            onChange={(e) => handleDoctorChange(e.target.value)}
          >
            {allApt.map((item, key) => (
              <MenuItem key={key} value={item._id}>
                {item.doctor.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      {allRecords.length > 0 ? (
        <MaterialReactTable table={table} />
      ) : (
        <Typography>Loading records...</Typography>
      )}
      <br />
      <br />
      {allApt && apt[0].patient.name ? (
        <PrintPreviews
          name={apt[0].patient.name}
          father_husband={apt[0].patient.fatherName}
          cnic={apt[0].patient.cnic}
          gender={identifyGenderFromCNIC(apt[0].patient.cnic)}
          age={apt[0].patient.age}
          patientType={apt[0].patient.case.toUpperCase()}
          address={apt[0].patient.address}
          contact={apt[0].patient.contact}
          regDate={apt[0].patient.regDate}
          doctor={apt[0].doctor.name}
          token={apt[0].token}
          appDate={apt[0].appointmentDate}
        />
      ) : pat ? (
        <PrintPreviews
          name={pat.name}
          father_husband={pat.fatherName}
          cnic={pat.cnic}
          gender={identifyGenderFromCNIC(pat.cnic)}
          age={pat.age}
          patientType={pat.case.toUpperCase()}
          address={pat.address}
          contact={pat.contact}
          regDate={pat.regDate}
          doctor={doctor}
          token={pat.tokenNo}
        />
      ) : (
        <Typography>Waiting for Preview...</Typography>
      )}
    </Stack>
  );
};

export default Records;
