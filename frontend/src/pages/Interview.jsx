import { useState } from "react";
import axios from "axios";

function Interview() {

    const [topic, setTopic] =
        useState("Java");

    const [question, setQuestion] =
        useState("");

    const [questions, setQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [feedback, setFeedback] =
        useState("");

    const startInterview = async () => {

        try {

            const response = await axios.post(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/interview/question",
                {
                    problem: topic
                }
            );

            const generatedQuestions =
                response.data.guidance
                    .split(/\d+\./)
                    .filter(
                        q => q.trim() !== ""
                    );

            setQuestions(
                generatedQuestions
            );

            setCurrentQuestion(0);

            setQuestion(
                generatedQuestions[0]
            );

            setFeedback("");
            setAnswer("");

        } catch (error) {

            console.error(error);

            alert(
                "Failed to generate questions"
            );
        }
    };

    const submitAnswer = async () => {

        try {

            const response = await axios.post(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/interview/evaluate",
                {
                    question,
                    answer
                }
            );

            setFeedback(
                response.data.guidance
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to evaluate answer"
            );
        }
    };

    const nextQuestion = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            );

            setQuestion(
                questions[
                    currentQuestion + 1
                ]
            );

            setAnswer("");
            setFeedback("");
        }
        else {

            alert(
                "🎉 Interview Completed!"
            );
        }
    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                🎤 AI Mock Interview
            </h1>

            <div className="card shadow">

                <div className="card-body">

                    <label className="form-label">
                        Select Topic
                    </label>

                    <select
                        className="form-select"
                        value={topic}
                        onChange={(e) =>
                            setTopic(e.target.value)
                        }
                    >
                        <option>Java</option>
                        <option>DSA</option>
                        <option>Spring Boot</option>
                        <option>React</option>
                        <option>DBMS</option>
                        <option>OOP</option>
                    </select>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={startInterview}
                    >
                        Start Interview
                    </button>

                </div>

            </div>

            {question && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4>
                            Question {currentQuestion + 1}
                            {" / "}
                            {questions.length}
                        </h4>

                        <p>
                            {question}
                        </p>

                        <textarea
                            className="form-control"
                            rows="6"
                            placeholder="Enter your answer..."
                            value={answer}
                            onChange={(e) =>
                                setAnswer(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-success mt-3 me-2"
                            onClick={submitAnswer}
                        >
                            Submit Answer
                        </button>

                        <button
                            className="btn btn-warning mt-3"
                            onClick={nextQuestion}
                        >
                            Next Question
                        </button>

                    </div>

                </div>

            )}

            {feedback && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4>
                            Evaluation
                        </h4>

                        <pre
                            style={{
                                whiteSpace:
                                    "pre-wrap"
                            }}
                        >
                            {feedback}
                        </pre>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Interview;