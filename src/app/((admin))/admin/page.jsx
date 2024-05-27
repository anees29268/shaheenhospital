"use client";

import MainCard from "@/components/admin/dashboard/MainCard";
import TodayCard from "@/components/admin/dashboard/TodayCard";
import Headings from "@/components/globals/Headings";
import { dashboardMain, dashboardToday } from "@/redux/apis";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const session = useSession();

  // const [mainData, setMainData] = useState();
  // const [todayData, setTodayDate] = useState();
  const dispatch = useDispatch();

  const mainData = useSelector((data) => data.mainData);
  const todayData = useSelector((data) => data.todayData);

  useEffect(() => {
    dispatch(dashboardMain());
    dispatch(dashboardToday());
  }, []);

  return (
    <Stack direction={"column"} p={3} spacing={3}>
      <Typography variant="h5" fontWeight={700} className="global">
        Welcome {session?.data?.user?.name}
      </Typography>

      <Box display={"flex"} gap={2} flexWrap={"wrap"}>
        <MainCard
          title={"Total Doctors"}
          amt={mainData ? mainData.totalDoctor : 0}
          src={"/assets/doctors/doctors.png"}
        />
        <MainCard
          title={"Total Users"}
          amt={mainData ? mainData.totalUsers : 0}
          src={"/assets/doctors/users.png"}
        />
        <MainCard
          title={"Total Patients"}
          amt={mainData ? mainData.totalPatients : 0}
          src={"/assets/patients/patients.png"}
        />
        <MainCard
          title={"Emergency Patients"}
          amt={mainData ? mainData.emergencyPatients : 0}
          src={"/assets/patients/emergencyPatient.png"}
        />
        <MainCard
          title={"General Patients"}
          amt={mainData ? mainData.generalPatients : 0}
          src={"/assets/patients/generalPatient.png"}
        />
      </Box>
      <Divider />
      <Headings title={"Today Sales"} />
      <Box display={"flex"} gap={2} flexWrap={"wrap"}>
        <TodayCard
          src={"/assets/fees/fee2.png"}
          title={"OPD Fees"}
          bgcolor={"linear-gradient(to right, #a9e3e5, #daf3b6)"}
          total={todayData ? todayData.opdFee : 0}
        />
        <TodayCard
          src={"/assets/fees/fee1.png"}
          title={"Appointments"}
          bgcolor={"linear-gradient(to right, #a9e3e5, #daf3b6)"}
          total={todayData ? todayData.aptFee : 0}
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
