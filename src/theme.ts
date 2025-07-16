import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#A0A0A0",
    },
    primary: {
      main: "#3A86FF", // Акцентный цвет
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E1E", // Фон выпадающего списка
        },
      },
    },
  },
});
