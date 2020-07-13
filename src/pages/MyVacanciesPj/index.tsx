import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react';

import {
  Card,
  Grid,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { FormHandles } from '@unform/core';
import '../../styles/global';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Select, TextField } from 'unform-material-ui';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import getValidationsErros from '../../utils/getValidationsErrors';
import { Container, Content, AnimationContainer } from './styles';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import Input from '../../components/Input';
import '../../styles/global.css';

interface PropostaItem {
  descricao: string;
  idProposta: number;
  cidade:string;
}
interface VacancyFormData {
  idProposta: number;
  idEmpresa: number;
  descricao: string;
  cidade: string;
  tipoContrato: string;
  latitude: string;
  longitude: string;
}
interface CandidaturaItem {
  idProposta: number;
  idPessoa: number;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);
const MyVacanciesPj: React.FC = () => {
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
  const { user } = useAuth();
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);
  const [selectValue, setSelect] = useState<string>();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { addToast } = useToast();
  const history = useHistory();
  const [propostaEdit, setPropostaEdit] = useState<VacancyFormData>(
    {} as VacancyFormData,
  );
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleOpen = useCallback(
    async (idProposta: number) => {
      api.get(`/Proposta/${idProposta}`, config).then((res) => {
        const proposta: VacancyFormData = res.data[0];
        console.log(proposta);
        setPropostaEdit(proposta);
        setOpen(true);
      });
    },
    [config, setPropostaEdit],
  );

  // const handleOpen = (idProposta: number): void => {
  //   api.get(`/Proposta/${idProposta}`, config).then((res) => {
  //     const proposta: VacancyFormData = res.data;
  //     console.log(proposta);
  //     setPropostaEdit(proposta);
  //   });

  //   // setPropostaEdit([...propostaEdit]);
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeInput = (event: ChangeEvent<{ value: unknown }>): void => {
    setSelect(event.target.value as string);
  };

  useEffect(() => {
    // Carrega os dados do drop down
    api
      .get(`/Proposta/PropostasEmpresa/${user.idPessoa}`, config)
      .then((res) => {
        const proposta: PropostaItem[] = res.data;
        setPropostas(proposta);
      });
  }, [token, user.idPessoa]);

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

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` },
        // };

        const resCEP = await api.get(
          `/PessoaJuridica/${user.idPessoa}`,
          config,
        );
        const latLong = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${resCEP.data.idPessoaNavigation.endereco.cep}&key=AIzaSyDnMaMRTgy5jqKujNVs7xNpN_XSV-oAjYk`,
        );

        const vaga = {
          idProposta: data.idProposta,
          idEmpresa: data.idEmpresa,
          descricao: data.descricao,
          tipoContrato: data.tipoContrato,
          cidade: data.cidade,
          encerrada: false,
          latitude: latLong.data.results[0].geometry.location.lat,
          longitude: latLong.data.results[0].geometry.location.lng,
        };
        console.log(vaga);
        await api.put(`/Proposta`, vaga, config);

        addToast({
          type: 'success',
          title: 'Proposta Atualizada!',
          description: 'Sua proposta foi atualizada com sucesso',
        });
        setOpen(false);
        setPropostaEdit({} as VacancyFormData);

        api
          .get(`/Proposta/PropostasEmpresa/${user.idPessoa}`, config)
          .then((res) => {
            const proposta: PropostaItem[] = res.data;
            setPropostas(proposta);
          });
        // history.push('/myVacanciesPj');
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
    [addToast, config, user.idPessoa],
  );

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Container>
        <Content>
          <AnimationContainer style={{ textAlign: 'start' }}>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className={classes.root}
              initialData={propostaEdit}
            >
              <h1 style={{ textAlign: 'center', color: 'black' }}>
                Edite sua Proposta
              </h1>
              <Input name="idProposta" type="text" visivel={false} />
              <Input name="idEmpresa" type="text" visivel={false} />
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
                <TextField
                  name="cidade"
                  fullWidth
                  placeholder="Local da vaga"
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
              </FormControl>
              <Button className="custom-button_edit" type="submit">Atualizar</Button>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </div>
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
          <Grid container spacing={4}>
            {propostaRetorno.map((s) => (
              <Grid item xs={12} sm={4} key={s.idProposta}>
                <Card className="custom-card">
                  <div className="card-body">
                    <h5 className="card-title">Proposta</h5>
                    <br />
                    <h6 className="card-description">{s.descricao}</h6>
                    <br />
                    <h6 className="card-description" style={{fontWeight:"bold"}}>Local da vaga (Cidade)</h6>
                    <h6 className="card-description">{s.cidade}</h6>
                   
                  </div>
                  <div className="row">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <button
                          type="button"
                          onClick={() => handleOpen(s.idProposta)}
                          className="custom-button_edit"
                        >
                          Editar
                        </button>
                        {/* <Button className="custom-button_edit">Editar</Button> */}
                      </Grid>
                    </Grid>
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
export default MyVacanciesPj;
