"use client";

import { Box, Button, Container, Typography } from "@mui/material";
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
        <div className="testClass"></div>
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
