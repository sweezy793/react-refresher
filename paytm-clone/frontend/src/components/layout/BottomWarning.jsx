import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ text, link, to }) => {
  return (
    <div>
      <p>
        {text}{" "}
        <Link to={to} className="underline font-medium">
          {link}
        </Link>{" "}
      </p>
    </div>
  );
};

export default BottomWarning;
