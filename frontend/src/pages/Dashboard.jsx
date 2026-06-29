import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Stack,
    Chip,
    Grid
} from "@mui/material";

import {
    SmartToy,
    ArrowForward,
    AutoAwesome,
    Terminal,
    School,
    Timeline,
    ArrowOutward
} from "@mui/icons-material";

function Dashboard() {

    const navigate = useNavigate();

    const userEmail =
        localStorage.getItem("userEmail");

    const featureCards = [

        {
            title: "AI Mentor",
            desc: "Generate AI Guidance",
            color: "#2563EB",
            icon: <AutoAwesome sx={{ fontSize: 45 }} />,
            route: "/ai"
        },

        {
            title: "Practice",
            desc: "Solve Coding Problems",
            color: "#10B981",
            icon: <Terminal sx={{ fontSize: 45 }} />,
            route: "/practice"
        },

        {
            title: "Interview",
            desc: "Mock Interview",
            color: "#8B5CF6",
            icon: <School sx={{ fontSize: 45 }} />,
            route: "/interview"
        },

        {
            title: "DSA Roadmap",
            desc: "Master Data Structures",
            color: "#F59E0B",
            icon: <Timeline sx={{ fontSize: 45 }} />,
            route: "/roadmap"
        }

    ];

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#081321,#111827,#1E293B)",
                p: 5
            }}
        >

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6 }}
            >

                <Card
                    sx={{
                        background:
                            "linear-gradient(135deg,#2563EB,#7C3AED)",
                        color: "white",
                        borderRadius: 5,
                        mb: 5,
                        boxShadow:
                            "0 20px 50px rgba(37,99,235,.45)"
                    }}
                >

                    <CardContent sx={{ p: 5 }}>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Box>

                                <Chip
                                    label="AI Powered"
                                    sx={{
                                        background:
                                            "rgba(255,255,255,.2)",
                                        color: "white",
                                        mb: 2
                                    }}
                                />

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                >
                                    Welcome Back
                                </Typography>

                                <Typography
                                    variant="h6"
                                    mt={2}
                                >
                                    {userEmail}
                                </Typography>

                                <Typography
                                    mt={3}
                                    sx={{
                                        maxWidth: 600,
                                        opacity: .9
                                    }}
                                >
                                    Master Coding with Artificial Intelligence.
                                    Practice coding, prepare for interviews and
                                    improve your problem-solving skills.
                                </Typography>

                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    onClick={() => navigate("/practice")}
                                    sx={{
                                        mt: 4,
                                        background: "white",
                                        color: "#2563EB",
                                        fontWeight: "bold",
                                        textTransform: "none"
                                    }}
                                >
                                    Start Practicing
                                </Button>

                            </Box>

                            <Avatar
                                sx={{
                                    width: 140,
                                    height: 140,
                                    background:
                                        "rgba(255,255,255,.15)"
                                }}
                            >
                                <SmartToy
                                    sx={{
                                        fontSize: 80
                                    }}
                                />
                            </Avatar>

                        </Stack>

                    </CardContent>

                </Card>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    mb={3}
                >
                    Quick Access
                </Typography>

                <Grid container spacing={3}>

                    {featureCards.map((item, index) => (

                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={3}
                            key={index}
                        >

                            <motion.div
                                whileHover={{
                                    scale: 1.04,
                                    y: -8
                                }}
                            >

                                <Card
                                    onClick={() => navigate(item.route)}
                                    sx={{
                                        cursor: "pointer",
                                        borderRadius: 5,
                                        color: "white",
                                        background: `linear-gradient(135deg,${item.color},#1E293B)`,
                                        transition: ".3s",
                                        height: 220,
                                        "&:hover": {
                                            boxShadow: `0 20px 45px ${item.color}66`
                                        }
                                    }}
                                >

                                    <CardContent
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}
                                    >

                                        <Box>
                                            {item.icon}
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                opacity: .85
                                            }}
                                        >
                                            {item.desc}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            endIcon={<ArrowOutward />}
                                            sx={{
                                                mt: 2,
                                                background: "white",
                                                color: item.color,
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                borderRadius: 3,
                                                "&:hover": {
                                                    background: "#F8FAFC"
                                                }
                                            }}
                                        >
                                            Open
                                        </Button>

                                    </CardContent>

                                </Card>

                            </motion.div>

                        </Grid>

                    ))}

                </Grid>
                <Box mt={5}>

                    <Card
                        sx={{
                            borderRadius: 5,
                            background:
                                "linear-gradient(135deg,#2563EB,#7C3AED)",
                            color: "white"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                AI Tip
                            </Typography>

                            <Typography
                                mt={2}
                                sx={{
                                    opacity: .9,
                                    lineHeight: 1.8
                                }}
                            >
                                Practice one coding problem every day.
                                Focus on understanding the logic instead
                                of memorizing solutions. Consistency and
                                problem-solving skills will help you crack
                                coding interviews faster.
                            </Typography>

                        </CardContent>

                    </Card>

                </Box>

                </motion.div>

                </Box>

                );

                }

                export default Dashboard;