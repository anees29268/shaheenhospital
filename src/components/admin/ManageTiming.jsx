"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { StaticTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const ManageTiming = () => {
  const [timings, setTimings] = useState();
  const [doctors, setDoctors] = useState();

  const [record, setRecord] = useState({
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date()),
    doctor: "-",
    doctorName: "",
    daysOfWeek: [],
    roomNo: "-",
    selectedDays: [],
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 1,
        enableEditing: false,
      },
      {
        accessorKey: "doctorId.name", //access nested data with dot notation
        header: "Doctor",
        size: 150,
      },
      {
        accessorKey: "startTime", //access nested data with dot notation
        header: "Start Timing",
        size: 150,
        editVariant: "date",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "endTime", //access nested data with dot notation
        header: "End Timing",
        size: 150,
        editVariant: "date",
        Cell: ({ renderedCellValue, row }) => (
          <>{dayjs(renderedCellValue).format("D MMM, YYYY h:mm A")}</>
        ),
      },
      {
        accessorKey: "roomNo", //access nested data with dot notation
        header: "Room No",
        size: 150,
      },
      {
        accessorKey: "daysOfWeek", //access nested data with dot notation
        header: "Days of Week",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>{renderedCellValue.toString()}</>
        ),
      },
    ],
    []
  );

  const getTimings = async () => {
    try {
      const res = await axios.get("/api/admin/timing");
      if (res.status === 200) {
        setTimings(res.data);
      }
    } catch (error) {
      alert(`${error}`);
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
  const handleDayChange = (day) => {
    if (record.selectedDays.includes(day)) {
      setRecord({
        ...record,
        selectedDays: record.selectedDays.filter((d) => d !== day),
      });
    } else {
      setRecord({
        ...record,
        selectedDays: [...record.selectedDays, day],
      });
    }
  };

  useEffect(() => {
    getTimings();
    getDoctors();
  }, []);

  const handleDoctorChange = (event, value) => {
    if (value) {
      setRecord({
        ...record,
        doctorName: value.name || "",
        doctor: value._id || "",
      });
    } else {
      // Clear the patient details if no value is selected
      setRecord({
        ...record,
        doctorName: "",
        doctor: "",
      });
    }
  };
  const validateTiming = () => {
    if (record.startTime.isSame(record.endTime)) {
      alert("Start and end timings cannot be the same.");
      return false;
    }
    if (record.endTime.isBefore(record.startTime)) {
      alert("End time must be after start time.");
      return false;
    }

    return true;
  };
  const handleSaveUser = async ({ values, table }) => {
    if (record.selectedDays.length === 0) {
      alert("Please Select at least one DAY!");

      return;
    } else if (record.doctor === "-") {
      alert("Please Select Doctor!");

      return;
    } else if (!validateTiming()) {
      return;
    }
    try {
      const data = {
        _id: values._id,
        ...record,
      };

      const res = await axios.put("/api/admin/timing", data);
      if (res.status === 200) {
        alert(`${res.data}`);
        setRecord({
          startTime: dayjs(new Date()),
          endTime: dayjs(new Date()),
          doctor: "-",
          doctorName: "",
          daysOfWeek: [],
          roomNo: "-",
          selectedDays: [],
        });
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      getTimings();
      table.setEditingRow(null); //exit editing mode
    }
  };

  const handleTimingDelete = async (row) => {
    const data = row.original;
    try {
      const res = await axios.delete("/api/admin/timing", { data });
      if (res.status === 200) {
        alert(`${res.data}`);
        getTimings();
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  const table = useMaterialReactTable({
    columns,
    data: timings ? timings : [], // Check if timings is truthy before using it
    enableEditing: true,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <Box>
        <DialogTitle variant="h6" textAlign={"center"}>
          Edit Timing
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => `${option.name}` || ""}
            value={doctors.find((p) => p.id === record.doctor)}
            onChange={handleDoctorChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Doctor"
                variant="filled"
                fullWidth
                helperText={`Previous Doctor - ${row.original.doctorId.name}`}
              />
            )}
          />
          <DemoContainer components={["StaticTimePicker"]}>
            {" "}
            <DemoItem
              label={`Previous Start Timing - ${dayjs(
                row.original.startTime
              ).format("D MMM, YYYY h:mm A")}`}
            >
              <StaticTimePicker
                value={record.startTime}
                onChange={(newValue) =>
                  setRecord({
                    ...record,
                    startTime: newValue,
                  })
                }
              />
            </DemoItem>
          </DemoContainer>
          <DemoContainer components={["StaticTimePicker"]}>
            {" "}
            <DemoItem
              label={`Previous End Timing - ${dayjs(
                row.original.endTime
              ).format("D MMM, YYYY h:mm A")}`}
            >
              <StaticTimePicker
                value={record.endTime}
                onChange={(newValue) =>
                  setRecord({
                    ...record,
                    endTime: newValue,
                  })
                }
              />
            </DemoItem>
          </DemoContainer>
          <TextField
            variant="filled"
            fullWidth
            value={record.roomNo === "-" ? row.original.roomNo : record.roomNo}
            onChange={(e) =>
              setRecord({
                ...record,
                roomNo: e.target.value,
              })
            }
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">
                Previous Days- {row.original.daysOfWeek.toString()}
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={record.selectedDays.includes("Sunday")}
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
                    checked={record.selectedDays.includes("Monday")}
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
                    checked={record.selectedDays.includes("Tuesday")}
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
                    checked={record.selectedDays.includes("Wednesday")}
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
                    checked={record.selectedDays.includes("Thursday")}
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
                    checked={record.selectedDays.includes("Friday")}
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
                    checked={record.selectedDays.includes("Saturday")}
                    onChange={() => handleDayChange("Saturday")}
                    color="primary"
                  />
                }
                label="Saturday"
              />
            </Grid>
            {/* Add similar Grid items for other days */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </Box>
    ),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleTimingDelete(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <Box
      sx={{
        ".mui-twia2z-MuiPaper-root-MuiDialog-paper": {
          maxWidth: "100%",
        },
      }}
    >
      <Paper
        sx={{
          p: 1,
        }}
      >
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  );
};

export default ManageTiming;
