import React from 'react';
import { Grid } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import { Container, Content, AnimationContainer, Map } from './styles';
import MyMarker from './MyMarker';

const points = [
  { id: 1, title: 'Round Pond', lat: 51.506, lng: -0.184 },
  { id: 2, title: 'The Long Water', lat: 51.508, lng: -0.175 },
  { id: 3, title: 'The Serpentine', lat: 51.505, lng: -0.164 },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <Grid container spacing={3}>
              <h3>Dashboard</h3>
            </Grid>
          </AnimationContainer>
        </Content>
      </Container>
      <Map>
        maps
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDnMaMRTgy5jqKujNVs7xNpN_XSV-oAjYk',
            language: 'en',
            region: 'US',
          }}
          defaultCenter={{ lat: 51.506, lng: -0.169 }}
          defaultZoom={15}
        >
          {points.map(({ lat, lng, id, title }) => {
            return (
              <MyMarker
                key={id}
                lat={lat}
                lng={lng}
                text={id}
                tooltip={title}
              />
            );
          })}
        </GoogleMapReact>
      </Map>
    </>
  );
};
export default Dashboard;
