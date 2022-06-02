//components/NotFound.jsx
import { Link } from "react-router-dom";
import './notFound.css';

  const NotFound = () => {
    return (
        <div className="NotFound">
            <p>
                <h1>404: Page not found.</h1>
                <Link to="/">
                    Go Home
                </Link>
            </p>
        </div>
    );
}

export default NotFound;