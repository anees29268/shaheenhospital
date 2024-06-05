"use client";

import FeesPrintPreviews from "@/app/((user))/fees-preview/page";
import { Print } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const LabPending = () => {
  const [patient, setPatient] = useState();
  const [payment, setPayment] = useState();
  const [getFees, setGetFees] = useState();

  const [pat, setPat] = useState();
  const [recordPat, setRecordPat] = useState();

  const [fee, setFee] = useState({
    patient: "",
    payment: "",
    desc: "",
    amount: "",
    discount: 0,
  });

  const handlePatPreview = async (row) => {
    const id = row.original._id;

    try {
      const res = await axios.get(`/api/user/fees/${id}`);
      setRecordPat(res.data);
    } catch (error) {
      alert(`${error}`);
    }
  };

  const getFeesDetails = async () => {
    try {
      const res = await axios.get("/api/user/fees");
      if (res.status === 200) {
        // console.log(res.data);
        const newData = res.data.filter(
          (item) =>
            item.paymentId.paymentCat === "664e3036aba278ddf0be71f9" &&
            item.status === "pending"
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Preview",
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <IconButton color="secondary" onClick={() => handlePatPreview(row)}>
            <Print />
          </IconButton>
        ),
      },
      {
        accessorKey: "patientId.name", //access nested data with dot notation
        header: "Patient",
        size: 150,
      },
      {
        accessorKey: "patientId.cnic", //access nested data with dot notation
        header: "Patient CNIC",
        size: 150,
      },
      {
        accessorKey: "paymentId.title",
        header: "Payment",
        size: 150,
      },
      {
        accessorKey: "paymentId.amount",
        header: "Amount",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "Net Amount",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <>
            {row.original.paymentId
              ? row.original.paymentId.amount - renderedCellValue
              : 0}
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getPatients();
    getPayments();
    getFeesDetails();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: getFees ? getFees : [],
    enableEditing: true,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <br />
      {recordPat ? (
        <FeesPrintPreviews
          name={recordPat.patientId.name}
          token={recordPat.patientId._id}
          patientType={recordPat.patientId.case}
          father_husband={recordPat.patientId.fatherName}
          payment={recordPat.paymentId.title}
          amount={recordPat.amount}
          discount={recordPat.discount}
          address={recordPat.patientId.address}
          total={recordPat.amount - recordPat.discount}
          contact={recordPat.patientId.contact}
          age={recordPat.patientId.age}
          cnic={recordPat.patientId.cnic}
        />
      ) : null}
    </>
  );
};

export default LabPending;
