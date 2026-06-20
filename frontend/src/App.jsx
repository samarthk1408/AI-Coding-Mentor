import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import ProblemDetails from "./pages/ProblemDetails";
import AIMentor from "./pages/AIMentor";
import Practice from "./pages/Practice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";

function App() {

    const isLoggedIn =
        localStorage.getItem("userEmail");

    const logout = () => {

        localStorage.removeItem(
            "userEmail"
        );

        window.location.href = "/login";
    };

    return (

        <BrowserRouter>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

                <div className="container">

                    <Link
                        className="navbar-brand fw-bold"
                        to="/"
                    >
                        AI Coding Mentor
                    </Link>

                    <div className="navbar-nav ms-auto">

                        {isLoggedIn ? (
                            <>
                                <Link
                                    className="nav-link"
                                    to="/"
                                >
                                    Home
                                </Link>

                                <Link
                                    className="nav-link"
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    className="nav-link"
                                    to="/ai"
                                >
                                    AI Mentor
                                </Link>

                                <Link
                                    className="nav-link"
                                    to="/practice"
                                >
                                    Practice
                                </Link>
                                <Link
                                    className="nav-link"
                                    to="/interview"
                                >
                                    Interview
                                </Link>

                                <button
                                    className="btn btn-danger ms-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="nav-link"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={
                        isLoggedIn
                            ? <Home />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/problems/:id"
                    element={
                        isLoggedIn
                            ? <ProblemDetails />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/ai"
                    element={
                        isLoggedIn
                            ? <AIMentor />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/practice"
                    element={
                        isLoggedIn
                            ? <Practice />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/interview"
                    element={
                        isLoggedIn
                            ? <Interview />
                            : <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;