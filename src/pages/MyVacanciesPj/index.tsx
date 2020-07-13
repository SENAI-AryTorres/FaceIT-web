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
  cidade: string;
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

interface Candidato {
  name: string;
  rg: string;
  cpf: string;
  email: string;
  password: string;
  passwordConfirm: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  uf: string;
  bairro: string;
  municipio: string;
  celular: string;
  idPessoa: string;
  pessoaSkill: string;
}

interface CandidatoResp {
  cpf: string;
  idPessoa: string;
  nome: string;
  sobrenome: string;
  rg: string;
  idPessoaNavigation: {
    candidato: {};
    celular: string;
    email: string;
    endereco: {
      bairro: string;
      cep: string;
      complemento: string;
      idPessoa: string;
      logradouro: string;
      municipio: string;
      numero: string;
      pais: string;
      uf: string;
    };
    pessoaSkill: string;
    telefone: string;
    tipo: string;
  };
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
    paper2: {
      position: 'absolute',
      width: 600,
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
  const [openList, setOpenList] = React.useState(false);
  const { addToast } = useToast();
  const history = useHistory();
  const [propostaEdit, setPropostaEdit] = useState<VacancyFormData>(
    {} as VacancyFormData,
  );
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  const [descricaoVaga, setDescricao] = useState<string>();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleOpenList = useCallback(
    async (idProposta: number, descricao: string) => {
      api.get(`/Candidato/${idProposta}`, config).then((resList) => {
        const list: CandidaturaItem[] = resList.data;
        console.log(list);
        setDescricao(descricao);
        list.map((s: CandidaturaItem) => {
          api.get(`/PessoaFisica/${s.idPessoa}`, config).then((res) => {
            const userProp: CandidatoResp = res.data;

            const userEditBanco: Candidato = {
              name: userProp.nome,
              rg: userProp.rg,
              cpf: userProp.cpf,
              email: userProp.idPessoaNavigation.email,
              password: '',
              passwordConfirm: '',
              telefone: userProp.idPessoaNavigation.telefone,
              cep: userProp.idPessoaNavigation.endereco.cep,
              logradouro: userProp.idPessoaNavigation.endereco.logradouro,
              numero: userProp.idPessoaNavigation.endereco.numero,
              complemento: userProp.idPessoaNavigation.endereco.complemento,
              uf: userProp.idPessoaNavigation.endereco.uf,
              bairro: userProp.idPessoaNavigation.endereco.bairro,
              municipio: userProp.idPessoaNavigation.endereco.municipio,
              celular: userProp.idPessoaNavigation.celular,
              idPessoa: userProp.idPessoa,
              pessoaSkill: userProp.idPessoaNavigation.pessoaSkill,
            };

            setCandidatos([...candidatos, userEditBanco]);
          });
        });
        setOpenList(true);
      });
    },
    [candidatos, config, setCandidatos],
  );
  const handleListClose = () => {
    setOpenList(false);
  };

  const handleOpen = useCallback(
    async (idProposta: number) => {
      api.get(`/Proposta/${idProposta}`, config).then((res) => {
        const proposta: VacancyFormData = res.data[0];
        setPropostaEdit(proposta);
        setOpen(true);
      });
    },
    [config, setPropostaEdit],
  );
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeInput = (event: ChangeEvent<{ value: unknown }>): void => {
    setSelect(event.target.value as string);
  };

  useEffect(() => {
    api
      .get(`/Proposta/PropostasEmpresa/${user.idPessoa}`, config)
      .then((res) => {
        const proposta: PropostaItem[] = res.data;
        setPropostas(proposta);
      });
  }, [config, token, user.idPessoa]);

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
              <Button className="custom-button_edit" type="submit">
                Atualizar
              </Button>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </div>
  );
  const bodyList = (
    <div style={modalStyle} className={classes.paper2}>
      <h1>Candidatos para a vaga</h1>
      <h3>
        <span>Descrição:</span>
        {descricaoVaga}
      </h3>
      {candidatos.map((s) => (
        <div className="candContent">
          <div className="candContentImage">
            <img
              src="https://avatars3.githubusercontent.com/u/271936?s=460&u=8f17648ac23b3b7ceda9d0aafe1f492d937e3648&v=4"
              alt="Face It"
            />
          </div>
          <div className="candDesc">
            <div>
              <div className="cand1">
                <b>Nome:</b>
                {s.name}
              </div>
              <div className="cand2">
                <b>Email:</b>
                {s.email}
              </div>
            </div>
            <div>
              <div className="cand1">
                <b>CPF:</b>
                {s.cpf}
              </div>
              <div className="cand2">
                <b>RG:</b>
                {s.rg}
              </div>
            </div>
            <div>
              <div className="cand1">
                <b>Endereço</b>:{s.logradouro},{s.numero} - {s.complemento}
              </div>
              <div className="cand1">
                <b>Bairro:</b>
                {s.bairro}{' '}
              </div>
              <div className="cand2">
                <b>UF:</b>
                {s.uf}
              </div>
            </div>
            <div />
          </div>
        </div>
      ))}
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
          <Modal
            open={openList}
            onClose={handleListClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyList}
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
                    <h6
                      className="card-description"
                      style={{ fontWeight: 'bold' }}
                    >
                      Local da vaga (Cidade)
                    </h6>
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
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenList(s.idProposta, s.descricao)}
                          className="custom-button_edit_list"
                        >
                          Ver Candidatos
                        </button>
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
