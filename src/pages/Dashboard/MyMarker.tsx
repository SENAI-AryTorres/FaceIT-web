import React from 'react';

interface Marker {
  lat: number;
  lng: number;
  key: number;
  text: number;
  tooltip: string;
}

const MyMarker = ({ text, tooltip }: Marker) => (
  <div className="circle">
    <span className="circleText" title={tooltip}>
      {text}
    </span>
  </div>
);

export default MyMarker;
