"use client";

import { AddBox } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddUsers = () => {
  const [user, setUser] = useState({
    name: "",
    cnic: "",
    email: "",
    role: "",
    password: "",
    cPassword: "",
  });

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.cPassword) {
      alert("Password not matched!");
      return;
    }

    try {
      const res = await axios.post("/api/admin/users", user);
      if (res.status === 201) {
        alert("User Added!");
        setUser({ name: "", cnic: "", email: "", password: "", cPassword: "" });
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
      onSubmit={handleUserSubmit}
    >
      <Grid item xs={12} md={6}>
        <TextField
          label="Full Name"
          variant="filled"
          value={user.name}
          required
          fullWidth
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Muhammad Riaz"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="CNIC"
          variant="filled"
          required
          value={user.cnic}
          fullWidth
          onChange={(e) => setUser({ ...user, cnic: e.target.value })}
          placeholder="142013454354"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          variant="filled"
          required
          type="email"
          value={user.email}
          fullWidth
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="haris_umar01@gmail.com"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            value={user.role}
            variant="filled"
            label="Role"
            onChange={(e) =>
              setUser({
                ...user,
                role: e.target.value,
              })
            }
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Password"
          variant="filled"
          required
          type="password"
          value={user.password}
          fullWidth
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="haris1234"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Confirm Password"
          variant="filled"
          required
          type="password"
          value={user.cPassword}
          fullWidth
          onChange={(e) => setUser({ ...user, cPassword: e.target.value })}
          placeholder="haris1234"
        />
      </Grid>

      <Grid item xs={12} mt={2}>
        <Button
          variant="contained"
          type="submit"
          color="success"
          endIcon={<AddBox />}
        >
          Add User
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddUsers;
