import React, {
  useCallback,
  useRef,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import axios from 'axios';
import { Select, TextField } from 'unform-material-ui';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MenuItem, InputLabel, FormControl } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Content, AnimationContainer } from './styles';
import { useToast } from '../../hooks/Toast';
import getValidationsErros from '../../utils/getValidationsErrors';
import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);
interface VacancyFormData {
  descricao: string;
  tipoContrato: string;
  latitude: string;
  longitude: string;
}

const Vacancy: React.FC = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('FaceIT:token');
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [selectValue, setSelect] = useState<string>();

  const handleChangeInput = (event: ChangeEvent<{ value: unknown }>): void => {
    setSelect(event.target.value as string);
  };

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

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const resCEP = await api.get(
          `/PessoaJuridica/${user.idPessoa}`,
          config,
        );
        const latLong = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${resCEP.data.idPessoaNavigation.endereco.cep}&key=AIzaSyDnMaMRTgy5jqKujNVs7xNpN_XSV-oAjYk`,
        );

        const vaga = {
          idProposta: 0,
          idEmpresa: user.idPessoa,
          descricao: data.descricao,
          tipoContrato: data.tipoContrato,
          cidade: 'São Paulo',
          encerrada: false,
          latitude: latLong.data.results[0].geometry.location.lat,
          longitude: latLong.data.results[0].geometry.location.lng,
        };

        await api.post(`/Proposta`, vaga, config);

        addToast({
          type: 'success',
          title: 'Proposta Cadastrada!',
          description: 'Sua proposta foi cadastrada com sucesso',
        });

        history.push('/dashboard');
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
    [addToast, history, token, user.idPessoa],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer style={{ textAlign: 'start' }}>
          <Form ref={formRef} onSubmit={handleSubmit} className={classes.root}>
            <h1 style={{ textAlign: 'center', color: 'white' }}>
              Cadastre sua Proposta
            </h1>
            <TextField
              multiline
              // maxLength={300}
              rows={4}
              name="descricao"
              fullWidth
              placeholder="Descrição da vaga"
              style={{
                background: '#232129',
                color: '#ffffff',
                borderRadius: '5px',
                textAlign: 'start',
                padding: '5px',
                marginRight: '10px !important',
                marginLeft: '0px',
              }}
            />

            {/* <label
              htmlFor="tipoContrato"
              htmlFor="tipoContrato"
              style={{ color: 'white', textAlign: 'start', paddingLeft: '5px' }}
            >
              Tipo de Contrato
            </label> */}
            <FormControl>
              <InputLabel
                shrink
                id="filled-multiline-static"
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
                value={selectValue || ''}
                onChange={handleChangeInput}
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
