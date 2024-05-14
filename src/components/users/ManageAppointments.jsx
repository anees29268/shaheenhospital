"use client";

import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

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
import axios from "axios";

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
  const [apptData, setApptData] = useState();
  const columns = useMemo(
    () => [
      {
        accessorKey: "patient.cnic", //access nested data with dot notation
        header: "CNIC",
        size: 150,
      },
      {
        accessorKey: "patient.name", //access nested data with dot notation
        header: "Patient",
        size: 150,
      },
      {
        accessorKey: "doctor.name",
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Booking Date",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
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

  const getAppData = async () => {
    try {
      const res = await axios.get("/api/user/appointments");
      if (res.status === 200) {
        setApptData(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getAppData();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: apptData ? apptData : [],
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
