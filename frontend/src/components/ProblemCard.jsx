import { useState } from "react";
import { Link } from "react-router-dom";

function ProblemCard({ problem }) {

    const [showHint, setShowHint] = useState(false);

    const getDifficultyBadge = () => {
        switch (problem.difficulty) {
            case "Easy":
                return "bg-success";

            case "Medium":
                return "bg-warning text-dark";

            case "Hard":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    return (
        <div
            className="card shadow-sm border-0 mb-4"
            style={{
                borderRadius: "15px"
            }}
        >
            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold">
                        {problem.title}
                    </h4>

                    <span
                        className={`badge ${getDifficultyBadge()}`}
                    >
                        {problem.difficulty}
                    </span>

                </div>

                <div className="mt-2">
                    <span className="badge bg-secondary">
                        {problem.topic || "General"}
                    </span>
                </div>

                <p className="mt-3 text-muted">
                    {problem.description ||
                        "No description available."}
                </p>

                {showHint && (
                    <div className="alert alert-info mt-3">
                        <strong>Hint:</strong>{" "}
                        {problem.hint || "No hint available."}
                    </div>
                )}

                <div className="mt-3">

                    <Link
                        to={`/problems/${problem.id}`}
                        className="btn btn-outline-primary me-2"
                    >
                        View Details
                    </Link>

                    <button
                        className="btn btn-outline-success"
                        onClick={() =>
                            setShowHint(!showHint)
                        }
                    >
                        {showHint
                            ? "Hide Hint"
                            : "Show Hint"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ProblemCard;