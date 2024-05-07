"use client";

import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

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
import { doctors } from "@/data/demo";

const ManageDoctors = () => {
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
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "hiringDate", //access nested data with dot notation
        header: "Hiring's Date",
        size: 150,
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

  const handleAppointmentDateChange = (date) => {
    setAppointment({ ...appointment, appointmentDate: dayjs(date) });
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
    data: doctors,
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* <Autocomplete
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
          </DemoContainer> */}
          internalEditComponents
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

export default ManageDoctors;
