import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Select from '@material-ui/core/Select';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import Button from '../../components/Button';
import getValidationsErros from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/Toast';
import { Container, Content, AnimationContainer, Text } from './styles';

interface VacancyFormData {
  descricao: string;
  tipoContrato: string;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Vacancy: React.FC = () => {
  const classes = useStyles();
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
        console.log('werw');
        await schema.validate(data, {
          abortEarly: false,
        });
        const vaga = {
          descricao: data.descricao,
          tipoContrato: data.tipoContrato,
        };
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
    [addToast],
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

            {/* <label
              htmlFor="tipoContrato"
              htmlFor="tipoContrato"
              style={{ color: 'white', textAlign: 'start', paddingLeft: '5px' }}
            >
              Tipo de Contrato
            </label> */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
                style={{
                  background: '#232129',
                  color: 'white',
                  borderRadius: '5px',
                  textAlign: 'start',
                  padding: '5px',
                }}
              >
                Tipo de Contrato
              </InputLabel>
              <Select
                id="tipoContrato"
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
                <MenuItem value="" selected disabled>
                  --Selecione--
                </MenuItem>
                <MenuItem value="pf">Pessoa Física</MenuItem>
                <MenuItem value="pj">Pessoa Jurídica</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Vacancy;
