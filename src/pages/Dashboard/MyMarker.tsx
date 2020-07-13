import React from 'react';
import { Button, Paper } from '@material-ui/core';

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
      <Paper>
        <Button>Cadastre-se</Button>
      </Paper>
    </span>
  </div>
);

export default MyMarker;
