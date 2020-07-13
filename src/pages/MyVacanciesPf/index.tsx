import React from 'react';
import { Card, Grid} from '@material-ui/core';

import { Container, Content, AnimationContainer } from './styles';
// import api from '../../services/api';
// import { useToast } from '../../hooks/Toast';
// import { useAuth } from '../../hooks/Auth';

interface PropostaItem {
  descricao: string;
  idProposta: string;
}


const MyVacanciesPf: React.FC = () => {
  // const token = localStorage.getItem('FaceIT:token');
  // const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
  // const { addToast } = useToast();
  // const { user } = useAuth();

  
 

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Grid container spacing={3}>
           
              <Grid item xs={12} sm={4}>
                <Card className="custom-card">
                  <div className="card-body">
                    <h5 className="card-title">Proposta</h5>
                    <br />
                    
                  </div>
                 
                </Card>
              </Grid>
        
          </Grid>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default MyVacanciesPf;
