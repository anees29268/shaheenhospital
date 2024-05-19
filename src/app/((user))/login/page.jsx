"use client";

import { changeLoadingLoader } from "@/redux/slice";
import { LoginOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((data) => data.isLoaderLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changeLoadingLoader());
    try {
      const email = user.email;
      const password = user.password;
      const role = user.role;
      const res = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });
      if (res.error) {
        console.log(res.error);
        alert(`Invalid Credentials`);

        return;
      }

      role === "user"
        ? router.push("/")
        : role === "admin"
        ? router.push("/admin")
        : null;
    } catch (error) {
      alert(`${error}`);
    } finally {
      dispatch(changeLoadingLoader());
    }
  };
  return loading ? (
    <Box className="global" mt={5}>
      {" "}
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <Stack direction={"column"} p={2}>
      <Box
        className="global"
        gap={1}
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h5">User Login</Typography>
      </Box>
      <Box className="global" gap={1}>
        <Stack
          direction={"column"}
          component={"form"}
          onSubmit={handleSubmit}
          spacing={1}
          sx={{
            maxWidth: 600,
            width: "100%",
            mt: 4,
          }}
        >
          <TextField
            value={user.email}
            label="Email"
            placeholder="zohaib123@gmail.com"
            fullWidth
            variant="filled"
            type="email"
            required
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
          <TextField
            value={user.passowrd}
            label="Password"
            placeholder="zohaib1234"
            fullWidth
            required
            variant="filled"
            type="password"
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
          <br />
          <FormControl fullWidth required>
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
          <br />
          <Button
            variant="contained"
            color="success"
            type="submit"
            endIcon={<LoginOutlined />}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
