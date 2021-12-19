import React from "react";
import PropTypes from 'prop-types';

const Marker = ({ show, place }) => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 12,
    width: 12,
    backgroundColor: show ? "red" : "blue",
    cursor: "pointer",
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {/* {show && <InfoWindow place={place} />} */}
    </>
  );
};
export default Marker;
