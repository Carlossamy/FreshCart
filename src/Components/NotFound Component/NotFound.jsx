import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container mt-40 mb-40 p-1 flex flex-col items-center justify-center">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="home-button">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
