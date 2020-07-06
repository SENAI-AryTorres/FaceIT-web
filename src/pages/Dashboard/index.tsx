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
            {propostaRetorno.map((s) => (
              <Grid item xs={12} sm={4} key={s.idProposta}>
                <Card className="custom-card">
                  <div className="card-body">
                    <h5 className="card-title">Proposta</h5>
                    <br />
                    <h6 className="card-description">{s.descricao}</h6>
                    <br />
                  </div>
                  <Button
                    variant="contained"
                    className="custom-button"
                    endIcon={<Icon>send</Icon>}
                  >
                    Candidatar-se
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Dashboard;
