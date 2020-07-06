import React, {
  useCallback,
  useRef,
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid';
import { FiMail, FiUser, FiLock, FiCamera } from 'react-icons/fi';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
} from '@material-ui/core';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErros from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/Toast';
import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/Auth';
import '../../styles/global.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface PerfilFormData {
  pfpj: string;
  name: string;
  rg: string;
  cpf: string;
  razaoSocial: string;
  nomeFantasia: string;
  ie: string;
  cnpj: string;
  email: string;
  password: string;
  passwordConfirm: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  uf: string;
  cidade: string;
  bairro: string;
  municipio: string;
  celular: string;
  idPessoa: string;
}

interface PerfilEditFormData {
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
    pessoaSkill: {};
    telefone: string;
    tipo: string;
  };
}

interface SkillItem {
  descricao: string;
  idSkill: number;
  idTipoSkill: number;
}

interface Skills {
  array: SkillItem[];
}

const Perfil: React.FC = () => {
  const { user } = useAuth();

  const token = localStorage.getItem('FaceIT:token');
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [skillRetorno, setSkills] = useState<SkillItem[]>([]);
  const [pfShow, setPfShow] = useState(true);
  const [
    // {
    //   pfpj,
    //   name,
    //   rg,
    //   cpf,
    //   razaoSocial,
    //   nomeFantasia,
    //   ie,
    //   cnpj,
    //   email,
    //   password,
    //   passwordConfirm,
    //   telefone,
    //   cep,
    //   logradouro,
    //   numero,
    //   complemento,
    //   uf,
    //   cidade,
    //   bairro,
    //   municipio,
    //   celular,
    // },
    userEdit,
    setUserEdit,
  ] = useState<PerfilFormData>({} as PerfilFormData);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/skill`).then((res) => {
      const skills: SkillItem[] = res.data;
      setSkills(skills);
    });
    const isPF = user.tipo === 'PF';
    setPfShow(isPF);
    const url = isPF ? '/PessoaFisica' : '/PessoaJuridica';
    api.get(`${url}/${user.idPessoa}`, config).then((res) => {
      const userProp: PerfilEditFormData = res.data;

      const userEditBanco: PerfilFormData = {
        pfpj: userProp.idPessoaNavigation.tipo,
        name: userProp.nome,
        rg: userProp.rg,
        cpf: userProp.cpf,
        razaoSocial: '',
        nomeFantasia: '',
        ie: '',
        cnpj: '',
        email: userProp.idPessoaNavigation.email,
        password: '',
        passwordConfirm: '',
        telefone: userProp.idPessoaNavigation.telefone,
        cep: userProp.idPessoaNavigation.endereco.cep,
        logradouro: userProp.idPessoaNavigation.endereco.logradouro,
        numero: userProp.idPessoaNavigation.endereco.numero,
        complemento: userProp.idPessoaNavigation.endereco.complemento,
        uf: userProp.idPessoaNavigation.endereco.uf,
        cidade: userProp.idPessoaNavigation.endereco.municipio,
        bairro: userProp.idPessoaNavigation.endereco.bairro,
        municipio: '',
        celular: userProp.idPessoaNavigation.celular,
        idPessoa: userProp.idPessoa,
      };

      setUserEdit(userEditBanco);
    });
  }, [token, user.tipo, user.idPessoa, setUserEdit]);

  const [userSkill, setSkillUser] = useState<string[]>(['C#', 'SQL Server']);
  const handleChangeInput = (event: ChangeEvent<{ value: unknown }>): void => {
    setSkillUser(event.target.value as string[]);
  };
  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        const varImagem = {
          idPessoa: user.idPessoa,
          nome: e.target.files[0].name,
          bytes: e.target.files[0],
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        api.post('/Imagem', varImagem, config).then(() => {
          addToast({ type: 'success', title: 'Avatar Atualizado' });
        });
      }
    },
    [addToast, user.idPessoa, token],
  );

  const handleSubmit = useCallback(
    async (data: PerfilFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PF',
            then: Yup.string().required('Nome obrigatório'),
          }),
          rg: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PF',
            then: Yup.string()
              .required('RG obrigatório')
              .min(9, 'RG Inválido. Corrija a quantidade de caracteres'),
          }),

          cpf: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PF',
            then: Yup.string()
              .required('CPF obrigatório')
              .min(11, 'CPF Invalido. Corrija a quantidade de caracteres'),
          }),

          razaoSocial: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PJ',
            then: Yup.string().required('Razão Social obrigatório'),
          }),
          nomeFantasia: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PJ',
            then: Yup.string().required('Nome Fantasia obrigatório'),
          }),
          cnpj: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PJ',
            then: Yup.string()
              .required('CNPJ obrigatório')
              .min(14, 'CNPJ Inválido. Corrija a quantidade de caracteres'),
          }),

          ie: Yup.string().when('pfpj', {
            is: (value) => value && value === 'PJ',
            then: Yup.string()
              .required('Inscrição Estadual obrigatória')
              .min(
                14,
                'Inscrição Estadual Invalido. Corrija a quantidade de caracteres',
              ),
          }),

          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
          passwordConfirm: Yup.string().min(6, 'No minimo 6 digitos'),
          telefone: Yup.string()
            .required('Telefone obrigatório')
            .min(10, 'Quantidade de caracteres inválida'),
          cep: Yup.string()
            .required('CEP obrigatório')
            .min(8, 'Quantidade de caracteres inválida'),
          logradouro: Yup.string().required('Logradouro obrigatório'),
          numero: Yup.string().required('Número obrigatório'),
          complemento: Yup.string().required('Complemento obrigatório'),
          uf: Yup.string().required('UF obrigatório').min(2, 'UF Inválido'),
          cidade: Yup.string().required('Cidade obrigatório'),
          bairro: Yup.string().required('Bairro obrigatório'),
          municipio: Yup.string().required('Município obrigatório'),
          celular: Yup.string()
            .required('Celular obrigatório')
            .min(11, 'Quantidade de caracteres inválida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        if (user.tipo === 'PF') {
          const pessoaFisica = {
            nome: data.name,
            cpf: data.cpf,
            rg: data.rg,
            idPessoa: data.idPessoa,
            idPessoaNavigation: {
              idPessoa: data.idPessoa,
              tipo: 'PF',
              email: data.email,
              senha: data.password,
              excluido: false,
              googleID: 0,
              celular: data.celular,
              telefone: data.telefone,
              role: 'user',
              endereco: {
                cep: data.cep,
                pais: 'Brasil',
                uf: data.uf,
                municipio: data.municipio,
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                idPessoa: data.idPessoa,
              },
              // "imagem": {
              //   "idPessoa": 0,
              //   "nome": "string",
              //   "bytes": "string"
              // },
            },
          };

          await api.put('/PessoaFisica', pessoaFisica, config);
        } else {
          const pessoaJuridica = {
            razaoSocial: data.razaoSocial,
            nomeFantasia: data.nomeFantasia,
            cnpj: data.cnpj,
            ie: data.ie,
            idPessoa: data.idPessoa,
            idPessoaNavigation: {
              idPessoa: data.idPessoa,
              tipo: 'PJ',
              email: data.email,
              senha: data.password,
              excluido: false,
              googleID: 0,
              celular: data.celular,
              telefone: data.telefone,
              role: 'user',
              endereco: {
                cep: data.cep,
                pais: 'Brasil',
                uf: data.uf,
                municipio: data.municipio,
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                idPessoa: data.idPessoa,
              },
              imagem: {
                idPessoa: data.idPessoa,
                nome: 'string',
                bytes: 'string',
              },
            },
          };
          await api.put('/PessoaJuridica', pessoaJuridica, config);
        }
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
          description: 'Você já pode fazer seu logon no FaceIT',
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
    [addToast, history, user],
  );

  return (
    <>
      <br />
      <br />
      <br />

      <Container>
        <Content>
          <span>
            Para atualizar as informações preencha abaixo e e clique em salvar
          </span>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={userEdit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <AvatarInput>
                  <img
                    src="https://avatars3.githubusercontent.com/u/271936?s=460&u=8f17648ac23b3b7ceda9d0aafe1f492d937e3648&v=4"
                    alt="Face It"
                  />
                  <label htmlFor="avatar">
                    <FiCamera />
                    <input
                      type="file"
                      id="avatar"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </AvatarInput>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Input name="pfpj" icon={FiUser} type="text" visivel={false} />
                <Input
                  name="idPessoa"
                  icon={FiUser}
                  type="text"
                  visivel={false}
                />
                {pfShow && (
                  <>
                    <Input
                      name="name"
                      icon={FiUser}
                      type="text"
                      placeholder="Nome"
                    />

                    <Input
                      name="rg"
                      icon={FiUser}
                      type="text"
                      placeholder="RG"
                      maxLength={12}
                      tamanho={50}
                      // value={rg}
                    />
                    <Input
                      name="cpf"
                      icon={FiUser}
                      type="text"
                      placeholder="cpf"
                      tamanho={50}
                      maxLength={14}
                      // value={cpf}
                    />
                  </>
                )}

                {!pfShow && (
                  <>
                    <Input
                      name="razaoSocial"
                      icon={FiUser}
                      type="text"
                      placeholder="Razão Social"
                    />
                    <Input
                      name="nomeFantasia"
                      icon={FiUser}
                      type="text"
                      placeholder="Nome Fantasia"
                      maxLength={50}
                    />
                    <Input
                      name="ie"
                      icon={FiUser}
                      type="text"
                      maxLength={50}
                      tamanho={50}
                      placeholder="Inscrlção Estadual"
                    />
                    <Input
                      name="cnpj"
                      icon={FiUser}
                      type="text"
                      placeholder="CNPJ"
                      tamanho={50}
                      maxLength={14}
                    />
                  </>
                )}
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
                  // value={email}
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Password"
                  tamanho={50}
                  maxLength={20}
                />
                <Input
                  name="password_confirm"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirmar Senha"
                  tamanho={50}
                  maxLength={20}
                />
                <Input
                  name="telefone"
                  icon={FiLock}
                  type="text"
                  placeholder="Telefone"
                  tamanho={50}
                  maxLength={10}
                  // value={telefone}
                />
                <Input
                  name="celular"
                  icon={FiUser}
                  type="text"
                  placeholder="Celular"
                  tamanho={50}
                  maxLength={11}
                  // value={celular}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Input
                  name="cep"
                  icon={FiUser}
                  type="text"
                  placeholder="CEP"
                  maxLength={8}
                  // value={cep}
                />

                <Input
                  name="logradouro"
                  icon={FiUser}
                  type="text"
                  placeholder="Logradouro"
                  // value={logradouro}
                />
                <Input
                  name="numero"
                  icon={FiUser}
                  type="text"
                  placeholder="Número"
                  tamanho={50}
                  maxLength={8}
                  // value={numero}
                />
                <Input
                  name="complemento"
                  icon={FiUser}
                  type="text"
                  placeholder="Complemento"
                  tamanho={50}
                  maxLength={50}
                  // value={complemento}
                />
                <Input
                  name="uf"
                  icon={FiUser}
                  type="text"
                  placeholder="UF"
                  tamanho={50}
                  maxLength={2}
                  // value={uf}
                />
                <Input
                  name="cidade"
                  icon={FiUser}
                  type="text"
                  placeholder="Cidade"
                  tamanho={50}
                  // value={municipio}
                />
                <Input
                  name="bairro"
                  icon={FiUser}
                  type="text"
                  placeholder="bairro"
                  tamanho={50}
                  // value={bairro}
                />
                <Input
                  name="municipio"
                  icon={FiUser}
                  type="text"
                  placeholder="Município"
                  tamanho={50}
                  // value={cep}
                />
              </Grid>
              <Grid item xs={12} sm={2} />
              <Grid item xs={12} sm={10}>
                <FormControl>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Skills
                  </InputLabel>
                  <Select
                    className="select-multi"
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    variant="outlined"
                    value={userSkill}
                    onChange={handleChangeInput}
                    // input={<Input />}
                    MenuProps={MenuProps}
                    renderValue={(s) => (s as string[]).join(', ')}
                  >
                    {skillRetorno.map((s) => (
                      <MenuItem key={s?.idSkill} value={s?.descricao}>
                        <Checkbox
                          checked={userSkill.indexOf(s.descricao) > -1}
                        />
                        <ListItemText primary={s?.descricao} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button type="submit" tamanho={25}>
              Atualizar
            </Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Perfil;
