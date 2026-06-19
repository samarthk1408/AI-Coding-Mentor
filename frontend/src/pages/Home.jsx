import { Link } from "react-router-dom";
import ProblemsList from "../components/ProblemsList";

function Home() {

    return (

        <div className="container mt-5">

            {/* Hero Section */}

            <div className="hero-section">

                <h1 className="hero-title">
                    🚀 AI Coding Mentor
                </h1>

                <p className="hero-subtitle">
                    Practice coding, get AI-powered reviews,
                    improve problem-solving skills and track
                    your progress like a professional developer.
                </p>

                <div className="mt-4">

                    <Link
                        to="/practice"
                        className="btn btn-primary btn-lg me-3"
                    >
                        Start Coding
                    </Link>

                    <Link
                        to="/ai"
                        className="btn btn-success btn-lg"
                    >
                        AI Mentor
                    </Link>

                </div>

            </div>

            {/* Stats Section */}

            <div className="row mt-5">

                <div className="col-md-4 mb-3">

                    <div className="card shadow dashboard-card">

                        <h2>
                            📚
                        </h2>

                        <h4>
                            Coding Problems
                        </h4>

                        <p>
                            Practice DSA, Arrays,
                            Strings, Trees and more.
                        </p>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow dashboard-card">

                        <h2>
                            🤖
                        </h2>

                        <h4>
                            AI Guidance
                        </h4>

                        <p>
                            Get hints, approaches,
                            complexity analysis and
                            interview tips instantly.
                        </p>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow dashboard-card">

                        <h2>
                            📈
                        </h2>

                        <h4>
                            Progress Tracking
                        </h4>

                        <p>
                            Monitor solved problems
                            and improve continuously.
                        </p>

                    </div>

                </div>

            </div>

            {/* Problems Section */}

            <div className="mt-5">

                <h2 className="mb-4 text-center">
                    🔥 Popular Problems
                </h2>

                <ProblemsList />

            </div>

        </div>
    );
}

export default Home;