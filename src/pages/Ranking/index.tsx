import React from 'react';
import { Pie } from 'react-chartjs-2';

import { Container, Content, AnimationContainer } from './styles';

const data = {
  labels: ['Javascript', 'Java', 'Python', 'PHP', 'C#', 'C++'],
  datasets: [
    {
      data: [25, 20, 20, 15, 10, 10],
      backgroundColor: [
        'rgba(255,99,132)',
        'rgba(54,162,235)',
        'rgba(255,206,86)',
        'rgba(75,192,192)',
        'rgba(153,102,255)',
        'rgba(255,159,64)',
      ],
    },
  ],
};
const Ranking: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h4 style={{ alignItems: 'center', color: 'white' }}>
            Linguagens de Programação (%)
          </h4>
          <div style={{ width: '100%' }}>
            <Pie
              data={data}
              width={600}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Ranking;
