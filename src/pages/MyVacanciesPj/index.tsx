import React, { useState,useEffect} from 'react';
import { Card, Grid, Button } from '@material-ui/core';
import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import '../../styles/global';

interface PropostaItem {
  descricao: string;
  idProposta: string;
}

interface CandidaturaItem {
  idProposta: number;
  idPessoa: number;
}

const MyVacanciesPj: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
  const { user } = useAuth();

  
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/Proposta/PropostasEmpresa/${user.idPessoa}`,config).then((res) => {
      const proposta: PropostaItem[] = res.data;
      setPropostas(proposta);
    });
  }, [token]);



  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Grid container spacing={4}>
            {propostaRetorno.map((s) => (
              <Grid item xs={12} sm={4} key={s.idProposta}>
                <Card className="custom-card">
                  <div className="card-body">
                    <h5 className="card-title">Proposta</h5>
                    <br />
                    <h6 className="card-description">{s.descricao}</h6>
                    <br />
                  </div>
                  <div className="row">
                   <Grid container spacing={2}> 
                      <Grid item xs={12} sm={12}>  
                        <Button className="custom-button_edit">Editar</Button>
                      </Grid>
                    </Grid>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default MyVacanciesPj;
