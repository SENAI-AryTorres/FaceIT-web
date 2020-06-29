import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Text, Content, AnimationContainer } from './styles';

const Faq: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1 style={{ color: 'white', textAlign: 'center' }}>
            Perguntas Frequentes
          </h1>
          <br />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Text>Como Funciona?</Text>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                O FaceIT é uma plataforma que uma empresa ou pessoa física pode
                utilizar para benefício próprio. É um lugar onde você pode ser
                empregado ou contratar alguém para sua empresa.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Text>Qual a Intenção do App?</Text>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                O principal objetivo é facilitar o contato entre as empresas e
                os interessados, para que assim seja mais fácil o fechamento de
                projetos ou oportunidades.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Text>O app tem mais alguma funcionalidade?</Text>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Por ser a primeira versão, o app foca nessa possibilidade do
                contato entre empresas e pessoas, mas em versões futuras,
                pretendemos possibilitar o contato entre pessoas, permitir o
                vínculo com outros sistemas (github e linkedin), além de
                permitir a elaboração de grupos de estudo e uma comunidade para
                sanar dúvidas e/ou disponibilizar cursos.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Faq;
