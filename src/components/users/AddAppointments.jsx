"use client";

import PrintPreviews from "@/app/((user))/preview/page";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AddAppointments = () => {
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);

  const [appointment, setAppointment] = useState({
    patient: "",
    patientName: "",
    patientCNIC: "",
    appointment: "",
    doctor: "",
    doctorName: "",
    appointmentDate: dayjs(new Date()),
    fee: "",
    token: "",
  });

  const handlePatientChange = (event, value) => {
    if (value) {
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        patientName: value.name || "",
        patientCNIC: value.cnic || "",
        patient: value._id || "",
      }));
    } else {
      // Clear the patient details if no value is selected
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        patientName: "",
        patientCNIC: "",
        patient: "",
      }));
    }
  };

  const handleDoctorChange = (event, value) => {
    if (value) {
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        doctorName: value.name || "",
        doctor: value._id || "",
      }));
    } else {
      // Clear the doctor details if no value is selected
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        doctorName: "",
        doctor: "",
      }));
    }
  };

  const handleAppointmentDateChange = (date) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      appointmentDate: dayjs(date),
    }));
  };

  const getPatients = async () => {
    try {
      const res = await axios.get("/api/user/patients");
      if (res.status === 200) {
        setPatient(res.data.filter((item) => item.case === "general"));
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/user/doctor");
      if (res.status === 200) {
        setDoctor(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const getToken = async () => {
    if (!appointment.doctor) {
      return;
    }
    try {
      const res = await axios.post("/api/user/token/aptToken", {
        doctorId: appointment.doctor,
        appointmentDate: appointment.appointmentDate,
      });
      if (res.status === 200) {
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          token: res.data + 1,
        }));
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getPatients();
    getDoctors();
  }, []);

  useEffect(() => {
    if (appointment.doctor) {
      getToken();
    }
  }, [appointment.doctor, appointment.appointmentDate]);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (confirm("Confirm The Appointment?")) {
      try {
        const res = await axios.post("/api/user/appointments", appointment);
        if (res.status === 201) {
          alert("Appointment Done");
          // setAppointment({
          //   patient: "",
          //   patientName: "",
          //   patientCNIC: "",
          //   appointment: "",
          //   doctor: "",
          //   doctorName: "",
          //   appointmentDate: dayjs(new Date()),
          //   fee: "",
          //   token: "",
          // });
        }
      } catch (error) {
        alert(`${error}`);
      }
    }
  };

  const getPatientData = (id) => {
    if (id) {
      return patient.filter((item) => item._id === id);
    } else {
      return null;
    }
  };

  return (
    <Grid
      container
      spacing={1}
      maxWidth={1000}
      component={"form"}
      onSubmit={handleAppointmentSubmit}
    >
      <Grid item xs={12} sm={6}>
        {patient ? (
          <Autocomplete
            options={patient}
            getOptionLabel={(option) => `${option.name}-${option.cnic}` || ""}
            value={patient.find((p) => p._id === appointment.patient)}
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
        ) : (
          <>loading...</>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {doctor ? (
          <Autocomplete
            options={doctor}
            getOptionLabel={(option) => `${option.name}` || ""}
            value={doctor.find((p) => p._id === appointment.doctor)}
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
        ) : (
          <>loading...</>
        )}
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
      <Grid item xs={12} sm={6} mt={3}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Grid>
      <Grid item xs={12} mt={3}>
        {appointment.patient !== "" ? (
          <PrintPreviews
            name={getPatientData(appointment.patient)[0].name}
            father_husband={getPatientData(appointment.patient)[0].fatherName}
            regDate={getPatientData(appointment.patient)[0].createdAt}
            cnic={getPatientData(appointment.patient)[0].cnic}
            bloodGroup={getPatientData(appointment.patient)[0].bloodGroup}
            contact={getPatientData(appointment.patient)[0].contact}
            address={getPatientData(appointment.patient)[0].address}
            age={getPatientData(appointment.patient)[0].age}
            patientType={getPatientData(
              appointment.patient
            )[0].case.toUpperCase()}
            gender={getPatientData(appointment.patient)[0].gender}
            doctor={appointment.doctorName ? appointment.doctorName : null}
            appDate={appointment.appointmentDate}
            token={appointment.token === "" ? "" : appointment.token}
          />
        ) : (
          <>loading..</>
        )}
      </Grid>
    </Grid>
  );
};

export default AddAppointments;
