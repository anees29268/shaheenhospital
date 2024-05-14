"use client";

import { StaticTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const {
  Grid,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Button,
} = require("@mui/material");

const AddTiming = () => {
  const [startTiming, setStartTiming] = useState(dayjs(new Date()));
  const [roomNo, setRoomNo] = useState("");
  const [endTiming, setEndTiming] = useState(dayjs(new Date()));
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({
    doctor: "",
    doctorName: "",
  });

  const [doctors, setDoctors] = useState();

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/admin/doctor");
      if (res.status === 200) {
        setDoctors(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const handleDoctorChange = (event, value) => {
    if (value) {
      setSelectedDoctor({
        ...selectedDoctor,
        doctorName: value.name || "",
        doctor: value._id || "",
      });
    } else {
      // Clear the patient details if no value is selected
      setSelectedDoctor({
        ...selectedDoctor,
        doctorName: "",
        doctor: "",
      });
    }
  };
  const validateTiming = () => {
    if (startTiming.isSame(endTiming)) {
      alert("Start and end timings cannot be the same.");
      return false;
    }
    if (endTiming.isBefore(startTiming)) {
      alert("End time must be after start time.");
      return false;
    }

    return true;
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    if (selectedDays.length === 0) {
      alert("Please select at least on DAY!");
      return;
    }
    if (!validateTiming()) {
      return;
    }

    try {
      const data = {
        doctorId: selectedDoctor.doctor,
        startTime: startTiming,
        endTime: endTiming,
        daysOfWeek: selectedDays,
        roomNo,
      };

      const res = await axios.post("/api/admin/timing", data);
      if (res.status === 201) {
        alert(`${res.data}`);
      }
    } catch (error) {
      alert(`${error}`);
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
        {doctors ? (
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => `${option.name}` || ""}
            value={doctors.find((p) => p.id === selectedDoctor.doctor)}
            onChange={handleDoctorChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Doctor"
                variant="filled"
                fullWidth
                required
              />
            )}
          />
        ) : (
          <>loading...</>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="filled"
          label="Room No"
          placeholder="Dt. Room 01"
          required
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DemoContainer components={["StaticTimePicker"]}>
          {" "}
          <DemoItem label="Select Start Timing">
            <StaticTimePicker
              value={startTiming}
              onChange={(newValue) => setStartTiming(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <DemoContainer components={["StaticTimePicker"]}>
          {" "}
          <DemoItem label="Select End Timing">
            <StaticTimePicker
              value={endTiming}
              onChange={(newValue) => setEndTiming(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Sunday")}
                  onChange={() => handleDayChange("Sunday")}
                  color="primary"
                />
              }
              label="Sunday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Monday")}
                  onChange={() => handleDayChange("Monday")}
                  color="primary"
                />
              }
              label="Monday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Tuesday")}
                  onChange={() => handleDayChange("Tuesday")}
                  color="primary"
                />
              }
              label="Tuesday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Wednesday")}
                  onChange={() => handleDayChange("Wednesday")}
                  color="primary"
                />
              }
              label="Wednesday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Thursday")}
                  onChange={() => handleDayChange("Thursday")}
                  color="primary"
                />
              }
              label="Thursday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Friday")}
                  onChange={() => handleDayChange("Friday")}
                  color="primary"
                />
              }
              label="Friday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDays.includes("Saturday")}
                  onChange={() => handleDayChange("Saturday")}
                  color="primary"
                />
              }
              label="Saturday"
            />
          </Grid>
          {/* Add similar Grid items for other days */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
// onChange={(newValue) => setValue(newValue)}

export default AddTiming;
