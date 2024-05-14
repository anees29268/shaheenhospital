"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddPayment = () => {
  const [record, setRecord] = useState({
    title: "",
    amount: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/payments", record);
      if (res.status === 201) {
        alert(`${res.data}`);
        setRecord({
          title: "",
          amount: "",
        });
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        ".MuiFormControl-root": {
          maxWidth: 700,
        },
      }}
    >
      <TextField
        fullWidth
        value={record.title}
        variant="filled"
        label="Title"
        required
        placeholder="Laboratory Fee"
        onChange={(e) =>
          setRecord({
            ...record,
            title: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        value={record.amount === "" ? "" : record.amount}
        variant="filled"
        label="Amount"
        required
        placeholder="38"
        type="number"
        onChange={(e) =>
          setRecord({
            ...record,
            amount: e.target.value,
          })
        }
      />

      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddPayment;
