import React from "react";

function CardBody({ title, subtitle, children }) {
  return (
    <div className="card-body">
      <h4 className="card-title text-center fw-bold"> {title}</h4>
      <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
      <p className="card-text">{children}</p>
    </div>
  );
}

export default CardBody;
