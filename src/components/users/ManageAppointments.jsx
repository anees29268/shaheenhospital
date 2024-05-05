"use client";

import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

import { appointmentsData } from "@/data/demo";
import {
  Autocomplete,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers";

const ManageAppointments = () => {
  const [appointment, setAppointment] = useState({
    patient: "-",
    patientName: "-",
    patientCNIC: "-",
    appointment: "-",
    doctor: "-",
    doctorName: "-",
    appointmentDate: dayjs(new Date()),
    fee: "-",
  });
  const columns = useMemo(
    () => [
      {
        accessorKey: "cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "patient", //access nested data with dot notation
        header: "Patient",
        size: 150,
      },
      {
        accessorKey: "doctor",
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "bookingDate", //normal accessorKey
        header: "Booking Date",
        size: 200,
        editVariant: "custom",
      },
      {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
        size: 150,
      },
    ],
    []
  );
  // bookingDate: `${dayjs("2024-04-04T23:30:00").format(
  //   "DD MMMM, YYYY hh:mm A"
  // )}`,

  const handleAppointmentDateChange = (date) => {
    setAppointment({ ...appointment, appointmentDate: dayjs(date) });
  };

  const patients = [
    {
      id: "001",
      cnic: "1234567890",
      name: "Sahee Jan",
    },
    {
      id: "002",
      cnic: "0987654321",
      name: "Ishaq Dilber",
    },
  ];
  const doctors = [
    {
      id: "001",

      name: "Dr. Hadi",
    },
    {
      id: "002",

      name: "Dr. Zeeshan",
    },
    {
      id: "003",

      name: "Dr. Saleem",
    },
    {
      id: "004",

      name: "Dr. Iqrar",
    },
    {
      id: "005",

      name: "Dr. Abrahi,",
    },
  ];

  const handlePatientChange = (event, value) => {
    if (value) {
      setAppointment({
        ...appointment,
        patientName: value.name || "",
        patientCNIC: value.cnic || "",
        patient: value.id || "",
      });
    } else {
      // Clear the patient details if no value is selected
      setAppointment({
        ...appointment,
        patientName: "",
        patientCNIC: "",
        patient: "",
      });
    }
  };
  const handleDoctorChange = (event, value) => {
    if (value) {
      setAppointment({
        ...appointment,
        doctorName: value.name || "",
        doctor: value.id || "",
      });
    } else {
      // Clear the patient details if no value is selected
      setAppointment({
        ...appointment,
        doctorName: "",
        doctor: "",
      });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: appointmentsData,
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => `${option.name}` || ""}
            value={
              appointment.doctor === "-"
                ? doctors.find((p) => p.name === row.original.doctor)
                : doctors.find((p) => p.id === appointment.doctor)
            }
            onChange={handleDoctorChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Doctor"
                variant="filled"
                fullWidth
              />
            )}
          />
          <DemoContainer components={["DatePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Appointment Date"
              value={appointment.appointmentDate}
              onChange={handleAppointmentDateChange}
              sx={{
                width: "100%",
              }}
              format="DD MMMM, YYYY hh:mm A"
            />
          </DemoContainer>
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
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
