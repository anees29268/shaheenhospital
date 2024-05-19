"use client";

import Headings from "@/components/globals/Headings";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();

  return (
    <Stack direction={"column"} p={3} spacing={3}>
      <Typography variant="h5" fontWeight={700} className="global">
        Welcome {session?.data?.user?.name}
      </Typography>

      <Box display={"flex"} gap={2}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={2}
          alignItems={"center"}
          gap={1}
          sx={{
            background: "linear-gradient(to right, #02aab0, #00cdac);",
            borderRadius: 1,
            minWidth: 200,
          }}
        >
          <Avatar
            src="/assets/doctors/doctors.png"
            variant="square"
            sx={{
              height: 80,
              width: 80,
            }}
          />
          <Typography variant="h6">Total Doctors</Typography>
          <Typography variant="h6" fontWeight={700}>
            6
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={2}
          alignItems={"center"}
          gap={1}
          sx={{
            background: "linear-gradient(to right, #02aab0, #00cdac);",
            borderRadius: 1,
            minWidth: 200,
          }}
        >
          <Avatar
            src="/assets/doctors/users.png"
            variant="square"
            sx={{
              height: 80,
              width: 80,
            }}
          />
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h6" fontWeight={700}>
            2
          </Typography>
        </Box>
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
