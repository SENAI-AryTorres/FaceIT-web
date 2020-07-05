import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Select from '@material-ui/core/Select';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/Button';
import getValidationsErros from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/Toast';
import { Container, Content, AnimationContainer, Text } from './styles';

interface VacancyFormData {
  descricao: string;
  tipoContrato: string;
}
const Vacancy: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: VacancyFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          descricao: Yup.string().required('Sobrenome obrigatório'),
          tipoContrato: Yup.string().required('Tipo de Contrato obrigatório'),
          // rg: Yup.string().required('RG obrigatório').min(9, 'RG Inválido. Corrija a quantidade de caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const vaga ={
          descricao: data.descricao,
          tipoContrato: data.tipoContrato
          
        }
        await api.post(`/Proposta`, vaga);

       
        addToast({
          type: 'success',
          title: 'Proposta Cadastrada!',
          description: 'Sua proposta foi cadastrada com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer style={{ textAlign: 'start' }}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center', color: 'white' }}>
              Cadastre sua Proposta
            </h1>
            <Text
              maxLength={300}
              rows={4}
              name="descricao"
              placeholder="Descrição da vaga"
            />

            <label
              htmlFor="select-contract"
              style={{ color: 'white', textAlign: 'start', paddingLeft: '5px' }}
            >
              Tipo de Contrato
            </label>
            <Select
              id="select-contract"
              name="tipoContrato"
              style={{
                width: '98%',
                background: '#232129',
                color: 'white',
                borderRadius: '5px',
                textAlign: 'start',
                padding: '5px',
              }}
            >
              <option value="" selected disabled >Tipo de Contrato:</option>
              <option value="pf">Pessoa Física</option>
              <option value="pj">Pessoa Jurídica</option>
            </Select>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Vacancy;
