import React from 'react';
import {Container,Content,AnimationContainer} from './styles';
import {Pie} from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

const data = {
	labels: [
    'Javascript',
    'Java', 
    'Python',
    'PHP',
    'C#',
    'C++'
	],
	datasets: [{
		data: [25,20,20,15,10,10],
        backgroundColor:[
          'rgba(255,99,132)',
          'rgba(54,162,235)',
          'rgba(255,206,86)',
          'rgba(75,192,192)',
          'rgba(153,102,255)',
          'rgba(255,159,64)',
          
        ],
	}]
};
const Ranking: React.FC = () =>{
  return(
    <Container>
      <Content>
        <AnimationContainer> 
        <Grid container>
          <Grid item xs={12} sm={12}>
              <h4 style={{alignItems:'center', color:'white'}}>Linguagens de Programação (%)</h4>
               <div style={{width: '100%'}}>
                 <Pie data={data} width={600}  height={300} options={{ maintainAspectRatio: false }}/>
               </div>
         </Grid>
        </Grid>
      </AnimationContainer>
      </Content>
    </Container>

  );
}

export default Ranking;