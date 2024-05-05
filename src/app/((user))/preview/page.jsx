"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintPreviews = () => {
  const componentRef = useRef(null);
  const handlePrint = () => {};

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print </button>;
  }, []);

  return (
    <Box p={2}>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        // onAfterPrint={handleAfterPrint}
        // onBeforeGetContent={handleOnBeforeGetContent}
        // onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      <div ref={componentRef}>
        <style type="text/css" media="print">
          {
            "\
   @page { size: A4;  }\
"
          }
        </style>
        <div className="flash" />
        <div className="testClass">
          {/* Top Preview */}
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Avatar
              src="/assets/logo.jpg"
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Stack direction={"column"} className="global" width={"100%"}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: "#077F83",
                }}
              >
                Shaheen Hospital Gilgit Baltistan
              </Typography>
              <Typography variant="h6">Consultation Form</Typography>
            </Stack>
          </Box>
          {/* Patient Information */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={4}
            fontSize={14}
            sx={{
              ".MuiTypography-root": {
                fontSize: 14,
              },
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                ".MuiBox-root": {
                  display: "flex",
                  b: {
                    minWidth: 120,
                  },
                },
              }}
            >
              <Box>
                <b>Name: </b>
                <Typography variant="body2">Muhammad Abbas</Typography>
              </Box>
              <Box>
                <b>Father/Husband: </b>
                <Typography variant="body2">Ilyas Abbas</Typography>
              </Box>
              <Box>
                <b>CNIC: </b>
                <Typography variant="body2">324543534534</Typography>
              </Box>
              <Box>
                <b>Gender: </b>
                <Typography variant="body2">Male</Typography>
              </Box>
              <Box>
                <b>Age: </b>
                <Typography variant="body2">34</Typography>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              sx={{
                ".MuiBox-root": {
                  display: "flex",
                  b: {
                    minWidth: 120,
                  },
                },
              }}
            >
              <Box>
                <b>Patient Type: </b>
                <Typography variant="body2">General</Typography>
              </Box>
              <Box>
                <b>Address</b>
                <Typography variant="body2">Kashrote, Gilgit</Typography>
              </Box>
              <Box>
                <b>Contact</b>
                <Typography variant="body2">0300000000</Typography>
              </Box>
              <Box>
                <b>FEE</b>
                <Typography variant="body2">RS. 1500</Typography>
              </Box>
              <Box>
                <b>Reg. Date: </b>
                <Typography variant="body2">12 Dec, 2022 5:37 PM</Typography>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              className="global"
              sx={{
                ".MuiTypography-root": {
                  fontSize: 29,
                },
              }}
            >
              <Box>
                <Typography variant="h5">TOKEN NO</Typography>
                <Typography variant="h5" textAlign={"center"} fontWeight={700}>
                  45
                </Typography>
              </Box>
            </Stack>
          </Box>
          {/* Diagonis Area */}
          <br />
          <Box
            display={"flex"}
            sx={{
              borderTop: "1px solid black",
            }}
          >
            <Stack
              direction={"column"}
              spacing={1}
              width={175}
              p={"20px 0"}
              sx={{
                ".MuiTypography-root": {
                  fontWeight: 700,
                },
              }}
            >
              <Typography variant="body1">Vitals</Typography>
              <br />
              <br />
              <br />
              <br />
              <Typography variant="body1">Allergies</Typography>
              <br />
              <br />
              <br />
              <Typography variant="body1">Investigations</Typography>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Typography variant="body1">Procedures</Typography>
            </Stack>
            <Stack
              direction={"column"}
              spacing={7}
              p={"20px 0"}
              sx={{
                borderLeft: "1px solid black",
                paddingLeft: 2,
                ".MuiTypography-root": {
                  fontWeight: 700,
                },
              }}
            >
              <Typography variant="body1">Presenting Complaint</Typography>
              <br />
              <Typography variant="body1">Examination</Typography>
              <br />
              <Typography variant="body1">Final Diagnosis</Typography>
              <br />
              <Typography variant="body1">Treatment</Typography>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <Typography variant="body1">Follow Up Instructions</Typography>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Stack>
          </Box>
          {/* <Box className="watermark"></Box> */}
          {/* Footer Area */}
          <Box
            className="global"
            sx={{
              borderTop: "1px solid black",
              p: "30px 0",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Old Jeglot Adda, PIA Link Road, Kashrote, Gilgit.
            </Typography>
          </Box>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        style={{ marginTop: "16px" }}
      >
        Print
      </Button>
    </Box>
  );
};

export default PrintPreviews;
