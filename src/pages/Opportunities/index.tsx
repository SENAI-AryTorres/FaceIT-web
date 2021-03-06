import React, { useState, useEffect, useCallback } from 'react';
import { Card, Grid, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

interface PropostaItem {
  descricao: string;
  idProposta: string;
  cidade:string
}



const Opportunities: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
  const { addToast } = useToast();
  const { user } = useAuth();

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

  const handleClick = useCallback(
    async (idProposta: string) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const candidatura = {
        idProposta,
        idPessoa: user.idPessoa,
      };

      api.post(`/Candidato`, candidatura, config);
      addToast({
        type: 'success',
        title: 'Sua Candidatura Foi Realizada!',
        description: 'Agora é só esperar o contato da empresa. Boa Sorte!',
      });
    },

    [token],
  );

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
                    <h6 className="card-description" style={{fontWeight:"bold"}}>Local da Vaga (Cidade)</h6>
                    <h6 className="card-description">{s.cidade}</h6>
                    <br />
                  </div>
                  <Button
                    onClick={() => handleClick(s.idProposta)}
                    variant="contained"
                    type="submit"
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
export default Opportunities;
