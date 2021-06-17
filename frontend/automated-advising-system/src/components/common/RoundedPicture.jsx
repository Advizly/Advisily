import React from "react";

function RoundedPicture({ radius, ...props }) {
  const imageStyles = radius ? { width: radius, height: radius } : {};
  return (
    <div className="card-image-rounded">
      <img {...props} style={imageStyles} />;
    </div>
  );
}

export default RoundedPicture;
