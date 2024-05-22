"use client";

import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddPaymentCat = () => {
  const [cat, setCat] = useState({
    title: "",
    desc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/payment-category", cat);
      if (res.status === 201) {
        alert(`${res.data}`);
        setCat({
          title: "",
          desc: "",
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
        variant="filled"
        label="Title"
        placeholder="Tests"
        fullWidth
        value={cat.title}
        onChange={(e) =>
          setCat({
            ...cat,
            title: e.target.value,
          })
        }
      />
      <TextField
        variant="filled"
        label="Description"
        fullWidth
        placeholder="Blood Test, Urine....."
        multiline
        minRows={5}
        value={cat.desc}
        onChange={(e) =>
          setCat({
            ...cat,
            desc: e.target.value,
          })
        }
      />
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddPaymentCat;
