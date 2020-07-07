import React from 'react';
import { Grid } from '@material-ui/core';
import { Container, Content, AnimationContainer } from './styles';



const Dashboard: React.FC = () => {
 

  
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
