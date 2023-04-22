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
    },
});

export default theme;
