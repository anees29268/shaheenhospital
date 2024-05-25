"use client";

import { Print } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

const FeesPrintPreviews = ({
  name,
  father_husband,
  cnic,
  gender,
  age,
  patientType,
  address,
  contact,
  regDate,
  appDate,
  token,
  payment,
  desc,
  amount,
  discount,
  total,
}) => {
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
    return (
      <Button startIcon={<Print />} variant="contained">
        Print{" "}
      </Button>
    );
  }, []);

  const identifyGenderFromCNIC = (cnic) => {
    let cnicStr = cnic.toString();
    const lastDigit = parseInt(cnicStr[cnicStr.length - 1]);
    return lastDigit % 2 === 0 ? "Female" : "Male";
  };

  return (
    <Box p={4}>
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

        <div className="testClass">
          {/* Top Preview */}
          <Box display={"flex"} gap={2} alignItems={"center"} p={2.5}>
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
              <Typography variant="h6">{payment}</Typography>
            </Stack>
          </Box>
          {/* Patient Information */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            pr={4}
            pl={4}
            fontSize={13}
            sx={{
              ".MuiTypography-root": {
                // fontSize: 12,
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
                <Typography variant="body2">{name}</Typography>
              </Box>
              <Box>
                <b>Father/Husband: </b>
                <Typography variant="body2">{father_husband}</Typography>
              </Box>
              <Box>
                <b>CNIC: </b>
                <Typography variant="body2">{cnic}</Typography>
              </Box>
              <Box>
                <b>Gender: </b>
                <Typography variant="body2">
                  {identifyGenderFromCNIC(cnic)}
                </Typography>
              </Box>
              <Box>
                <b>Age: </b>
                <Typography variant="body2">{age}</Typography>
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
                <b>Contact:</b>
                <Typography variant="body2">{contact}</Typography>
              </Box>

              <Box>
                <b>Reg. Date: </b>
                <Typography variant="body2">
                  {dayjs(regDate).format("D MMM, YYYY h:mm A")}
                </Typography>
              </Box>
              <Box>
                <b>Amount: </b>
                <Typography variant="body2">
                  RS. {amount ? amount.toLocaleString() : null}
                </Typography>
              </Box>
              <Box>
                <b>Discount: </b>
                <Typography variant="body2">
                  RS. {discount ? discount.toLocaleString() : 0}
                </Typography>
              </Box>
              <Box>
                <b>Total: </b>
                <Typography variant="body2">
                  RS. {total ? total.toLocaleString() : 0}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              // className="global"
              sx={{
                ".MuiTypography-root": {
                  fontSize: 24,
                },
              }}
            >
              <Box>
                <Typography variant="h5" textAlign={"center"}>
                  PAY ID
                </Typography>

                <div
                  style={{
                    padding: "15px 0 0 0",
                    textAlign: "center",
                  }}
                >
                  {token ? token : "_________________"}
                </div>
              </Box>
            </Stack>
          </Box>
          {/* Diagonis Area */}
          <br />

          {/* <Box className="watermark"></Box> */}
          {/* Footer Area */}
          <Typography
            variant="body2"
            color={"text.secondary"}
            sx={{
              ml: 4,
            }}
          >
            {desc ? desc : "DESCRIPTION HERE"}
          </Typography>
          <br />
          <Box minHeight={670} borderTop={1}></Box>
          <Box
            className="global"
            pr={4}
            flexDirection={"column"}
            pl={4}
            sx={{
              borderTop: "1px solid black",
              p: "10px 0",
              // alignItems: "flex-end",
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

            <Typography
              variant="body1"
              sx={{
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: 700,
                mt: 1,
              }}
            >
              Doctor Zohaib Ahmad
            </Typography>
            <Typography variant="caption" maxWidth={"90%"} textAlign={"center"}>
              MBBS (HMC), FCPS (General Surgery), Consultant General Surgeon,
              City Hospital, Gilgit, Ex. Registrar Ayub Teaching Hospital
              Abbottabad
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

export default FeesPrintPreviews;
