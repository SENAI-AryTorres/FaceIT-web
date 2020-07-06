import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/api';

interface PropostaItem {
  descricao: string;
  idProposta: string;
}

const Dashboard: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/proposta`, config).then((res) => {
      const proposta: PropostaItem[] = res.data;
      setPropostas(proposta);
    });
  }, [token]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Grid container spacing={3}>
            <h3>Dashboard</h3>
            </Grid>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Dashboard;
