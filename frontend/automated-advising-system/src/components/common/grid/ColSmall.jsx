import React from "react";

function ColSmall({ numOfCols, children, className, ...props }) {
  numOfCols =
    !numOfCols || numOfCols > 12 || numOfCols < 0 ? "" : "-" + numOfCols;

  className = className + " col-sm" + numOfCols;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default ColSmall;
