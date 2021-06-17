import React from "react";

function CardBody({ title, subtitle, children }) {
  return (
    <div className="card-body">
      <h3 className="card-title"> {title}</h3>
      <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
      <p className="card-text">{children}</p>
    </div>
  );
}

export default CardBody;
