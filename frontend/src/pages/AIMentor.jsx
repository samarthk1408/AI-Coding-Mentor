
import { useState, useEffect } from "react";
import axios from "axios";
import "./AIMentor.css";

const API_BASE =
  "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai";

function parseVisualization(text) {
  if (!text) return null;

  try {
    let cleaned = text.trim();

    // Handle JSON wrapped in Markdown code fences.
    cleaned = cleaned
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1 || end < start) {
      return null;
    }

    const parsed = JSON.parse(cleaned.slice(start, end + 1));

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray(parsed.steps)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function DiagramRenderer({ diagram, steps }) {
  const nodes = Array.isArray(diagram?.nodes)
    ? diagram.nodes
    : [];

  const connections = Array.isArray(diagram?.connections)
    ? diagram.connections
    : [];

  const validNodes = nodes.filter(
    (node) => node && typeof node.id === "string"
  );

  const nodeIds = new Set(validNodes.map((node) => node.id));

  const validConnections = connections.filter(
    (connection) =>
      connection &&
      nodeIds.has(connection.from) &&
      nodeIds.has(connection.to)
  );

  const statusClass = (status) => {
    const allowed = [
      "active",
      "compared",
      "completed",
      "result",
      "normal",
    ];

    return allowed.includes(String(status).toLowerCase())
      ? String(status).toLowerCase()
      : "normal";
  };

  return (
    <section className="mentor-visual-card">
      <div className="mentor-visual-heading">
        <span className="mentor-visual-badge">
          AI-GENERATED VISUALIZATION
        </span>

        <h3>Problem diagram</h3>

        <p>
          Diagram type: {diagram?.type || "general"}
        </p>
      </div>

      {validNodes.length > 0 ? (
        <>
          <div className="mentor-diagram-node-grid">
            {validNodes.map((node) => (
              <div className="mentor-diagram-node" key={node.id}>
                <strong>{node.label || node.id}</strong>

                {node.detail && (
                  <span>{node.detail}</span>
                )}
              </div>
            ))}
          </div>

          {validConnections.length > 0 && (
            <div className="mentor-connections">
              <h4>Relationships and flow</h4>

              {validConnections.map((connection, index) => {
                const fromNode = validNodes.find(
                  (node) => node.id === connection.from
                );

                const toNode = validNodes.find(
                  (node) => node.id === connection.to
                );

                return (
                  <div
                    className="mentor-connection"
                    key={`${connection.from}-${connection.to}-${index}`}
                  >
                    <div className="mentor-connection-endpoint">
                      {fromNode?.label || connection.from}
                    </div>

                    <div className="mentor-connection-middle">
                      <span>
                        {connection.label || "leads to"}
                      </span>
                      <span className="mentor-connection-arrow">
                        →
                      </span>
                    </div>

                    <div className="mentor-connection-endpoint">
                      {toNode?.label || connection.to}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <p className="mentor-visual-note">
          The AI did not provide diagram nodes for this response.
          Review the generated steps below.
        </p>
      )}

      {steps.length > 0 && (
        <div className="mentor-step-list">
          <h4>Step-by-step execution</h4>

          {steps.map((step, index) => {
            const state = Array.isArray(step?.state)
              ? step.state
              : [];

            return (
              <article
                className="mentor-step-card"
                key={`${step.number ?? index}-${index}`}
              >
                <div className="mentor-step-heading">
                  <span className="mentor-step-number">
                    {step.number ?? index + 1}
                  </span>

                  <h5>
                    {step.title || `Step ${index + 1}`}
                  </h5>
                </div>

                {step.explanation && (
                  <p className="mentor-step-explanation">
                    {step.explanation}
                  </p>
                )}

                {state.length > 0 && (
                  <div className="mentor-step-state">
                    {state.map((item, stateIndex) => (
                      <div
                        className={`mentor-state-box mentor-state-${statusClass(
                          item.status
                        )}`}
                        key={`${item.id || item.label || "state"}-${stateIndex}`}
                      >
                        <span>
                          {item.label || item.id || "Value"}
                        </span>

                        <strong>
                          {item.value ?? item.detail ?? "—"}
                        </strong>

                        {item.status && (
                          <small>{item.status}</small>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {diagram?.type && (
        <p className="mentor-visual-disclaimer">
          Visualization format: {diagram.type}. Values and steps
          are generated by the AI and should be checked against
          the original problem.
        </p>
      )}
    </section>
  );
}

function AIMentor() {
  const [problem, setProblem] = useState(
    () => localStorage.getItem("problem") || ""
  );

  const [guidance, setGuidance] = useState(
    () => localStorage.getItem("guidance") || ""
  );

  const [visualization, setVisualization] = useState(
    () => localStorage.getItem("visualization") || ""
  );

  const [guidanceLoading, setGuidanceLoading] = useState(false);
  const [visualizationLoading, setVisualizationLoading] =
    useState(false);

  const [activeTab, setActiveTab] = useState("guidance");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("problem", problem);
  }, [problem]);

  useEffect(() => {
    localStorage.setItem("guidance", guidance);
  }, [guidance]);

  useEffect(() => {
    localStorage.setItem("visualization", visualization);
  }, [visualization]);

  const getGuidance = async () => {
    if (!problem.trim()) {
      alert("Please enter a coding problem.");
      return;
    }

    try {
      setGuidanceLoading(true);
      setActiveTab("guidance");

      const response = await axios.post(
        `${API_BASE}/guidance`,
        { problem }
      );

      setGuidance(
        response.data.guidance || "No guidance was returned."
      );
    } catch (error) {
      console.error("AI guidance error:", error);
      alert("Failed to get AI guidance. Please try again.");
    } finally {
      setGuidanceLoading(false);
    }
  };

  const getVisualization = async () => {
    if (!problem.trim()) {
      alert("Please enter a coding problem.");
      return;
    }

    try {
      setVisualizationLoading(true);
      setActiveTab("visualization");
      setCopied(false);

      const response = await axios.post(
        `${API_BASE}/visualize`,
        { problem }
      );

      const result =
        response.data?.guidance ||
        "No visualization was returned.";

      setVisualization(result);
    } catch (error) {
      console.error("Visualization error:", error);
      alert("Failed to generate visualization. Please try again.");
    } finally {
      setVisualizationLoading(false);
    }
  };

  const clearAll = () => {
    setProblem("");
    setGuidance("");
    setVisualization("");
    setActiveTab("guidance");
    setCopied(false);

    localStorage.removeItem("problem");
    localStorage.removeItem("guidance");
    localStorage.removeItem("visualization");
  };

  const currentResponse =
    activeTab === "guidance" ? guidance : visualization;

  const currentLoading =
    activeTab === "guidance"
      ? guidanceLoading
      : visualizationLoading;

  const copyResponse = async () => {
    if (!currentResponse) return;

    try {
      await navigator.clipboard.writeText(currentResponse);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Unable to copy. Please select and copy the text manually.");
    }
  };

  const formatResponse = (text) => {
    if (!text) return null;

    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part
          .replace(/^```[^\n]*\n?/, "")
          .replace(/\n?```$/, "");

        return (
          <pre className="mentor-code-block" key={index}>
            <code>{code}</code>
          </pre>
        );
      }

      return part ? (
        <span className="mentor-text-part" key={index}>
          {part}
        </span>
      ) : null;
    });
  };

  const parsedVisualization =
    activeTab === "visualization"
      ? parseVisualization(visualization)
      : null;

  return (
    <main className="mentor-page">
      <div className="mentor-container">
        <header className="mentor-header">
          <div className="mentor-title-group">
            <div className="mentor-logo" aria-hidden="true">
              <span>&lt;/&gt;</span>
            </div>

            <div>
              <p className="mentor-eyebrow">
                YOUR PERSONAL CODING ASSISTANT
              </p>

              <h1>AI Coding Mentor</h1>

              <p className="mentor-subtitle">
                Understand problems. Explore solutions. Learn
                one step at a time.
              </p>
            </div>
          </div>

          <div className="mentor-status">
            <span className="mentor-status-dot" />
            AI workspace
          </div>
        </header>

        <section className="mentor-welcome">
          <div className="mentor-welcome-content">
            <span className="mentor-pill">
              <span>✦</span> LEARN BY SOLVING
            </span>

            <h2>
              Let's solve something
              <span> interesting.</span>
            </h2>

            <p>
              Share a coding problem and get personalized
              guidance or a step-by-step visualization.
            </p>
          </div>

          <div className="mentor-decoration" aria-hidden="true">
            <div className="mentor-orbit mentor-orbit-one" />
            <div className="mentor-orbit mentor-orbit-two" />
            <div className="mentor-orbit-center">AI</div>

            <span className="mentor-float-icon mentor-float-one">
              {"{ }"}
            </span>

            <span className="mentor-float-icon mentor-float-two">
              {"</>"}
            </span>
          </div>
        </section>

        <div className="mentor-workspace">
          <section className="mentor-panel mentor-input-panel">
            <div className="mentor-panel-heading">
              <div className="mentor-section-icon">01</div>

              <div>
                <h3>Your coding problem</h3>
                <p>Describe the challenge you are working on.</p>
              </div>
            </div>

            <label
              className="mentor-field-label"
              htmlFor="coding-problem"
            >
              PROBLEM STATEMENT
            </label>

            <textarea
              id="coding-problem"
              className="mentor-textarea"
              rows={10}
              placeholder={
                "Paste any coding question here...\n\nExample: Explain an algorithm, trace a program, solve a SQL problem, or analyze a data structure."
              }
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
            />

            <div className="mentor-editor-footer">
              <span>
                <span className="mentor-key-icon">⌘</span>{" "}
                Be specific for better guidance
              </span>

              <span>{problem.length} characters</span>
            </div>

            <div className="mentor-actions">
              <button
                type="button"
                className="mentor-button mentor-button-primary"
                onClick={getGuidance}
                disabled={guidanceLoading || visualizationLoading}
              >
                {guidanceLoading ? (
                  <>
                    <span className="mentor-spinner" />
                    Generating...
                  </>
                ) : (
                  <>
                    <span>✦</span> Get AI Guidance
                  </>
                )}
              </button>

              <button
                type="button"
                className="mentor-button mentor-button-secondary"
                onClick={getVisualization}
                disabled={guidanceLoading || visualizationLoading}
              >
                {visualizationLoading ? (
                  <>
                    <span className="mentor-spinner" />
                    Creating...
                  </>
                ) : (
                  <>
                    <span>▥</span> Visualize Problem
                  </>
                )}
              </button>
            </div>

            <div className="mentor-input-note">
              <span>ⓘ</span>
              Your problem is saved in this browser so you can
              return to it later.
            </div>
          </section>

          <section className="mentor-panel mentor-output-panel">
            <div className="mentor-panel-heading mentor-output-heading">
              <div className="mentor-section-icon mentor-section-icon-purple">
                02
              </div>

              <div>
                <h3>Learning workspace</h3>
                <p>Your AI-generated results appear here.</p>
              </div>
            </div>

            <div className="mentor-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "guidance"}
                className={
                  activeTab === "guidance"
                    ? "mentor-tab mentor-tab-active"
                    : "mentor-tab"
                }
                onClick={() => {
                  setActiveTab("guidance");
                  setCopied(false);
                }}
              >
                <span>✦</span> AI Guidance
                {guidance && (
                  <span className="mentor-tab-indicator" />
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "visualization"}
                className={
                  activeTab === "visualization"
                    ? "mentor-tab mentor-tab-active"
                    : "mentor-tab"
                }
                onClick={() => {
                  setActiveTab("visualization");
                  setCopied(false);
                }}
              >
                <span>▥</span> Visualization
                {visualization && (
                  <span className="mentor-tab-indicator" />
                )}
              </button>
            </div>

            <div className="mentor-response">
              {currentLoading ? (
                <div className="mentor-loading-state">
                  <div className="mentor-loading-animation">
                    <span />
                    <span />
                    <span />
                  </div>

                  <h4>
                    {activeTab === "guidance"
                      ? "Thinking through your problem..."
                      : "Building your visualization..."}
                  </h4>

                  <p>
                    Your AI mentor is preparing the response.
                  </p>
                </div>
              ) : currentResponse ? (
                <div className="mentor-result">
                  <div className="mentor-result-topbar">
                    <div className="mentor-result-label">
                      <span className="mentor-result-dot" />
                      {activeTab === "guidance"
                        ? "GUIDANCE GENERATED"
                        : "VISUALIZATION GENERATED"}
                    </div>

                    <button
                      type="button"
                      className="mentor-copy-button"
                      onClick={copyResponse}
                    >
                      {copied ? "✓ Copied" : "▢ Copy response"}
                    </button>
                  </div>

                  {activeTab === "visualization" &&
                  parsedVisualization ? (
                    <>
                      {parsedVisualization.title && (
                        <h3 className="mentor-generated-title">
                          {parsedVisualization.title}
                        </h3>
                      )}

                      {parsedVisualization.problemType && (
                        <span className="mentor-visual-badge">
                          {parsedVisualization.problemType}
                        </span>
                      )}

                      {parsedVisualization.summary && (
                        <p className="mentor-generated-summary">
                          {parsedVisualization.summary}
                        </p>
                      )}

                      <DiagramRenderer
                        diagram={parsedVisualization.diagram}
                        steps={parsedVisualization.steps}
                      />

                      {parsedVisualization.keyObservation && (
                        <div className="mentor-key-observation">
                          <strong>Key observation</strong>
                          <p>
                            {parsedVisualization.keyObservation}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mentor-response-content">
                      {formatResponse(currentResponse)}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mentor-empty-state">
                  <div className="mentor-empty-icon">
                    {activeTab === "guidance" ? "✦" : "▥"}
                  </div>

                  <h4>
                    {activeTab === "guidance"
                      ? "Your guidance starts here"
                      : "Make the problem visual"}
                  </h4>

                  <p>
                    {activeTab === "guidance"
                      ? "Submit a coding problem to receive explanations and insights."
                      : "Generate a visualization to see the AI's problem-specific diagram and steps."}
                  </p>

                  <div className="mentor-empty-hint">
                    <span>↖</span>
                    Start by entering a problem on the left
                  </div>
                </div>
              )}
            </div>

            <div className="mentor-output-footer">
              <span>✦ Powered by your AI Mentor</span>
              <span>Review generated answers before using them.</span>
            </div>
          </section>
        </div>

        <footer className="mentor-footer">
          <span>AI Coding Mentor</span>
          <span>Built for curious minds and better code.</span>
        </footer>

        <div className="mentor-bottom-actions">
          <button
            type="button"
            className="mentor-clear-button"
            onClick={clearAll}
            disabled={
              !problem &&
              !guidance &&
              !visualization &&
              !guidanceLoading &&
              !visualizationLoading
            }
          >
            <span>↻</span> Clear workspace
          </button>
        </div>
      </div>
    </main>
  );
}

export default AIMentor;
