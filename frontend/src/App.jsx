import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation
} from "react-router-dom";

import DSARoadmap from "./pages/DSARoadmap";
import ProblemDetails from "./pages/ProblemDetails";
import AIMentor from "./pages/AIMentor";
import Practice from "./pages/Practice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
function Navigation({ isLoggedIn, userEmail, logout }) {

    const location = useLocation();

    return null;

}

function App() {

    const isLoggedIn =
        localStorage.getItem("userEmail");
        const userEmail = localStorage.getItem("userEmail");

    const logout = () => {

        localStorage.removeItem(
            "userEmail"
        );

        window.location.href = "/login";
    };

    return (

        <BrowserRouter>

            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    background: "rgba(15,23,42,0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
            >
                <Toolbar sx={{ px: 3 }}>

                    <SmartToyIcon
                        sx={{
                            color: "#38BDF8",
                            fontSize: 34,
                            mr: 1
                        }}
                    />
<Typography
    component={Link}
    to="/"
    variant="h5"
    sx={{
        flexGrow: 1,
        fontWeight: 700,
        textDecoration: "none",
        background:
            "linear-gradient(90deg,#38BDF8,#8B5CF6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        cursor: "pointer"
    }}
>
    AI Coding Mentor
</Typography>

                    {isLoggedIn ? (
                        <>



                           <Button
                               component={Link}
                               to="/"
                               color="inherit"
                               startIcon={<DashboardIcon />}
                           >
                               Home
                           </Button>

                            <Button
                                component={Link}
                                to="/ai"
                                color="inherit"
                                startIcon={<PsychologyIcon />}
                            >
                                AI Mentor
                            </Button>

                            <Button
                                component={Link}
                                to="/practice"
                                color="inherit"
                                startIcon={<CodeIcon />}
                            >
                                Practice
                            </Button>

                            <Button
                                component={Link}
                                to="/interview"
                                color="inherit"
                                startIcon={<QuizIcon />}
                            >
                                Interview
                            </Button>

                            <Tooltip title={userEmail || ""}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#3B82F6",
                                        ml: 3,
                                        mr: 2
                                    }}
                                >
                                    {userEmail?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Tooltip>

                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={logout}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none"
                                }}
                            >
                                Logout
                            </Button>

                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                            >
                                Login
                            </Button>

                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                sx={{
                                    ml: 2,
                                    borderRadius: "12px",
                                    textTransform: "none"
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>

            <Routes>

              <Route
                  path="/"
                  element={
                      isLoggedIn
                          ? <Dashboard />
                          : <Navigate to="/login" />
                  }
              />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/problems/:id"
                    element={
                        isLoggedIn
                            ? <ProblemDetails />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/ai"
                    element={
                        isLoggedIn
                            ? <AIMentor />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/practice"
                    element={
                        isLoggedIn
                            ? <Practice />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/interview"
                    element={
                        isLoggedIn
                            ? <Interview />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/roadmap"
                    element={
                        isLoggedIn
                            ? <DSARoadmap />
                            : <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;