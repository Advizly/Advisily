import React from "react";

function Card({ children, extraClasses, ...props }) {
  return (
    <div className={"card " + extraClasses} {...props}>
      {children}
    </div>
  );
}

export default Card;
