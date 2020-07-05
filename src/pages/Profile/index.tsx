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
  Input as InputMaterialCore,
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
  const { user, token } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [skillRetorno, setSkills] = useState<SkillItem[]>([]);
  const [userProps, setUserProps] = useState<PerfilFormData | undefined>();
  const [pfShow, setPfShow] = useState(true);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/skill`).then((res) => {
      const skills: SkillItem[] = res.data;
      setSkills(skills);
    });

    const url = user.tipo === 'PF' ? '/PessoaFisica' : '/PessoaJuridica';
    api.get(`${url}/${user.idPessoa}`, config).then((res) => {
      const userProp: PerfilFormData = res.data;

      setUserProps(userProp);
    });
  }, [token, user.tipo, user.idPessoa]);

  const [userSkill, setSkillUser] = useState<string[]>(['C#', 'SQL Server']);

  const handleChange = (event: ChangeEvent<{ value: unknown }>): void => {
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
          name: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
          razaoSocial: Yup.string().required('Nome obrigatório'),
          nomeFantasia: Yup.string().required('Nome obrigatório'),
          cnpj: Yup.string()
            .required('CNPJ obrigatório')
            .min(14, 'CNPJ Inválido. Corrija a quantidade de caracteres'),
          inscricaoEstadual: Yup.string()
            .required('Inscrição Estadual obrigatória')
            .min(
              14,
              'Inscrição Estadual Invalido. Corrija a quantidade de caracteres',
            ),
          rg: Yup.string()
            .required('RG obrigatório')
            .min(9, 'RG Inválido. Corrija a quantidade de caracteres'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .min(11, 'CPF Invalido. Corrija a quantidade de caracteres'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
          passwordConfirm: Yup.string().min(6, 'No minimo 6 digitos'),
          ddd: Yup.string()
            .required('DDD do Telefone obrigatório')
            .min(2, 'Informe ao menos dois números'),
          telefone: Yup.string()
            .required('Telefone obrigatório')
            .min(8, 'Quantidade de caracteres inválida'),
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
          dddCelular: Yup.string()
            .required('DDD do Celular obrigatório')
            .min(2, 'DDD incorreto'),
          celular: Yup.string()
            .required('Celular obrigatório')
            .min(9, 'Quantidade de caracteres inválida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        // if (user.tipo === 'PF') {
        //   const pessoaFisica = {
        //     nome: data.name,
        //     cpf: data.cpf,
        //     rg: data.rg,
        //     idPessoa: 0,
        //     idPessoaNavigation: {
        //       idPessoa: 0,
        //       tipo: 'PF',
        //       email: data.email,
        //       senha: data.password,
        //       excluido: false,
        //       googleID: 0,
        //       celular: data.dddCelular + data.celular,
        //       telefone: data.ddd + data.telefone,
        //       role: 'user',
        //       endereco: {
        //         cep: data.cep,
        //         pais: 'Brasil',
        //         uf: data.uf,
        //         municipio: data.municipio,
        //         logradouro: data.logradouro,
        //         numero: data.numero,
        //         complemento: data.complemento,
        //         bairro: data.bairro,
        //         idPessoa: 0,
        //       },
        //       // "imagem": {
        //       //   "idPessoa": 0,
        //       //   "nome": "string",
        //       //   "bytes": "string"
        //       // },
        //     },
        //   };

        //   await api.post('/PessoaFisica', pessoaFisica);
        // } else {
        //   const pessoaJuridica = {
        //     razaoSocial: data.name,
        //     nomeFantasia: data.sobrenome,
        //     cnpj: data.cpf,
        //     ie: data.rg,
        //     idPessoa: 0,
        //     idPessoaNavigation: {
        //       idPessoa: 0,
        //       tipo: 'PJ',
        //       email: data.email,
        //       senha: data.password,
        //       excluido: false,
        //       googleID: 0,
        //       celular: data.dddCelular + data.celular,
        //       telefone: data.ddd + data.telefone,
        //       role: 'user',
        //       endereco: {
        //         cep: data.cep,
        //         pais: 'Brasil',
        //         uf: data.uf,
        //         municipio: data.municipio,
        //         logradouro: data.logradouro,
        //         numero: data.numero,
        //         complemento: data.complemento,
        //         bairro: data.bairro,
        //         idPessoa: 0,
        //       },
        //       imagem: {
        //         idPessoa: 0,
        //         nome: 'string',
        //         bytes: 'string',
        //       },
        //     },
        //   };
        //   await api.post('/PessoaJuridica', pessoaJuridica);
        // }
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
    [addToast, history],
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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
                    />
                    <Input
                      name="cpf"
                      icon={FiUser}
                      type="text"
                      placeholder="cpf"
                      tamanho={50}
                      maxLength={14}
                    />
                  </>
                )}
                {!pfShow && (
                  <>
                    <Input
                      name="razaosocial"
                      icon={FiUser}
                      type="text"
                      placeholder="Razão Social"
                    />
                    <Input
                      name="nomefantasia"
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
                  value={userProps?.idPessoaNavigation.email}
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
                  name="ddd"
                  type="text"
                  maxLength={3}
                  placeholder="DDD"
                  tamanho={30}
                />
                <Input
                  name="telefone"
                  icon={FiLock}
                  type="text"
                  placeholder="Telefone"
                  tamanho={70}
                  maxLength={8}
                  value={userProps?.idPessoaNavigation.telefone}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Input
                  name="cep"
                  icon={FiUser}
                  type="text"
                  placeholder="CEP"
                  maxLength={8}
                  value={userProps?.idPessoaNavigation.endereco.cep}
                />

                <Input
                  name="logradouro"
                  icon={FiUser}
                  type="text"
                  placeholder="Logradouro"
                  value={userProps?.idPessoaNavigation.endereco.logradouro}
                />
                <Input
                  name="numero"
                  icon={FiUser}
                  type="text"
                  placeholder="Número"
                  tamanho={50}
                  maxLength={8}
                  value={userProps?.idPessoaNavigation.endereco.numero}
                />
                <Input
                  name="complemento"
                  icon={FiUser}
                  type="text"
                  placeholder="Complemento"
                  tamanho={50}
                  maxLength={50}
                  value={userProps?.idPessoaNavigation.endereco.complemento}
                />
                <Input
                  name="uf"
                  icon={FiUser}
                  type="text"
                  placeholder="UF"
                  tamanho={50}
                  maxLength={2}
                  value={userProps?.idPessoaNavigation.endereco.uf}
                />
                <Input
                  name="cidade"
                  icon={FiUser}
                  type="text"
                  placeholder="Cidade"
                  tamanho={50}
                  value={userProps?.idPessoaNavigation.endereco.municipio}
                />
                <Input
                  name="bairro"
                  icon={FiUser}
                  type="text"
                  placeholder="bairro"
                  tamanho={50}
                  value={userProps?.idPessoaNavigation.endereco.bairro}
                />
                <Input
                  name="municipio"
                  icon={FiUser}
                  type="text"
                  placeholder="Município"
                  tamanho={50}
                  value={userProps?.idPessoaNavigation.endereco.cep}
                />
                <Input
                  name="dddCelular"
                  type="text"
                  placeholder="DDD "
                  tamanho={30}
                  maxLength={3}
                />
                <Input
                  name="celular"
                  icon={FiUser}
                  type="text"
                  placeholder="Celular"
                  tamanho={70}
                  maxLength={9}
                  value={userProps?.idPessoaNavigation.celular}
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
                    onChange={handleChange}
                    input={<InputMaterialCore />}
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
