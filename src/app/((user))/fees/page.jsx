"use client";

import { AddBox, Delete, ManageAccounts } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import FeesPrintPreviews from "../fees-preview/page";

const User_Fees = () => {
  const [patient, setPatient] = useState();
  const [payment, setPayment] = useState();
  const [getFees, setGetFees] = useState();
  const [pat, setPat] = useState();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const [fee, setFee] = useState({
    patient: "",
    payment: "",
    desc: "",
    amount: "",
    discount: 0,
  });

  const getPatients = async () => {
    try {
      const res = await axios.get("/api/user/patients");
      if (res.status === 200) {
        setPatient(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  const getPayments = async () => {
    try {
      const res = await axios.get("/api/admin/payments");
      if (res.status === 200) {
        setPayment(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const getFeesDetails = async () => {
    try {
      const res = await axios.get("/api/user/fees");
      if (res.status === 200) {
        setGetFees(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getPatients();
    getPayments();
    getFeesDetails();
  }, []);

  const handlePatientChange = (event, value) => {
    if (value) {
      setFee({
        ...fee,

        patient: value || "",
      });
      setPat(value || "");
    } else {
      // Clear the patient details if no value is selected
      setFee({
        ...fee,

        patient: "",
      });
    }
  };
  const handlePaymentChange = (event, value) => {
    if (value) {
      setFee({
        ...fee,
        payment: value || "",
        amount: value.amount || "",
      });
    } else {
      // Clear the patient details if no value is selected
      setFee({
        ...fee,
        payment: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      patientId: fee.patient._id,
      paymentId: fee.payment._id,
      desc: fee.desc,
      amount: fee.amount,
      discount: fee.discount,
    };

    const res = await axios.post("/api/user/fees", data);
    if (res.status === 201) {
      alert(`${res.data}`);
      setFee({
        patient: "",
        payment: "",
        desc: "",
        discount: 0,
      });
      getFeesDetails();
    }

    try {
    } catch (error) {
      alert(`${error}`);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "patientId.name", //access nested data with dot notation
        header: "Patient",
        size: 150,
      },
      {
        accessorKey: "patientId.cnic", //access nested data with dot notation
        header: "Patient CNIC",
        size: 150,
      },
      {
        accessorKey: "paymentId.title",
        header: "Payment",
        size: 150,
      },
      {
        accessorKey: "paymentId.amount",
        header: "Amount",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "Net Amount",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>{row.original.paymentId.amount - renderedCellValue}</>
        ),
      },
    ],
    []
  );

  const handleFeeDelete = async (row) => {
    const data = row.original;
    try {
      const res = await axios.delete("/api/user/fees", { data });
      if (res.status === 401) {
        console.log("401");
        alert(`${res.data}`);
      } else if (res.status === 200) {
        alert("Fee Deleted");
        getFeesDetails();
      }
    } catch (error) {
      alert(`${error.response.data}`);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: getFees ? getFees : [],
    enableEditing: true,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleFeeDelete(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <Stack direction="column" spacing={1} p={3}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Add Fee" icon={<AddBox />} />
          <Tab label="Manage Fees" icon={<ManageAccounts />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <Container maxWidth="sm" component={"form"} onSubmit={handleSubmit}>
          <br />
          {patient ? (
            <Autocomplete
              options={patient}
              getOptionLabel={(option) => `${option.name}-${option.cnic}` || ""}
              value={patient.find((p) => p.id === fee.patient)}
              onChange={handlePatientChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Patient"
                  variant="filled"
                  fullWidth
                  required
                />
              )}
            />
          ) : (
            <>loading...</>
          )}
          <br />
          {payment ? (
            <Autocomplete
              options={payment}
              getOptionLabel={(option) =>
                `${option.title}-(RS. ${option.amount})` || ""
              }
              value={payment.find((p) => p.id === fee.payment)}
              onChange={handlePaymentChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Payment"
                  variant="filled"
                  fullWidth
                  required
                />
              )}
            />
          ) : (
            <>loading...</>
          )}
          <br />
          <TextField
            variant="filled"
            fullWidth
            label="Amount"
            type="number"
            disabled
            value={fee.payment.amount ? fee.payment.amount : ""}
          />
          <br />
          <br />
          <TextField
            variant="filled"
            fullWidth
            label="Discount"
            type="number"
            value={fee.discount}
            onChange={(e) =>
              setFee({
                ...fee,
                discount: e.target.value,
              })
            }
          />
          <br />
          <br />
          <TextField
            variant="filled"
            fullWidth
            label="Description"
            multiline
            minRows={4}
            value={fee.desc}
            onChange={(e) =>
              setFee({
                ...fee,
                desc: e.target.value,
              })
            }
          />
          <br />
          <br />
          <TextField
            variant="filled"
            fullWidth
            label="Net Amount"
            disabled
            value={fee.amount - fee.discount}
          />
          <br />
          <br />
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Container>
      </Box>
      <Box hidden={tabIndex !== 1}>
        <MaterialReactTable table={table} />
      </Box>
      {pat ? (
        <FeesPrintPreviews
          name={pat.name}
          token={pat._id}
          patientType={pat.case}
          father_husband={pat.fatherName}
          payment={fee.payment.title}
          amount={fee.amount}
          discount={fee.discount}
          address={pat.address}
          total={fee.amount - fee.discount}
          contact={pat.contact}
          age={pat.age}
          cnic={pat.cnic}
        />
      ) : null}
    </Stack>
  );
};

export default User_Fees;
