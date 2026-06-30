import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
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
    const location = window.location.pathname;

    const navButtonStyle = (path) => ({
        color: location === path ? "#38BDF8" : "white",
        fontWeight: location === path ? 700 : 500,
        borderBottom:
            location === path
                ? "2px solid #38BDF8"
                : "2px solid transparent",
        borderRadius: 0,
        textTransform: "none",
        transition: "0.3s"
    });
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

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
              <Toolbar
                  sx={{
                      px: {
                          xs: 2,
                          md: 3
                      },
                      py: 1,
                      display: "flex",
                      justifyContent: "space-between"
                  }}
              >

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
   variant="h6"
    sx={{
        fontSize:{
            xs:"1.15rem",
            md:"1.5rem"
        },
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
                   <Box
                       sx={{
                           display: {
                               xs: "none",
                               md: "flex"
                           },
                           alignItems: "center",
                           gap: 1
                       }}
                   >
                       <Button
                           component={Link}
                           to="/"
                           startIcon={<DashboardIcon />}
                           sx={navButtonStyle("/")}
                       >

                        Home
                       </Button>

                      <Button
                          component={Link}
                          to="/ai"
                          startIcon={<PsychologyIcon />}
                          sx={navButtonStyle("/ai")}
                      >
                           AI Mentor
                       </Button>

                       <Button
                           component={Link}
                           to="/practice"
                           sx={navButtonStyle("/practice")}
                           color="inherit"
                           startIcon={<CodeIcon />}
                       >
                           Practice
                       </Button>

                       <Button
                           component={Link}
                           to="/interview"
                           sx={navButtonStyle("/interview")}
                           color="inherit"
                           startIcon={<QuizIcon />}
                       >
                           Interview
                       </Button>

                      <Button
                          component={Link}
                          to="/roadmap"
                          sx={navButtonStyle("/roadmap")}
                           startIcon={<HomeIcon />}
                       >
                           Roadmap
                       </Button>

                       <Tooltip title={userEmail || ""}>
                           <Avatar
                               sx={{
                                   bgcolor:"#3B82F6",
                                   mx:2
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
                               borderRadius:"12px",
                               textTransform:"none"
                           }}
                       >
                           Logout
                       </Button>
                   </Box>

                   <IconButton
                       color="inherit"
                       sx={{
                           display:{
                               xs:"flex",
                               md:"none"
                           }
                       }}
                       onClick={toggleDrawer}
                   >
                       <MenuIcon/>
                   </IconButton>

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
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{
                        width: 260,
                        bgcolor: "#0F172A",
                        height: "100%",
                        color: "white"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            p: 2,
                            fontWeight: "bold",
                            color: "#38BDF8"
                        }}
                    >
                        AI Coding Mentor
                    </Typography>

                    <List>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/"
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: "white" }} />
                                </ListItemIcon>

                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/ai"
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon>
                                    <PsychologyIcon sx={{ color: "white" }} />
                                </ListItemIcon>

                                <ListItemText primary="AI Mentor" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/practice"
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon>
                                    <CodeIcon sx={{ color: "white" }} />
                                </ListItemIcon>

                                <ListItemText primary="Practice" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/interview"
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon>
                                    <QuizIcon sx={{ color: "white" }} />
                                </ListItemIcon>

                                <ListItemText primary="Interview" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/roadmap"
                                onClick={toggleDrawer}
                            >
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: "white" }} />
                                </ListItemIcon>

                                <ListItemText primary="DSA Roadmap" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    toggleDrawer();
                                    logout();
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: "#EF4444" }} />
                                </ListItemIcon>

                                <ListItemText
                                    primary="Logout"
                                    primaryTypographyProps={{
                                        color: "#EF4444"
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>

                    </List>

                </Box>
            </Drawer>

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