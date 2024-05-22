"use client";

import AddPayment from "@/components/admin/AddPayment";
import ManagePayments from "@/components/admin/ManagePayments";
import AddPaymentCat from "@/components/admin/payment-category/AddPaymentCat";
import ManagePaymentCat from "@/components/admin/payment-category/ManagePaymentCat";
import {
  CategoryOutlined,
  MoneyOffCsred,
  Payment,
  SettingsAccessibility,
} from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Admin_Payments = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <Stack direction={"column"} p={3} spacing={2}>
      <Box className="global" gap={1}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab label="Add Payment" icon={<Payment />} />
          <Tab label="Manage Payments" icon={<MoneyOffCsred />} />
          <Tab label="Payment Category" icon={<CategoryOutlined />} />
          <Tab label="Manage Categories" icon={<SettingsAccessibility />} />
        </Tabs>
      </Box>
      <Box hidden={tabIndex !== 0}>
        <AddPayment />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <ManagePayments />
      </Box>
      <Box hidden={tabIndex !== 2}>
        <AddPaymentCat />
      </Box>
      <Box hidden={tabIndex !== 3}>
        <ManagePaymentCat />
      </Box>
    </Stack>
  );
};

export default Admin_Payments;
