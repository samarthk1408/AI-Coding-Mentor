import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip
} from "@mui/material";

const topics = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "HashMap",
    "Tree",
    "Binary Search Tree",
    "Heap",
    "Graph",
    "Dynamic Programming",
    "Backtracking"
];

function DSARoadmap() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#0F172A",
                p: 5
            }}
        >
            <Typography
                variant="h3"
                color="white"
                fontWeight="bold"
                mb={4}
            >
                DSA Roadmap
            </Typography>

            <Grid container spacing={3}>

                {topics.map((topic) => (

                    <Grid item xs={12} sm={6} md={4} key={topic}>

                        <Card
                            sx={{
                                borderRadius: 4,
                                background:
                                    "linear-gradient(135deg,#1E3A8A,#312E81)",
                                color: "white",
                                height: "100%"
                            }}
                        >

                            <CardContent>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    {topic}
                                </Typography>

                                <Chip
                                    label="Start Learning"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                />

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Box>
    );
}

export default DSARoadmap;