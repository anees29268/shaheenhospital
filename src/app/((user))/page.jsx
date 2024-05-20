"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import React, { useCallback, useRef } from "react";
import ReactToPrint from "react-to-print";
import PrintPreviews from "./preview/page";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const [record, setRecord] = useState({
    date: dayjs(new Date()),
    cnic: "",
    name: "",
    fatherName: "",
    age: "",
    nationality: "PAKISTANI",
    bloodGroup: "",
    contact: "",
    caseType: "",
    doctor: "",
    fee: "",
    address: "",
    gender: "",
    token: "",
  });

  const session = useSession();

  const getToken = async () => {
    try {
      const res = await axios.post("/api/user/token", {
        caseType: "emergency",
      });
      if (res.status === 200) {
        setRecord({
          ...record,
          token: res.data + 1,
        });
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  const handleDateChange = (date) => {
    setRecord({ ...record, date: dayjs(date) });
  };

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

  const handleRecordSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/patients", record);
      if (res.status === 201) {
        alert(`${res.data}`);
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
      getToken();
    }
  };

  const clearRecord = () => {
    setRecord({
      date: dayjs(new Date()),
      cnic: "",
      name: "",
      fatherName: "",
      age: "",
      nationality: "PAKISTANI",
      bloodGroup: "",
      contact: "",
      caseType: "",
      doctor: "",
      fee: "",
      address: "",
      gender: "",
    });
    getToken();
  };
  return (
    <Stack direction="column" spacing={1} p={3}>
      <Typography
        variant="h5"
        fontWeight={700}
        color={"text.secondary"}
        className="global"
      >
        Welcome {session?.data?.user?.name}
      </Typography>
      <Grid
        container
        component="form"
        spacing={1}
        p={"0 20px"}
        onSubmit={handleRecordSubmit}
        sx={{
          maxWidth: 1000,
          ".MuiTextField-root": {
            width: "100%",
          },
        }}
      >
        <Grid item xs={12} sm={6}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select Date"
              value={record.date}
              onChange={handleDateChange}
              format="DD MMMM, YYYY"
            />
          </DemoContainer>
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.cnic}
            variant="filled"
            required
            label="CNIC"
            placeholder="1530287569081"
            onChange={(e) =>
              setRecord({
                ...record,
                cnic: e.target.value,
                gender: identifyGenderFromCNIC(e.target.value),
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.name}
            variant="filled"
            required
            label="Name"
            placeholder="Muhammad Ali"
            onChange={(e) =>
              setRecord({
                ...record,
                name: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.fatherName}
            variant="filled"
            required
            label="Father Name"
            placeholder="Muhammad Ali"
            onChange={(e) =>
              setRecord({
                ...record,
                fatherName: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.age === "" ? "" : record.age}
            variant="filled"
            label="Age"
            required
            placeholder="38"
            type="number"
            onChange={(e) =>
              setRecord({
                ...record,
                age: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.nationality}
            variant="filled"
            label="Nationality"
            placeholder="Pakistani"
            onChange={(e) =>
              setRecord({
                ...record,
                nationality: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Blood Group
            </InputLabel>
            <Select
              placeholder="Blood Group"
              value={record.bloodGroup}
              onChange={(e) =>
                setRecord({ ...record, bloodGroup: e.target.value })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-standard-label" required>
              Case Type
            </InputLabel>
            <Select
              placeholder="Emergency"
              value={record.caseType}
              onChange={(e) =>
                setRecord({ ...record, caseType: e.target.value })
              }
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"emergency"}>Emergency</MenuItem>
              <MenuItem value={"general"}>General</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.fee === "" ? "" : record.fee}
            required
            variant="filled"
            label="Fee"
            placeholder="1500"
            type="number"
            onChange={(e) =>
              setRecord({
                ...record,
                fee: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            fullWidth
            value={record.contact}
            variant="filled"
            label="Contact"
            placeholder="030000000000"
            onChange={(e) =>
              setRecord({
                ...record,
                contact: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <TextField
            fullWidth
            value={record.address}
            variant="filled"
            label="Address"
            placeholder="kashrote, gilgi"
            onChange={(e) =>
              setRecord({
                ...record,
                address: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "16px" }}
          >
            Add Patient
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => clearRecord()}
            style={{ marginTop: "16px" }}
          >
            Clear Record
          </Button>
        </Grid>
      </Grid>
      <Box p={2}>
        <PrintPreviews
          name={record.name}
          father_husband={record.fatherName}
          regDate={record.date}
          cnic={record.cnic}
          bloodGroup={record.bloodGroup}
          contact={record.contact}
          address={record.address}
          age={record.age}
          patientType={record.caseType}
          gender={identifyGenderFromCNIC(record.cnic)}
          token={record.token == "" ? "" : record.token}
        />
      </Box>
    </Stack>
  );
}
