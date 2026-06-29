import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "dark",

        primary: {
            main: "#3B82F6",
        },

        secondary: {
            main: "#8B5CF6",
        },

        success: {
            main: "#10B981",
        },

        warning: {
            main: "#F59E0B",
        },

        error: {
            main: "#EF4444",
        },

        background: {

            default: "#0B1120",

            paper: "#1E293B",
        },
    },

    typography: {

        fontFamily: "Inter, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 18,
    },
});

export default theme;