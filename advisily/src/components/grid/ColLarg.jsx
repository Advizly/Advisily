import React from "react";

function ColLarg({ numOfCols, children, className = "", ...props }) {
  numOfCols =
    !numOfCols || numOfCols > 12 || numOfCols < 0 ? "" : "-" + numOfCols;

  className = className + " col-lg" + numOfCols;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default ColLarg;
