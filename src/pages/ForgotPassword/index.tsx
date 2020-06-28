import React, { useCallback, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErros from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/Toast';
import { Container, Content, AnimationContainer, Background } from './styles';

interface ForgotPasswordFormData {
  email: string;

}
const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data:ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
    
        const email = {
           email: data.email
        }
        await api.post('/RecuperarSenha', data.email);

        history.push('/');
        addToast({
          type: 'success',
          title: 'Email Enviado!',
          description: 'Um email com uma nova senha foi enviado para o endereço selecionado!',
        });
      
      } 
      
      catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="FaceIT" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            
            <br/>
            <Grid container spacing={2}>
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  style={{display:'inline-block', position:'relative'}}
                  placeholder="E-mail"
                 
                />
            </Grid>
            <br/>
            <Button type="submit" tamanho={80}>
              Enviar Email
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
