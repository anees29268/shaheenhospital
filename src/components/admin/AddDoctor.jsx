"use client";

import { AddBox } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    cnic: "",
    email: "",
    contact: "",
    specialization: "",
    desc: "",
    address: "",
    hiringDate: dayjs(new Date()),
  });

  const handleDateChange = (date) => {
    setDoctor({ ...doctor, hiringDate: dayjs(date) });
  };
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/doctor", doctor);
      if (res) {
        alert("Doctor added!");
        setDoctor({
          name: "",
          cnic: "",
          email: "",
          contact: "",
          specialization: "",
          desc: "",
          address: "",
          hiringDate: dayjs(new Date()),
        });
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
    }
  };

  return (
    <Grid
      container
      spacing={2}
      maxWidth={1000}
      mt={2}
      component={"form"}
      onSubmit={handleDoctorSubmit}
    >
      <Grid item xs={12} md={6}>
        <TextField
          label="Full Name"
          variant="filled"
          value={doctor.name}
          required
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
          placeholder="Dr. Zohaib Ahmad"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="CNIC"
          variant="filled"
          required
          value={doctor.cnic}
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, cnic: e.target.value })}
          placeholder="142013454354"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          type="email"
          variant="filled"
          required
          value={doctor.email}
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
          placeholder="zohaib12@gmail.com"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Contact"
          variant="filled"
          value={doctor.contact}
          required
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, contact: e.target.value })}
          placeholder="0355555555"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Specializations"
          variant="filled"
          value={doctor.specialization}
          required
          fullWidth
          onChange={(e) =>
            setDoctor({ ...doctor, specialization: e.target.value })
          }
          placeholder="FCPS, MBSS"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          ".MuiTextField-root": {
            width: "100%",
          },
        }}
      >
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Hiring Date"
            value={doctor.hiringDate}
            onChange={handleDateChange}
            format="DD MMMM, YYYY"
          />
        </DemoContainer>
      </Grid>
      <Grid item xs={12} md={6} mt={1}>
        <TextField
          label="Address"
          variant="filled"
          value={doctor.address}
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, address: e.target.value })}
          placeholder="Karak, KPK"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          multiline
          minRows={7}
          variant="filled"
          value={doctor.desc}
          fullWidth
          onChange={(e) => setDoctor({ ...doctor, desc: e.target.value })}
          placeholder="About the doctor"
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <Button
          variant="contained"
          type="submit"
          color="success"
          endIcon={<AddBox />}
        >
          Add Doctor
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddDoctor;
