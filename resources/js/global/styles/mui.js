import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";

const theme = createTheme({
    status: {
        danger: orange[900],
    },
    palette: {
        primary: {
            main: "#065f41",
        },
        secondary: {
            main: red[900],
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff",
        },
        warning: {
            light: "#ffb74d",
            main: "#ff9800",
            dark: "#f57c00",
            contrastText: "#fff",
        },
        info: {
            light: "#64b5f6",
            main: "#2196f3",
            dark: "#1976d2",
            contrastText: "#fff",
        },
        success: {
            light: "#81c784",
            main: "#4caf50",
            dark: "#388e3c",
            contrastText: "#fff",
        },
    },
});

export default theme;
