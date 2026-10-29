
import { useState } from "react";
import axios from "axios";
import "./Interview.css";

const API_BASE =
    "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/interview";

const topics = [
    "Java",
    "DSA",
    "Spring Boot",
    "React",
    "DBMS",
    "OOP",
];

function parseQuestions(text) {
    if (!text || typeof text !== "string") return [];

    const numbered = text
        .split(/\n\s*(?=\d+[.)]\s)/)
        .map((item) => item.replace(/^\s*\d+[.)]\s*/, "").trim())
        .filter(Boolean);

    if (numbered.length > 1) return numbered;

    const cleaned = text.trim().replace(/^\s*\d+[.)]\s*/, "");
    return cleaned ? [cleaned] : [];
}

function Interview() {
    const [topic, setTopic] = useState("Java");
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingEvaluation, setLoadingEvaluation] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [evaluatedQuestions, setEvaluatedQuestions] = useState({});

    const startInterview = async () => {
        try {
            setLoadingQuestions(true);
            setCompleted(false);
            setQuestions([]);
            setQuestion("");
            setAnswer("");
            setFeedback("");
            setCurrentQuestion(0);
            setEvaluatedQuestions({});

            const response = await axios.post(
                `${API_BASE}/question`,
                { problem: topic }
            );

            const generatedQuestions = parseQuestions(
                response.data.guidance
            );

            if (generatedQuestions.length === 0) {
                alert("No questions were returned. Please try again.");
                return;
            }

            setQuestions(generatedQuestions);
            setQuestion(generatedQuestions[0]);
        } catch (error) {
            console.error("Interview question error:", error);
            alert("Failed to generate questions. Please try again.");
        } finally {
            setLoadingQuestions(false);
        }
    };

    const submitAnswer = async () => {
        if (!answer.trim()) {
            alert("Please enter your answer first.");
            return;
        }

        try {
            setLoadingEvaluation(true);

            const response = await axios.post(
                `${API_BASE}/evaluate`,
                {
                    question,
                    answer,
                }
            );

            const result =
                response.data.guidance || "No evaluation was returned.";

            setFeedback(result);
            setEvaluatedQuestions((previous) => ({
                ...previous,
                [currentQuestion]: {
                    answer,
                    feedback: result,
                },
            }));
        } catch (error) {
            console.error("Answer evaluation error:", error);
            alert("Failed to evaluate your answer. Please try again.");
        } finally {
            setLoadingEvaluation(false);
        }
    };

    const goToQuestion = (index) => {
        if (index < 0 || index >= questions.length) return;

        setCurrentQuestion(index);
        setQuestion(questions[index]);

        const saved = evaluatedQuestions[index];

        setAnswer(saved?.answer || "");
        setFeedback(saved?.feedback || "");
        setCompleted(false);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            goToQuestion(currentQuestion + 1);
        } else {
            setCompleted(true);
        }
    };

    const clearInterview = () => {
        setQuestion("");
        setQuestions([]);
        setCurrentQuestion(0);
        setAnswer("");
        setFeedback("");
        setEvaluatedQuestions({});
        setCompleted(false);
    };

    const progress =
        questions.length > 0
            ? completed
                ? 100
                : ((currentQuestion + 1) / questions.length) * 100
            : 0;

    const evaluatedCount = Object.keys(evaluatedQuestions).length;

    return (
        <main className="interview-page">
            <div className="interview-container">
                <header className="interview-header">
                    <div className="interview-title-group">
                        <div className="interview-logo" aria-hidden="true">
                            <span>AI</span>
                        </div>

                        <div>
                            <p className="interview-eyebrow">
                                CAREER READINESS WORKSPACE
                            </p>
                            <h1>AI Mock Interview</h1>
                            <p className="interview-subtitle">
                                Practice your answers, get feedback, and build
                                confidence for your next interview.
                            </p>
                        </div>
                    </div>

                    <div className="interview-status">
                        <span className="interview-status-dot" />
                        Practice mode
                    </div>
                </header>

                <section className="interview-hero">
                    <div className="interview-hero-content">
                        <span className="interview-pill">
                            <span>✦</span> PRACTICE WITH PURPOSE
                        </span>

                        <h2>
                            Prepare today.
                            <span> Perform tomorrow.</span>
                        </h2>

                        <p>
                            Choose your subject, answer interview questions,
                            and receive AI-generated feedback to help you
                            improve your responses.
                        </p>
                    </div>

                    <div className="interview-hero-art" aria-hidden="true">
                        <div className="interview-hero-ring interview-ring-one" />
                        <div className="interview-hero-ring interview-ring-two" />
                        <div className="interview-hero-center">Q&A</div>
                        <span className="interview-float interview-float-one">
                            ?
                        </span>
                        <span className="interview-float interview-float-two">
                            ✓
                        </span>
                    </div>
                </section>

                <section className="interview-setup-panel">
                    <div className="interview-section-heading">
                        <div className="interview-section-number">01</div>
                        <div>
                            <h3>Set up your interview</h3>
                            <p>
                                Select a subject to generate your practice
                                questions.
                            </p>
                        </div>
                    </div>

                    <div className="interview-setup-controls">
                        <div className="interview-topic-field">
                            <label htmlFor="interview-topic">
                                INTERVIEW SUBJECT
                            </label>

                            <select
                                id="interview-topic"
                                value={topic}
                                onChange={(event) => setTopic(event.target.value)}
                                disabled={loadingQuestions}
                            >
                                {topics.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            className="interview-start-button"
                            onClick={startInterview}
                            disabled={loadingQuestions || loadingEvaluation}
                        >
                            {loadingQuestions ? (
                                <>
                                    <span className="interview-spinner" />
                                    Generating questions...
                                </>
                            ) : (
                                <>
                                    <span>✦</span> Start Interview
                                </>
                            )}
                        </button>

                        {(questions.length > 0 || completed) && (
                            <button
                                type="button"
                                className="interview-reset-button"
                                onClick={clearInterview}
                                disabled={loadingQuestions || loadingEvaluation}
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </section>

                {questions.length > 0 && !completed && (
                    <section className="interview-session">
                        <div className="interview-session-top">
                            <div>
                                <p className="interview-eyebrow">
                                    YOUR PRACTICE SESSION
                                </p>
                                <h3>{topic} Interview</h3>
                            </div>

                            <div className="interview-question-count">
                                Question <strong>{currentQuestion + 1}</strong>
                                {" / "}
                                {questions.length}
                            </div>
                        </div>

                        <div className="interview-progress-track">
                            <div
                                className="interview-progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="interview-session-grid">
                            <aside className="interview-question-sidebar">
                                <h4>QUESTIONS</h4>

                                <div className="interview-question-list">
                                    {questions.map((item, index) => (
                                        <button
                                            type="button"
                                            key={`${index}-${item.slice(0, 20)}`}
                                            className={[
                                                "interview-question-nav",
                                                index === currentQuestion
                                                    ? "interview-question-nav-active"
                                                    : "",
                                                evaluatedQuestions[index]
                                                    ? "interview-question-nav-done"
                                                    : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                            onClick={() => goToQuestion(index)}
                                            disabled={loadingEvaluation}
                                        >
                                            <span className="interview-question-nav-number">
                                                {evaluatedQuestions[index]
                                                    ? "✓"
                                                    : String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span>
                                                Question {index + 1}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="interview-sidebar-stat">
                                    <span>Answers evaluated</span>
                                    <strong>
                                        {evaluatedCount} / {questions.length}
                                    </strong>
                                </div>
                            </aside>

                            <div className="interview-question-main">
                                <div className="interview-question-card">
                                    <div className="interview-question-label">
                                        <span>✦</span> INTERVIEW QUESTION
                                    </div>

                                    <h2>{question}</h2>

                                    <p>
                                        Take a moment to structure your
                                        response. Explain your reasoning
                                        clearly and include an example where
                                        relevant.
                                    </p>
                                </div>

                                <div className="interview-answer-section">
                                    <label htmlFor="interview-answer">
                                        YOUR ANSWER
                                    </label>

                                    <textarea
                                        id="interview-answer"
                                        rows={7}
                                        placeholder="Type your answer here. Explain the concept in your own words..."
                                        value={answer}
                                        onChange={(event) => {
                                            setAnswer(event.target.value);
                                        }}
                                        disabled={loadingEvaluation}
                                    />

                                    <div className="interview-answer-footer">
                                        <span>
                                            {answer.trim()
                                                ? `${answer.trim().split(/\s+/).length} words`
                                                : "Write your answer in your own words"}
                                        </span>
                                        <span>Be clear and specific</span>
                                    </div>

                                    <div className="interview-answer-actions">
                                        <button
                                            type="button"
                                            className="interview-submit-button"
                                            onClick={submitAnswer}
                                            disabled={
                                                loadingEvaluation ||
                                                loadingQuestions ||
                                                !answer.trim()
                                            }
                                        >
                                            {loadingEvaluation ? (
                                                <>
                                                    <span className="interview-spinner" />
                                                    Evaluating...
                                                </>
                                            ) : (
                                                <>
                                                    <span>✦</span> Evaluate Answer
                                                </>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className="interview-next-button"
                                            onClick={nextQuestion}
                                            disabled={
                                                loadingEvaluation ||
                                                loadingQuestions
                                            }
                                        >
                                            {currentQuestion === questions.length - 1
                                                ? "Finish Interview"
                                                : "Next Question"}
                                            <span>→</span>
                                        </button>
                                    </div>
                                </div>

                                {feedback && (
                                    <div className="interview-feedback">
                                        <div className="interview-feedback-heading">
                                            <div className="interview-feedback-icon">
                                                ✦
                                            </div>
                                            <div>
                                                <h3>AI Evaluation</h3>
                                                <p>
                                                    Feedback on your response
                                                </p>
                                            </div>
                                        </div>

                                        <pre className="interview-feedback-text">
                                            {feedback}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {completed && (
                    <section className="interview-completion">
                        <div className="interview-completion-icon">✓</div>
                        <p className="interview-eyebrow">SESSION COMPLETE</p>
                        <h2>Interview practice completed!</h2>
                        <p>
                            You reached the end of your {topic} question set.
                            Review your answers and keep practicing to build
                            confidence.
                        </p>

                        <div className="interview-completion-stats">
                            <div>
                                <strong>{questions.length}</strong>
                                <span>Questions</span>
                            </div>
                            <div>
                                <strong>{evaluatedCount}</strong>
                                <span>Evaluated answers</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="interview-start-button"
                            onClick={clearInterview}
                        >
                            Back to setup
                        </button>
                    </section>
                )}

                {questions.length === 0 && !loadingQuestions && !completed && (
                    <section className="interview-empty-state">
                        <div className="interview-empty-icon">Q&A</div>
                        <h3>Your next interview starts here</h3>
                        <p>
                            Choose a subject above and start a practice session.
                            Your questions and AI feedback will appear here.
                        </p>
                    </section>
                )}

                {loadingQuestions && (
                    <section className="interview-empty-state">
                        <div className="interview-loading-animation">
                            <span />
                            <span />
                            <span />
                        </div>
                        <h3>Preparing your interview...</h3>
                        <p>
                            Your AI mentor is generating questions for{" "}
                            {topic}.
                        </p>
                    </section>
                )}

                <footer className="interview-footer">
                    <span>AI Coding Mentor</span>
                    <span>Every question is a chance to improve.</span>
                </footer>
            </div>
        </main>
    );
}

export default Interview;
