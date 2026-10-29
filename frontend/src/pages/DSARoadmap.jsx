
import { useEffect, useState } from "react";
import "./Roadmap.css";

const roadmap = [
    {
        phase: "01",
        title: "Programming Fundamentals",
        subtitle: "Build your foundation",
        level: "Beginner",
        topics: [
            {
                name: "Time and Space Complexity",
                description: "Understand Big O, O(n), O(log n), and algorithm efficiency.",
            },
            {
                name: "Basic Mathematics",
                description: "Learn primes, GCD, divisibility, and number-based problems.",
            },
            {
                name: "Recursion",
                description: "Understand base cases, recursive calls, and call stacks.",
            },
        ],
    },
    {
        phase: "02",
        title: "Arrays and Strings",
        subtitle: "Start solving problems",
        level: "Beginner",
        topics: [
            {
                name: "Arrays",
                description: "Traversal, searching, maximum subarray, and prefix sums.",
            },
            {
                name: "Strings",
                description: "Character counting, palindromes, and string manipulation.",
            },
            {
                name: "Sorting and Searching",
                description: "Learn sorting techniques and binary search.",
            },
            {
                name: "Two Pointers and Sliding Window",
                description: "Solve pair, subarray, and substring problems efficiently.",
            },
        ],
    },
    {
        phase: "03",
        title: "Core Data Structures",
        subtitle: "Store and manage data",
        level: "Beginner–Intermediate",
        topics: [
            {
                name: "HashMap and HashSet",
                description: "Frequency counting, duplicates, and fast lookups.",
            },
            {
                name: "Linked Lists",
                description: "Insertion, deletion, reversal, and cycle detection.",
            },
            {
                name: "Stacks",
                description: "Learn LIFO, balanced brackets, and monotonic stacks.",
            },
            {
                name: "Queues and Deques",
                description: "Understand FIFO, circular queues, and deque operations.",
            },
        ],
    },
    {
        phase: "04",
        title: "Trees and Heaps",
        subtitle: "Explore hierarchical data",
        level: "Intermediate",
        topics: [
            {
                name: "Binary Trees",
                description: "Learn tree traversals, height, depth, and level order.",
            },
            {
                name: "Binary Search Trees",
                description: "Understand search, insertion, deletion, and tree properties.",
            },
            {
                name: "Heaps and Priority Queues",
                description: "Solve top-K, kth-largest, and scheduling problems.",
            },
            {
                name: "Tries",
                description: "Learn prefix trees and efficient word searching.",
            },
        ],
    },
    {
        phase: "05",
        title: "Graphs",
        subtitle: "Understand connections",
        level: "Intermediate–Advanced",
        topics: [
            {
                name: "Graph Representation",
                description: "Learn adjacency lists, matrices, directed, and undirected graphs.",
            },
            {
                name: "BFS and DFS",
                description: "Traverse graphs and solve reachability problems.",
            },
            {
                name: "Shortest Path Algorithms",
                description: "Study BFS for unweighted graphs and Dijkstra's algorithm.",
            },
            {
                name: "Topological Sorting",
                description: "Understand dependency ordering and directed acyclic graphs.",
            },
        ],
    },
    {
        phase: "06",
        title: "Advanced Problem Solving",
        subtitle: "Prepare for interviews",
        level: "Advanced",
        topics: [
            {
                name: "Greedy Algorithms",
                description: "Make locally optimal choices for problems where they work.",
            },
            {
                name: "Backtracking",
                description: "Explore choices using subsets, permutations, and N-Queens.",
            },
            {
                name: "Dynamic Programming",
                description: "Learn memoization, tabulation, and state transitions.",
            },
            {
                name: "Bit Manipulation",
                description: "Practice bitwise operators, XOR, and bit-based tricks.",
            },
        ],
    },
];

const STORAGE_KEY = "dsaRoadmapCompleted";

function DSARoadmap() {
    const [completed, setCompleted] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    }, [completed]);

    const allTopics = roadmap.flatMap((phase) => phase.topics);
    const totalTopics = allTopics.length;
    const completedCount = completed.length;
    const progress = Math.round((completedCount / totalTopics) * 100);

    const toggleTopic = (name) => {
        setCompleted((previous) =>
            previous.includes(name)
                ? previous.filter((item) => item !== name)
                : [...previous, name]
        );
    };

    const resetProgress = () => {
        if (completedCount === 0) return;

        if (window.confirm("Reset all DSA roadmap progress?")) {
            setCompleted([]);
        }
    };

    return (
        <main className="roadmap-page">
            <div className="roadmap-container">
                <header className="roadmap-header">
                    <div className="roadmap-title-group">
                        <div className="roadmap-logo" aria-hidden="true">
                            {"</>"}
                        </div>

                        <div>
                            <p className="roadmap-eyebrow">
                                YOUR LEARNING JOURNEY
                            </p>
                            <h1>DSA Roadmap</h1>
                            <p className="roadmap-subtitle">
                                Go from fundamentals to interview-ready problem
                                solving, one topic at a time.
                            </p>
                        </div>
                    </div>

                    <span className="roadmap-status">
                        <span /> Beginner friendly
                    </span>
                </header>

                <section className="roadmap-hero">
                    <div className="roadmap-hero-content">
                        <span className="roadmap-pill">
                            <span>✦</span> LEARN · PRACTICE · IMPROVE
                        </span>

                        <h2>
                            Your path to
                            <span> mastering DSA.</span>
                        </h2>

                        <p>
                            Follow the phases in order. Understand each
                            concept, solve practice problems, and mark topics
                            complete as you progress.
                        </p>
                    </div>

                    <div className="roadmap-hero-art" aria-hidden="true">
                        <div className="roadmap-orbit roadmap-orbit-one" />
                        <div className="roadmap-orbit roadmap-orbit-two" />
                        <div className="roadmap-orbit-center">DSA</div>
                        <span className="roadmap-float roadmap-float-one">
                            { "{ }" }
                        </span>
                        <span className="roadmap-float roadmap-float-two">
                            {"</>"}
                        </span>
                    </div>
                </section>

                <section className="roadmap-progress-panel">
                    <div className="roadmap-progress-top">
                        <div>
                            <p className="roadmap-eyebrow">YOUR PROGRESS</p>
                            <h3>Every topic counts.</h3>
                            <p className="roadmap-progress-description">
                                Keep practicing consistently to build strong
                                problem-solving skills.
                            </p>
                        </div>

                        <div className="roadmap-progress-circle">
                            <span>{progress}%</span>
                            <small>complete</small>
                        </div>
                    </div>

                    <div
                        className="roadmap-progress-track"
                        role="progressbar"
                        aria-label="DSA roadmap completion"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                    >
                        <div
                            className="roadmap-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="roadmap-progress-bottom">
                        <span>
                            <strong>{completedCount}</strong> of {totalTopics}{" "}
                            topics completed
                        </span>

                        <button
                            type="button"
                            className="roadmap-reset-button"
                            onClick={resetProgress}
                            disabled={completedCount === 0}
                        >
                            Reset progress
                        </button>
                    </div>
                </section>

                <div className="roadmap-section-heading">
                    <div>
                        <p className="roadmap-eyebrow">THE LEARNING PLAN</p>
                        <h2>Follow the roadmap</h2>
                    </div>
                    <span>{roadmap.length} learning phases</span>
                </div>

                <section className="roadmap-phases">
                    {roadmap.map((phase) => {
                        const phaseCompleted = phase.topics.filter((topic) =>
                            completed.includes(topic.name)
                        ).length;

                        const phaseDone =
                            phaseCompleted === phase.topics.length;

                        return (
                            <article
                                className="roadmap-phase"
                                key={phase.phase}
                            >
                                <div className="roadmap-phase-marker">
                                    <span>{phase.phase}</span>
                                </div>

                                <div className="roadmap-phase-card">
                                    <div className="roadmap-phase-header">
                                        <div>
                                            <div className="roadmap-phase-meta">
                                                <span>PHASE {phase.phase}</span>
                                                <span
                                                    className={
                                                        phaseDone
                                                            ? "roadmap-phase-done"
                                                            : "roadmap-phase-level"
                                                    }
                                                >
                                                    {phaseDone
                                                        ? "✓ Completed"
                                                        : phase.level}
                                                </span>
                                            </div>

                                            <h3>{phase.title}</h3>
                                            <p>{phase.subtitle}</p>
                                        </div>

                                        <div className="roadmap-phase-count">
                                            <strong>
                                                {phaseCompleted}/
                                                {phase.topics.length}
                                            </strong>
                                            <span>topics</span>
                                        </div>
                                    </div>

                                    <div className="roadmap-phase-progress">
                                        <div
                                            style={{
                                                width: `${
                                                    (phaseCompleted /
                                                        phase.topics.length) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>

                                    <div className="roadmap-topic-list">
                                        {phase.topics.map((topic) => {
                                            const isDone = completed.includes(
                                                topic.name
                                            );

                                            return (
                                                <label
                                                    className={`roadmap-topic ${
                                                        isDone
                                                            ? "roadmap-topic-complete"
                                                            : ""
                                                    }`}
                                                    key={topic.name}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isDone}
                                                        onChange={() =>
                                                            toggleTopic(
                                                                topic.name
                                                            )
                                                        }
                                                    />

                                                    <span className="roadmap-custom-check">
                                                        {isDone ? "✓" : ""}
                                                    </span>

                                                    <span className="roadmap-topic-copy">
                                                        <strong>
                                                            {topic.name}
                                                        </strong>
                                                        <span>
                                                            {topic.description}
                                                        </span>
                                                    </span>

                                                    <span className="roadmap-topic-status">
                                                        {isDone
                                                            ? "Done"
                                                            : "To do"}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <section className="roadmap-study-tip">
                    <div className="roadmap-tip-icon">✦</div>
                    <div>
                        <h3>A simple study strategy</h3>
                        <p>
                            Learn the concept, implement it yourself, solve
                            3–5 related problems, and revisit mistakes before
                            moving to the next topic. Focus on understanding
                            rather than rushing through the checklist.
                        </p>
                    </div>
                </section>

                <footer className="roadmap-footer">
                    <span>AI Coding Mentor</span>
                    <span>Small steps. Strong fundamentals. Better solutions.</span>
                </footer>
            </div>
        </main>
    );
}

export default DSARoadmap;
