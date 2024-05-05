"use client";

import { Autocomplete, Grid, TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";

const AddAppointments = () => {
  const [appointment, setAppointment] = useState({
    patient: "",
    patientName: "",
    patientCNIC: "",
    appointment: "",
    doctor: "",
    doctorName: "",
    appointmentDate: dayjs(new Date()),
    fee: "",
  });

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

  const handleAppointmentDateChange = (date) => {
    setAppointment({ ...appointment, appointmentDate: dayjs(date) });
  };

  return (
    <Grid container spacing={1} maxWidth={1000}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={patients}
          getOptionLabel={(option) => `${option.name}-${option.cnic}` || ""}
          value={patients.find((p) => p.id === appointment.patient)}
          onChange={handlePatientChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Patient"
              variant="filled"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={doctors}
          getOptionLabel={(option) => `${option.name}` || ""}
          value={doctors.find((p) => p.id === appointment.doctor)}
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
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6} mt={1}>
        <TextField
          fullWidth
          value={appointment.fee === "" ? "" : appointment.fee}
          placeholder="1500"
          label="FEE"
          variant="filled"
          type="number"
          onChange={(e) =>
            setAppointment({ ...appointment, fee: e.target.value })
          }
        />
      </Grid>
    </Grid>
  );
};

export default AddAppointments;
