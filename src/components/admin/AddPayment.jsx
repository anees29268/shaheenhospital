"use client";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const AddPayment = () => {
  const [record, setRecord] = useState({
    title: "",
    amount: "",
    paymentCat: "",
    paymentCatName: "",
  });

  const [cat, setCat] = useState();

  const getPaymentCat = async () => {
    try {
      const res = await axios.get("/api/admin/payment-category");
      if (res.status === 200) {
        setCat(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getPaymentCat();
  }, []);

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
      <FormControl fullWidth variant="filled" required>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={record.paymentCat}
          label="Category"
          onChange={(e) =>
            setRecord({
              ...record,
              paymentCat: e.target.value,
            })
          }
        >
          {cat ? (
            cat.map((item, key) => (
              <MenuItem key={key} value={item._id}>
                {item.title}
              </MenuItem>
            ))
          ) : (
            <>loading...</>
          )}
        </Select>
      </FormControl>

      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddPayment;
