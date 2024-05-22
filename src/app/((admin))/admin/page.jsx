"use client";

import MainCard from "@/components/admin/dashboard/MainCard";
import Headings from "@/components/globals/Headings";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const session = useSession();

  const [mainData, setMainData] = useState();

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

  useEffect(() => {
    getMainData();
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={"10px 10px"}
          // alignItems={"center"}
          gap={1}
          sx={{
            background: "linear-gradient(to right, #a9e3e5, #daf3b6)",
            borderRadius: 1,
            minWidth: 250,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
          >
            <Avatar
              src="/assets/fees/fee1.png"
              variant="square"
              sx={{
                height: 40,
                width: 40,
              }}
            />
            <Typography fontWeight={700} variant="body1">
              OPD Fees
            </Typography>
          </Box>

          <Typography
            variant="body1"
            fontWeight={700}
            sx={{
              ml: 2,
              mt: 1,
            }}
          >
            RS. 15,000
          </Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            p={"10px 10px"}
            // alignItems={"center"}
            gap={1}
            sx={{
              background: "linear-gradient(to right, #a9e3e5, #daf3b6)",
              borderRadius: 1,
              minWidth: 250,
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              alignItems={"center"}
            >
              <Avatar
                src="/assets/fees/fee2.png"
                variant="square"
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
              <Typography fontWeight={700} variant="body1" maxWidth={130}>
                Appointments
              </Typography>
            </Box>

            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                ml: 2,
                mt: 1,
              }}
            >
              RS. 10,500
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} gap={2}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            p={"10px 10px"}
            // alignItems={"center"}
            gap={1}
            sx={{
              background: "linear-gradient(to right, #a9e3e5, #daf3b6)",
              borderRadius: 1,
              minWidth: 250,
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              alignItems={"center"}
            >
              <Avatar
                src="/assets/fees/fee3.png"
                variant="square"
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
              <Typography fontWeight={700} variant="body1" maxWidth={130}>
                Others
              </Typography>
            </Box>

            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                ml: 2,
                mt: 1,
              }}
            >
              RS. 23,500
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
