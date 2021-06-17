import React from "react";

function Card({ children, ...props }) {
  return (
    <div className="card " {...props}>
      {children}
    </div>
  );
}

export default Card;
