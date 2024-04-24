import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    grey2: {
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
    },
    blueAccent: {
      100: "#151632",
      200: "#2a2d64",
      300: "#3e4396",
      400: "#535ac8",
      500: "#6870fa",
      600: "#868dfb",
      700: "#a4a9fc",
      800: "#c3c6fd",
      900: "#e1e2fe",
    },
    primary2: {
      100: "#d0d1d5",
      200: "#a1a4ab",
      300: "#727681",
      400: "#767c89",
      500: "#141b2d",
      600: "#101624",
      700: "#0c101b",
      800: "#080b12",
      900: "#040509",
      1000: "#B0BBE7",
    },
    mainAccent: {
      100: "#58595e",
      200: "#FDFDFD",
      300: "#077F83",
      400: "#9ee7fe",
      500: "#fee2ff",
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#077f83",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#077f83",
          color: "#fff",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    grey2: {
      100: "#141414",
      200: "#292929",
      300: "#3d3d3d",
      400: "#525252",
      500: "#666666",
      600: "#858585",
      700: "#a3a3a3",
      800: "#c2c2c2",
      900: "#e0e0e0",
    },
    blueAccent: {
      100: "#e1e2fe",
      200: "#c3c6fd",
      300: "#a4a9fc",
      400: "#868dfb",
      500: "#6870fa",
      600: "#535ac8",
      700: "#3e4396",
      800: "#2a2d64",
      900: "#151632",
    },
    primary2: {
      100: "#040509",
      200: "#080b12",
      300: "#0c101b",
      400: "#f2f0f0", // manually changed
      500: "#141b2d",
      600: "#1F2A40",
      700: "#727681",
      800: "#a1a4ab",
      900: "#d0d1d5",
    },
    mainAccent: {
      100: "#D0D1D5",
      200: "#474343",
      300: "#077F83",
      400: "#070026",
      500: "#fee2ff",
    },
  },

  components: {
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#077f83",
    //     },
    //   },
    // },
    // MuiChip: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#077f83",
    //     },
    //   },
    // },
  },
});
