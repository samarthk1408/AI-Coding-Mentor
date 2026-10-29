
import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Practice.css";

const API_BASE =
    "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai";

const languageOptions = {
    Java: "java",
    "C++": "cpp",
    Python: "python",
};

function Practice() {
    const [language, setLanguage] = useState("Java");
    const [code, setCode] = useState("");
    const [review, setReview] = useState("");
    const [correctedCode, setCorrectedCode] = useState("");
    const [output, setOutput] = useState("");

    const [loadingReview, setLoadingReview] = useState(false);
    const [loadingCorrect, setLoadingCorrect] = useState(false);
    const [loadingRun, setLoadingRun] = useState(false);
    const [activeResult, setActiveResult] = useState("output");
    const [copied, setCopied] = useState(false);

    const getAIReview = async () => {
        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        try {
            setLoadingReview(true);
            setActiveResult("review");

            const response = await axios.post(
                `${API_BASE}/review`,
                { language, code }
            );

            setReview(response.data.guidance || "No review was returned.");
        } catch (error) {
            console.error("AI review error:", error);
            setReview("Unable to review code. Please try again.");
        } finally {
            setLoadingReview(false);
        }
    };

    const getCorrectCode = async () => {
        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        try {
            setLoadingCorrect(true);
            setActiveResult("corrected");

            const response = await axios.post(
                `${API_BASE}/correct`,
                { language, code }
            );

            setCorrectedCode(
                response.data.guidance || "No corrected code was returned."
            );
        } catch (error) {
            console.error("Code correction error:", error);
            setCorrectedCode("Unable to generate corrected code.");
        } finally {
            setLoadingCorrect(false);
        }
    };

    const runCode = async () => {
        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        try {
            setLoadingRun(true);
            setActiveResult("output");

            const response = await axios.post(
                `${API_BASE}/run`,
                { language, code }
            );

            setOutput(response.data.guidance ?? "No output was returned.");
        } catch (error) {
            console.error("Code execution error:", error);
            setOutput("Failed to execute code. Please try again.");
        } finally {
            setLoadingRun(false);
        }
    };

    const clearAll = () => {
        setCode("");
        setReview("");
        setCorrectedCode("");
        setOutput("");
        setActiveResult("output");
        setCopied(false);
    };

    const copyText = async (text) => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch (error) {
            console.error("Copy failed:", error);
            alert("Unable to copy. Please select and copy the text manually.");
        }
    };

    const resultContent = {
        output,
        review,
        corrected: correctedCode,
    };

    const resultLoading = {
        output: loadingRun,
        review: loadingReview,
        corrected: loadingCorrect,
    };

    const resultTitles = {
        output: "Execution Output",
        review: "AI Code Review",
        corrected: "Corrected Code",
    };

    const activeText = resultContent[activeResult];
    const isResultLoading = resultLoading[activeResult];

    return (
        <main className="practice-page">
            <div className="practice-container">
                <header className="practice-header">
                    <div className="practice-title-group">
                        <div className="practice-logo">&lt;/&gt;</div>

                        <div>
                            <p className="practice-eyebrow">
                                DEVELOPER WORKSPACE
                            </p>
                            <h1>Practice Coding</h1>
                            <p className="practice-subtitle">
                                Write, run, review, and improve your code with
                                AI assistance.
                            </p>
                        </div>
                    </div>

                    <div className="practice-header-status">
                        <span className="practice-status-dot" />
                        Coding environment
                    </div>
                </header>

                <section className="practice-banner">
                    <div>
                        <span className="practice-banner-label">
                            <span>✦</span> BUILD BETTER CODE
                        </span>

                        <h2>
                            Think. Code.
                            <span> Improve.</span>
                        </h2>

                        <p>
                            Experiment with your solutions, run your code, and
                            use AI feedback to sharpen your programming skills.
                        </p>
                    </div>

                    <div className="practice-banner-art" aria-hidden="true">
                        <div className="practice-art-circle">
                            <span>{"{ }"}</span>
                        </div>
                        <span className="practice-art-chip">Java</span>
                        <span className="practice-art-chip practice-art-chip-two">
                            AI
                        </span>
                    </div>
                </section>

                <section className="practice-editor-panel">
                    <div className="practice-editor-toolbar">
                        <div className="practice-file-info">
                            <div className="practice-file-icon">&lt;/&gt;</div>
                            <div>
                                <h3>Code Editor</h3>
                                <p>main.{language === "C++" ? "cpp" : language === "Python" ? "py" : "java"}</p>
                            </div>
                        </div>

                        <div className="practice-language-control">
                            <label htmlFor="practice-language">
                                LANGUAGE
                            </label>

                            <select
                                id="practice-language"
                                value={language}
                                onChange={(event) =>
                                    setLanguage(event.target.value)
                                }
                            >
                                {Object.keys(languageOptions).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="practice-editor-shell">
                        <Editor
                            height="460px"
                            theme="vs-dark"
                            language={languageOptions[language]}
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineHeight: 23,
                                fontFamily: "'Cascadia Code', Consolas, monospace",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 4,
                                wordWrap: "on",
                                padding: { top: 18, bottom: 18 },
                                roundedSelection: true,
                                renderLineHighlight: "all",
                                cursorBlinking: "smooth",
                                smoothScrolling: true,
                            }}
                        />
                    </div>

                    <div className="practice-editor-statusbar">
                        <span>
                            <span className="practice-status-dot" />
                            Ready
                        </span>
                        <span>{language}</span>
                        <span>{code.split("\n").length} lines</span>
                    </div>

                    <div className="practice-action-bar">
                        <div className="practice-action-group">
                            <button
                                type="button"
                                className="practice-action practice-run"
                                onClick={runCode}
                                disabled={loadingRun || loadingReview || loadingCorrect}
                            >
                                {loadingRun ? (
                                    <>
                                        <span className="practice-spinner" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <span>▶</span> Run Code
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="practice-action practice-review"
                                onClick={getAIReview}
                                disabled={loadingRun || loadingReview || loadingCorrect}
                            >
                                {loadingReview ? (
                                    <>
                                        <span className="practice-spinner" />
                                        Reviewing...
                                    </>
                                ) : (
                                    <>
                                        <span>✦</span> AI Review
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="practice-action practice-correct"
                                onClick={getCorrectCode}
                                disabled={loadingRun || loadingReview || loadingCorrect}
                            >
                                {loadingCorrect ? (
                                    <>
                                        <span className="practice-spinner" />
                                        Improving...
                                    </>
                                ) : (
                                    <>
                                        <span>⌘</span> Correct Code
                                    </>
                                )}
                            </button>
                        </div>

                        <button
                            type="button"
                            className="practice-clear-button"
                            onClick={clearAll}
                            disabled={
                                !code && !review && !correctedCode && !output &&
                                !loadingRun && !loadingReview && !loadingCorrect
                            }
                        >
                            <span>↻</span> Clear
                        </button>
                    </div>
                </section>

                <section className="practice-results-panel">
                    <div className="practice-results-heading">
                        <div>
                            <p className="practice-eyebrow">FEEDBACK & RESULTS</p>
                            <h2>Workspace Results</h2>
                        </div>
                        <span className="practice-results-badge">
                            {activeText ? "Result available" : "Waiting for code"}
                        </span>
                    </div>

                    <div className="practice-result-tabs" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeResult === "output"}
                            className={
                                activeResult === "output"
                                    ? "practice-result-tab active"
                                    : "practice-result-tab"
                            }
                            onClick={() => setActiveResult("output")}
                        >
                            <span>▶</span> Output
                            {output && <i />}
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeResult === "review"}
                            className={
                                activeResult === "review"
                                    ? "practice-result-tab active"
                                    : "practice-result-tab"
                            }
                            onClick={() => setActiveResult("review")}
                        >
                            <span>✦</span> AI Review
                            {review && <i />}
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeResult === "corrected"}
                            className={
                                activeResult === "corrected"
                                    ? "practice-result-tab active"
                                    : "practice-result-tab"
                            }
                            onClick={() => setActiveResult("corrected")}
                        >
                            <span>{"</>"}</span> Corrected Code
                            {correctedCode && <i />}
                        </button>
                    </div>

                    <div className="practice-result-content">
                        {isResultLoading ? (
                            <div className="practice-result-empty">
                                <div className="practice-result-loader">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <h3>
                                    {activeResult === "output"
                                        ? "Running your code..."
                                        : activeResult === "review"
                                        ? "Reviewing your solution..."
                                        : "Improving your code..."}
                                </h3>
                                <p>Please wait while we process your request.</p>
                            </div>
                        ) : activeText ? (
                            <div className="practice-result-populated">
                                <div className="practice-result-topline">
                                    <div>
                                        <span className="practice-result-dot" />
                                        {resultTitles[activeResult]}
                                    </div>

                                    <button
                                        type="button"
                                        className="practice-copy-button"
                                        onClick={() => copyText(activeText)}
                                    >
                                        {copied ? "✓ Copied" : "▢ Copy"}
                                    </button>
                                </div>

                                <pre className="practice-result-text">
                                    {activeText}
                                </pre>
                            </div>
                        ) : (
                            <div className="practice-result-empty">
                                <div className="practice-result-empty-icon">
                                    {activeResult === "output"
                                        ? "▶"
                                        : activeResult === "review"
                                        ? "✦"
                                        : "</>"}
                                </div>

                                <h3>
                                    {activeResult === "output"
                                        ? "Your output will appear here"
                                        : activeResult === "review"
                                        ? "Get feedback on your code"
                                        : "Improve your solution"}
                                </h3>

                                <p>
                                    {activeResult === "output"
                                        ? "Write your code above and select Run Code to see the response."
                                        : activeResult === "review"
                                        ? "Ask your AI mentor to review your code and provide feedback."
                                        : "Use Correct Code to request an improved version of your solution."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <footer className="practice-footer">
                    <span>AI Coding Mentor</span>
                    <span>Practice consistently. Learn continuously.</span>
                </footer>
            </div>
        </main>
    );
}

export default Practice;
