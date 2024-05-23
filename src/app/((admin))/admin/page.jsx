"use client";

import MainCard from "@/components/admin/dashboard/MainCard";
import TodayCard from "@/components/admin/dashboard/TodayCard";
import Headings from "@/components/globals/Headings";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const session = useSession();

  const [mainData, setMainData] = useState();
  const [todayData, setTodayDate] = useState();

  const getMainData = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      if (res.status === 200) {
        setMainData(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };
  const getTodayData = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard/today");
      if (res.status === 200) {
        setTodayDate(res.data);
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    getMainData();
    getTodayData();
  }, []);

  return (
    <Stack direction={"column"} p={3} spacing={3}>
      <Typography variant="h5" fontWeight={700} className="global">
        Welcome {session?.data?.user?.name}
      </Typography>

      <Box display={"flex"} gap={2}>
        <MainCard
          title={"Total Doctors"}
          amt={mainData && mainData.totalDoctor}
          src={"/assets/doctors/doctors.png"}
        />
        <MainCard
          title={"Total Users"}
          amt={mainData && mainData.totalUsers}
          src={"/assets/doctors/users.png"}
        />
        <MainCard
          title={"Total Patients"}
          amt={mainData && mainData.totalPatients}
          src={"/assets/patients/patients.png"}
        />
        <MainCard
          title={"Emergency Patients"}
          amt={mainData && mainData.emergencyPatients}
          src={"/assets/patients/emergencyPatient.png"}
        />
        <MainCard
          title={"General Patients"}
          amt={mainData && mainData.generalPatients}
          src={"/assets/patients/generalPatient.png"}
        />
      </Box>
      <Divider />
      <Headings title={"Today Sales"} />
      <Box display={"flex"} gap={2}>
        <TodayCard
          src={"/assets/fees/fee2.png"}
          title={"OPD Fees"}
          bgcolor={"linear-gradient(to right, #a9e3e5, #daf3b6)"}
          total={todayData && todayData.opdFee}
        />
        <TodayCard
          src={"/assets/fees/fee1.png"}
          title={"Appointments"}
          bgcolor={"linear-gradient(to right, #a9e3e5, #daf3b6)"}
          total={todayData && todayData.aptFee}
        />
        {todayData && todayData.testsResult && todayData.testsResult.length > 0
          ? todayData.testsResult.map((item, key) => (
              <TodayCard
                key={key}
                src={"/assets/fees/fee3.png"}
                title={item.title}
                bgcolor={"linear-gradient(to right, #a9e3e5, #daf3b6)"}
                total={item.totalAmount}
              />
            ))
          : null}
      </Box>
    </Stack>
  );
};

export default Dashboard;
