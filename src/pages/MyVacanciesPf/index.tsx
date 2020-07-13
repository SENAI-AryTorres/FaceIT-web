import React,{useState, useEffect} from 'react';
import { Card, Grid} from '@material-ui/core';
import api from '../../services/api';
import { Container, Content, AnimationContainer } from './styles';
// import api from '../../services/api';
// import { useToast } from '../../hooks/Toast';
 import { useAuth } from '../../hooks/Auth';

interface PropostaItem {
  descricao: string;
  idProposta: string;
  tipoContrato: string;
}


const MyVacanciesPf: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
   const { user } = useAuth();



  useEffect(() =>{
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

     api.get(`/Candidato/Propostas/${user.idPessoa}`,config).then((res)=>{
       const propostas = res.data;
       setPropostas(propostas);
     })
  })
 

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
                       <h5>Tipo de Contrato</h5>
                       <h5>{s.tipoContrato}</h5>
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
export default MyVacanciesPf;
