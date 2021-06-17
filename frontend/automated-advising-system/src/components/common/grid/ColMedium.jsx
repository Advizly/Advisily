import React from "react";

function ColMedium({ numOfCols, children, className = "", ...props }) {
  numOfCols =
    !numOfCols || numOfCols > 12 || numOfCols < 0 ? "" : "-" + numOfCols;

  className = className + " col-md" + numOfCols;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default ColMedium;
