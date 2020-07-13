import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import { Container, Content, AnimationContainer } from './styles';
import MyMarker from './MyMarker';
import api from '../../services/api';

const points = [
  { id: 1, title: 'Round Pond', lat: 51.506, lng: -0.184 },
  { id: 2, title: 'The Long Water', lat: 51.508, lng: -0.175 },
  { id: 3, title: 'The Serpentine', lat: 51.505, lng: -0.164 },
];

interface MarkerItem {
  idProposta: number;
  latitude: number;
  longitude: number;
  descricao: string;
}

const Dashboard: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [marker, setMarkers] = useState<MarkerItem[]>([]);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/Proposta`, config).then((res) => {
      const marca: MarkerItem[] = res.data;
      setMarkers(marca);
    });
  }, [token]);

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <GoogleMapReact
                  style={{ width: '100%', height: '50%' }}
                  bootstrapURLKeys={{
                    key: 'AIzaSyDnMaMRTgy5jqKujNVs7xNpN_XSV-oAjYk',
                    language: 'PT-BR',
                    region: 'BR',
                  }}
                  defaultCenter={{ lat: -23.5489, lng: -46.6388 }}
                  defaultZoom={14}
                >
                  {marker.map(
                    ({ latitude, longitude, idProposta, descricao }) => {
                      return (
                        <MyMarker
                          key={idProposta}
                          lat={latitude}
                          lng={longitude}
                          tooltip={descricao}
                          text={idProposta}
                          idProposta={idProposta}
                        />
                      );
                    },
                  )}
                </GoogleMapReact>
              </Grid>
            </Grid>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
