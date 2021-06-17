import React from "react";

function RoundedPicture({ radius, alt, ...props }) {
  const imageStyles = radius ? { width: radius, height: radius } : {};
  return (
    <div className="card-image-rounded">
      <img {...props} style={imageStyles} alt={alt} />;
    </div>
  );
}

export default RoundedPicture;
