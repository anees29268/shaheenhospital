import {
  Diversity2,
  Home,
  Memory,
  Payment,
  PaymentOutlined,
  Timeline,
  WorkOutline,
} from "@mui/icons-material";

export const userMenu = [
  {
    title: "Home",
    icon: <Home />,
    url: "/",
  },
  {
    title: "Appointments",
    icon: <WorkOutline />,
    url: "/appointments",
  },
  {
    title: "Records",
    icon: <Memory />,
    url: "/records",
  },
  {
    title: "Doctors",
    icon: <Diversity2 />,
    url: "/doctors",
  },
  {
    title: "Fees",
    icon: <PaymentOutlined />,
    url: "/fees",
  },
];
export const doctorMenu = [
  {
    title: "Dashboard",
    icon: <Home />,
    url: "/admin",
  },
  {
    title: "Doctors",
    icon: <WorkOutline />,
    url: "/admin/doctors",
  },
  {
    title: "Timings",
    icon: <Timeline />,
    url: "/admin/timings",
  },
  {
    title: "Payments",
    icon: <Payment />,
    url: "/admin/payments",
  },
  {
    title: "Users",
    icon: <Memory />,
    url: "/admin/users",
  },
];
