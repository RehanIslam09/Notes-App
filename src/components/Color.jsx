import React from 'react';

const Color = ({ color }) => {
  const changeColor = () => {
    console.log(color);
  };

  return (
    <div
      className="color"
      onClick={changeColor}
      style={{ background: color.colorHeader }}
    ></div>
  );
};

export default Color;
