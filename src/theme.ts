import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F766E",
      dark: "#115E59",
      light: "#5EEAD4",
    },
    secondary: {
      main: "#C2410C",
      light: "#FDBA74",
      dark: "#9A3412",
    },
    background: {
      default: "#F4F1EA",
      paper: "#FFFDF8",
    },
    text: {
      primary: "#1B1B18",
      secondary: "#53524D",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "\"IBM Plex Sans\", sans-serif",
    h1: {
      fontFamily: "\"Space Grotesk\", sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "\"Space Grotesk\", sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "\"Space Grotesk\", sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "\"Space Grotesk\", sans-serif",
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

