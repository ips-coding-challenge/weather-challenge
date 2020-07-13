import React from "react";

const BlockVisibility = ({ weather }) => {
  return (
    <div className="block block-visibility">
      <h4>Visibility</h4>
      <p>
        {Math.ceil(weather.visibility)}
        <span>Miles</span>
      </p>
    </div>
  );
};

export default BlockVisibility;
