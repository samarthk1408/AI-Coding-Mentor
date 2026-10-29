
import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            alert("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/auth/login",
                {
                    email,
                    password
                }
            );

            if (response.data === "Login successful") {
                localStorage.setItem("userEmail", email);
                window.location.href = "/";
            } else {
                alert(response.data || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(
                error.response?.data || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-shell">
                <section className="auth-visual">
                    <a href="/" className="auth-brand">
                        <span className="brand-mark">{"</>"}</span>
                        <span>AI Coding Mentor</span>
                    </a>

                    <div className="visual-content">
                        <span className="eyebrow">
                            YOUR PERSONAL CODING COMPANION
                        </span>

                        <h1>
                            Think smarter.
                            <br />
                            <span>Code better.</span>
                        </h1>

                        <p>
                            Build your problem-solving skills, explore
                            programming concepts, and prepare for your
                            next coding challenge.
                        </p>

                        <div className="code-card">
                            <div className="code-card-header">
                                <div className="window-dots">
                                    <i />
                                    <i />
                                    <i />
                                </div>
                                <span>your_next_step.java</span>
                            </div>

                            <pre>
                                <code>
                                    <span className="code-purple">public class</span>{" "}
                                    <span className="code-blue">Growth</span>{" "}
                                    {"{\n"}
                                    {"  "}
                                    <span className="code-purple">public static void</span>{" "}
                                    main() {"{\n"}
                                    {"    "}
                                    <span className="code-blue">learn</span>
                                    {"();\n"}
                                    {"    "}
                                    <span className="code-green">keepBuilding</span>
                                    {"();\n"}
                                    {"  }\n"}
                                    {"}"}
                                </code>
                            </pre>

                            <div className="code-card-footer">
                                <span>● Ready to learn</span>
                                <span>Java</span>
                            </div>
                        </div>
                    </div>

                    <p className="visual-footer">
                        Learn at your pace. Improve every day.
                    </p>
                </section>

                <section className="auth-form-panel">
                    <div className="mobile-brand">
                        <span className="brand-mark">{"</>"}</span>
                        <span>AI Coding Mentor</span>
                    </div>

                    <form className="auth-form" onSubmit={loginUser}>
                        <span className="form-eyebrow">WELCOME BACK</span>

                        <h2>Sign in to your account</h2>

                        <p className="form-description">
                            Continue your coding journey right where you left off.
                        </p>

                        <label htmlFor="login-email">Email address</label>
                        <input
                            id="login-email"
                            type="email"
                            className="auth-input"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="password-label-row">
                            <label htmlFor="login-password">Password</label>
                        </div>

                        <div className="password-wrapper">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                            {!loading && <span aria-hidden="true">→</span>}
                        </button>

                        <p className="auth-switch">
                            New to AI Coding Mentor?{" "}
                            <a href="/register">Create an account</a>
                        </p>

                        <p className="auth-security">
                            Your coding journey starts here.
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Login;
