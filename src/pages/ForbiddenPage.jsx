import React from "react";
import { Link } from "react-router-dom";
import "../styles/ForbiddenPage.css";

const ForbiddenPage = () => {
  return (
    <div className="forbidden-page-container">
      <div className="forbidden-content">
        <h1 className="forbidden-heading">Access Forbidden</h1>
        <p className="forbidden-text">
          Oops! You are not authorized to access this page.
        </p>
        <Link to="/" className="forbidden-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
