import dayjs from "dayjs";

export const appointmentsData = [
  {
    cnic: "1234567890",
    patient: "Saeed Khan",
    doctor: "Dr. Saleem",
    appointmentDate: "29 April 2024, 11:30 AM",
    bookingDate: "20 April 2024, 11:30 AM",
  },
  {
    cnic: "0987654321",
    patient: "Muhammad Irshad",
    doctor: "Dr. Saleem",
    appointmentDate: "29 April 2024, 11:30 AM",
    bookingDate: "20 April 2024, 11:30 AM",
  },
  {
    cnic: "776665433",
    patient: "Aslam Niaz",
    doctor: "Dr. Iqrar",
    appointmentDate: "29 April 2024, 11:30 AM",
    bookingDate: "20 April 2024, 11:30 AM",
  },
  {
    cnic: "0998687134",
    patient: "Shakoor Saahb",
    doctor: "Dr. Abrahi,",
    appointmentDate: "29 April 2024, 11:30 AM",
    bookingDate: "20 April 2024, 11:30 AM",
  },
];
export const doctorsData = [
  {
    doctor: "Dr. Saleem",
    timing: "04:00 PM - 08:00 PM",
    days: "Sat, Sunday",
    desc: "ENT Specialist",
  },
  {
    doctor: "Dr. Zahid Khan",
    timing: "02:00 PM - 04:00 PM",
    days: "Fri, Mond",
    desc: "Arthophotic",
  },
  {
    doctor: "Dr. Tahir Jan",
    timing: "11:00 AM - 01:00 PM",
    days: "Monday to Friday",
    desc: "Heart Specialist",
  },
];
export const recordsData = [
  {
    id: 1,
    patientCNIC: "123423432",
    patientName: "Muhammad Dilshad",
    caseType: "Emergency",
    checkedBy: "-",
    appointmentDate: "29 April 2024, 11:30 AM",
    releasedDate: "-",
    fee: 1200,
    status: "checked",
    remarks: "-",
  },
  {
    id: 2,
    patientCNIC: "3434645645",
    patientName: "Shahid Hussain",
    caseType: "General",
    checkedBy: "Dr. Ibrar",
    appointmentDate: "20 April 2024, 11:30 AM",
    releasedDate: "21 April 2024, 04:30 AM",
    fee: 1500,
    status: "checked",
    remarks: "Throat issues etc..........",
  },
];
export const doctors = [
  {
    name: "Dr. Zohaib Ahmad",
    cnic: "34534534345",
    contact: "34534543",
    specialization: "MBBS, FCPS",
    desc: "dsfdfsdf",
    address: "dfsdfsd",
    hiringDate: dayjs(new Date()).format("DD/MM/YYY"),
  },
  {
    name: "Dr. Imran Raza",
    cnic: "098756765657",
    contact: "123343545",
    specialization: "dgfdfsg",
    desc: "sdfgdgfs",
    address: "sdfgdgfgfs",
    hiringDate: dayjs(new Date()).format("DD/MM/YYY"),
  },
];
