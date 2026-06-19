function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    AI Coding Mentor
                </a>

                <div className="navbar-nav ms-auto">
                    <a className="nav-link" href="#">
                        Dashboard
                    </a>

                    <a className="nav-link" href="#">
                        Problems
                    </a>

                    <a className="nav-link" href="#">
                        Progress
                    </a>

                    <a className="nav-link" href="#">
                        AI Assistant
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;