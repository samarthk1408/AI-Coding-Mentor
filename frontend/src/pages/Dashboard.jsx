
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
    Grid,
    Divider
} from "@mui/material";
import {
    SmartToy,
    ArrowForward,
    AutoAwesome,
    Terminal,
    School,
    Timeline,
    ArrowOutward,
    Code,
    Psychology,
    TrackChanges
} from "@mui/icons-material";

function Dashboard() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail") || "Developer";

    const featureCards = [
        {
            title: "AI Mentor",
            desc: "Get step-by-step coding guidance.",
            detail: "LEARN WITH AI",
            color: "#8B7CFF",
            icon: <AutoAwesome />,
            route: "/ai"
        },
        {
            title: "Practice",
            desc: "Solve problems and strengthen logic.",
            detail: "BUILD YOUR SKILLS",
            color: "#42CFA5",
            icon: <Terminal />,
            route: "/practice"
        },
        {
            title: "Interview Prep",
            desc: "Prepare for technical interviews.",
            detail: "GET INTERVIEW READY",
            color: "#F5B860",
            icon: <School />,
            route: "/interview"
        },
        {
            title: "DSA Roadmap",
            desc: "Explore data structures and algorithms.",
            detail: "FOLLOW YOUR PATH",
            color: "#70B8FF",
            icon: <Timeline />,
            route: "/roadmap"
        }
    ];

    const firstName = userEmail.includes("@")
        ? userEmail.split("@")[0]
        : userEmail;

    const mutedText = {
        color: "#929BB5"
    };

    const cardStyle = {
        background: "#121A2D",
        border: "1px solid #242E45",
        borderRadius: "18px",
        color: "#F3F4FA",
        boxShadow: "none"
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#0B1020",
                color: "#F3F4FA",
                p: { xs: 2, sm: 3, md: 5 },
                boxSizing: "border-box"
            }}
        >
            <Box sx={{ maxWidth: 1240, mx: "auto" }}>
                {/* Top navigation */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ mb: 5 }}
                >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                bgcolor: "#29234F",
                                color: "#B8ACFF",
                                width: 44,
                                height: 44,
                                borderRadius: "13px"
                            }}
                        >
                            <Code />
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: 17,
                                    letterSpacing: "-.4px"
                                }}
                            >
                                AI Coding Mentor
                            </Typography>

                            <Typography
                                sx={{ ...mutedText, fontSize: 11 }}
                            >
                                YOUR PERSONAL CODING SPACE
                            </Typography>
                        </Box>
                    </Stack>

                    <Chip
                        label="● Ready to learn"
                        sx={{
                            color: "#BCEEDD",
                            bgcolor: "#142C2B",
                            border: "1px solid #28514A",
                            fontWeight: 600
                        }}
                    />
                </Stack>

                {/* Welcome banner */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            p: { xs: 3, md: 5 },
                            mb: 5,
                            borderRadius: "24px",
                            border: "1px solid #34315F",
                            background:
                                "radial-gradient(ellipse at 90% 0%, #353064 0%, transparent 45%), linear-gradient(120deg, #191A38, #171D34)"
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                width: 220,
                                height: 220,
                                right: -70,
                                bottom: -120,
                                borderRadius: "50%",
                                border: "1px solid #514B82",
                                pointerEvents: "none"
                            }}
                        />

                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Chip
                                    icon={<AutoAwesome />}
                                    label="YOUR AI-POWERED LEARNING SPACE"
                                    sx={{
                                        mb: 2.5,
                                        bgcolor: "#292650",
                                        color: "#C8BEFF",
                                        border: "1px solid #494176",
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: ".6px",
                                        "& .MuiChip-icon": {
                                            color: "#B4A7FF"
                                        }
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: 31,
                                            md: 43
                                        },
                                        lineHeight: 1.15,
                                        letterSpacing: "-1.5px",
                                        fontWeight: 800,
                                        mb: 1.5
                                    }}
                                >
                                    Welcome back,
                                    <br />
                                    <Box
                                        component="span"
                                        sx={{ color: "#A99AFF" }}
                                    >
                                        {firstName}.
                                    </Box>
                                </Typography>

                                <Typography
                                    sx={{
                                        ...mutedText,
                                        maxWidth: 540,
                                        lineHeight: 1.9,
                                        fontSize: 14
                                    }}
                                >
                                    Every great developer starts with one
                                    problem. Learn concepts, practice coding,
                                    and prepare for your next challenge at
                                    your own pace.
                                </Typography>

                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    onClick={() => navigate("/practice")}
                                    sx={{
                                        mt: 3,
                                        px: 2.5,
                                        py: 1.3,
                                        borderRadius: "10px",
                                        bgcolor: "#8B7CFF",
                                        color: "#101225",
                                        textTransform: "none",
                                        fontWeight: 800,
                                        boxShadow: "none",
                                        "&:hover": {
                                            bgcolor: "#A99AFF",
                                            boxShadow: "none"
                                        }
                                    }}
                                >
                                    Start practicing
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: {
                                            xs: "flex-start",
                                            md: "center"
                                        },
                                        mt: { xs: 1, md: 0 }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            display: "grid",
                                            placeItems: "center",
                                            borderRadius: "32px",
                                            background:
                                                "linear-gradient(145deg, #373064, #242747)",
                                            border: "1px solid #514980",
                                            boxShadow:
                                                "0 20px 50px rgba(0,0,0,.2)"
                                        }}
                                    >
                                        <SmartToy
                                            sx={{
                                                fontSize: 84,
                                                color: "#B9ADFF"
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </motion.div>

                {/* Workspace heading */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "flex-end" }}
                    spacing={1}
                    sx={{ mb: 2.5 }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 23,
                                fontWeight: 800,
                                letterSpacing: "-.6px"
                            }}
                        >
                            Your learning workspace
                        </Typography>

                        <Typography
                            sx={{
                                ...mutedText,
                                mt: 0.7,
                                fontSize: 13
                            }}
                        >
                            Choose where you want to make progress today.
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            ...mutedText,
                            fontSize: 12,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.7
                        }}
                    >
                        <TrackChanges sx={{ fontSize: 17 }} />
                        Pick a path and get started
                    </Typography>
                </Stack>

                {/* Feature cards */}
                <Grid container spacing={2.2}>
                    {featureCards.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            lg={3}
                            key={item.title}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.35,
                                    delay: index * 0.08
                                }}
                                whileHover={{ y: -5 }}
                                style={{ height: "100%" }}
                            >
                                <Card
                                    onClick={() => navigate(item.route)}
                                    sx={{
                                        ...cardStyle,
                                        height: "100%",
                                        minHeight: 235,
                                        cursor: "pointer",
                                        transition:
                                            "border-color .2s, background .2s",
                                        "&:hover": {
                                            borderColor: item.color,
                                            background: "#172036"
                                        }
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 2.7,
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            "&:last-child": {
                                                pb: 2.7
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 47,
                                                height: 47,
                                                display: "grid",
                                                placeItems: "center",
                                                borderRadius: "14px",
                                                color: item.color,
                                                bgcolor: `${item.color}18`,
                                                border: `1px solid ${item.color}40`,
                                                mb: 2.5,
                                                "& svg": {
                                                    fontSize: 24
                                                }
                                            }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: 17,
                                                mb: 0.8
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                ...mutedText,
                                                fontSize: 12.5,
                                                lineHeight: 1.8,
                                                minHeight: 44
                                            }}
                                        >
                                            {item.desc}
                                        </Typography>

                                        <Divider
                                            sx={{
                                                width: "100%",
                                                my: 2,
                                                borderColor: "#273149"
                                            }}
                                        />

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{
                                                width: "100%",
                                                mt: "auto"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: item.color,
                                                    fontSize: 9,
                                                    fontWeight: 800,
                                                    letterSpacing: ".8px"
                                                }}
                                            >
                                                {item.detail}
                                            </Typography>

                                            <ArrowOutward
                                                sx={{
                                                    fontSize: 18,
                                                    color: item.color
                                                }}
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Learning tip */}
                <Card
                    sx={{
                        ...cardStyle,
                        mt: 4,
                        background:
                            "linear-gradient(110deg, #151D32, #171B35)"
                    }}
                >
                    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{
                                xs: "flex-start",
                                sm: "center"
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: "13px",
                                    bgcolor: "#2A254E",
                                    color: "#B9ADFF"
                                }}
                            >
                                <Psychology />
                            </Avatar>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: 15,
                                        mb: 0.7
                                    }}
                                >
                                    A little advice for today
                                </Typography>

                                <Typography
                                    sx={{
                                        ...mutedText,
                                        fontSize: 13,
                                        lineHeight: 1.9
                                    }}
                                >
                                    Focus on understanding the logic behind a
                                    solution instead of memorizing code.
                                    Consistent practice builds stronger
                                    problem-solving skills over time.
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Typography
                    sx={{
                        ...mutedText,
                        textAlign: "center",
                        fontSize: 11,
                        mt: 4
                    }}
                >
                    AI Coding Mentor · Learn, practice, and grow.
                </Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;
