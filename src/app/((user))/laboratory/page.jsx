"use client";

import {
  AddBox,
  Delete,
  DoneAll,
  ManageAccounts,
  Pending,
  Print,
} from "@mui/icons-material";
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
import LabPending from "@/components/users/LabPending";
import LabCompleted from "@/components/users/LabCompleted";

const Laboratory = () => {
  const [patient, setPatient] = useState();
  const [payment, setPayment] = useState();
  const [getFees, setGetFees] = useState();

  const [pat, setPat] = useState();
  const [recordPat, setRecordPat] = useState();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const getFeesDetails = async () => {
    try {
      const res = await axios.get("/api/user/fees");
      if (res.status === 200) {
        // console.log(res.data);
        const newData = res.data.filter(
          (item) => item.paymentId.paymentCat === "664e3036aba278ddf0be71f9"
        );
        setGetFees(newData);
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

  useEffect(() => {
    getPatients();
    getPayments();
    getFeesDetails();
  }, []);

  return (
    <Stack direction="column" spacing={1} p={3}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Pending" icon={<Pending />} />
          <Tab label="Completed" icon={<DoneAll />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <Container maxWidth="xl">
          <LabPending />
        </Container>
      </Box>
      <Box hidden={tabIndex !== 1}>
        <LabCompleted />
      </Box>
    </Stack>
  );
};

export default Laboratory;
