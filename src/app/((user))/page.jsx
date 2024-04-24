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
import { useState } from "react";
import React, { useCallback, useRef } from "react";
import ReactToPrint from "react-to-print";

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
    case: "",
    fee: "",
    address: "",
  });
  const handleDateChange = (date) => {
    setRecord({ ...record, date: dayjs(date) });
  };
  const componentRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print </button>;
  }, []);

  const handlePrint = () => {
    const content = document.getElementById("print").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
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

  return (
    <Stack direction="column" spacing={1} p={1}>
      <Typography
        variant="h5"
        fontWeight={700}
        color={"text.secondary"}
        className="global"
      >
        Welcome Imran
      </Typography>
      <Grid
        container
        component="form"
        spacing={1}
        p={"0 20px"}
        // onSubmit={handleRecordSubmit}
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
            required
            variant="filled"
            label="CNIC"
            placeholder="1530287569081"
            onChange={(e) =>
              setRecord({
                ...record,
                cnic: e.target.value,
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
              placeholder="Emergency"
              value={record.status}
              onChange={(e) =>
                setRecord({ ...record, bloodGroup: e.target.value })
              }
              required
            >
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
              value={record.status}
              onChange={(e) => setRecord({ ...record, case: e.target.value })}
              required
            >
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
        <Grid item xs={12} mt={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            style={{ marginTop: "16px" }}
          >
            Add Patient
          </Button>
        </Grid>
      </Grid>
      <Box p={2}>
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle="AwesomeFileName"
          // onAfterPrint={handleAfterPrint}
          // onBeforeGetContent={handleOnBeforeGetContent}
          // onBeforePrint={handleBeforePrint}
          removeAfterPrint
          trigger={reactToPrintTrigger}
        />
        <div ref={componentRef}>
          <style type="text/css" media="print">
            {
              "\
   @page { size: A4;  }\
"
            }
          </style>
          <div className="flash" />
          <div className="testClass">
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Stack
                direction={"column"}
                spacing={0.1}
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 9,
                  },
                }}
              >
                <Typography variant="body2" fontWeight={"700"}>
                  {record.name}, {record.age} Years,{" "}
                  {identifyGenderFromCNIC(record.cnic)}
                </Typography>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Father/Husband:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.fatherName}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Contact:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.contact === "" ? "N/A" : record.contact}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    CNIC:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.cnic}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Address:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.address === "" ? "N/A" : record.address}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Patient Type:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.case}
                  </Typography>
                </Stack>
              </Stack>
              {/* Second */}
              <Stack
                direction={"column"}
                spacing={0.1}
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 9,
                  },
                }}
              >
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Date:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.date.format("DD MMM YYYY h:mm:ssA")}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Contact:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.contact === "" ? "N/A" : record.contact}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    CNIC:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.cnic}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Address:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.address === "" ? "N/A" : record.address}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography width={70} variant="body2">
                    Patient Type:{" "}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {record.case}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"column"} spacing={0.1}>
                <Typography variant="body1" fontSize={12}>
                  TOKEN NO
                </Typography>
                <Typography variant="body1" fontSize={14} textAlign={"center"}>
                  45
                </Typography>
              </Stack>
            </Box>
          </div>
        </div>

        {/* <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          style={{ marginTop: "16px" }}
        >
          Print
        </Button> */}
      </Box>
    </Stack>
  );
}
