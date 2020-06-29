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
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

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
  name: string;
  sobrenome: string;
  rg: string;
  cpf: string;
  email: string;
  password: string;
  password_confirm: string;
  ddd: number;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  uf: string;
  cidade: string;
  bairro: string;
  municipio: string;
  dddCelular: string;
  celular: string;
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
  const classes = useStyles();
  const theme = useTheme();
  const { user, token } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [skillRetorno, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    // Carrega os dados do drop down
    api.get(`/skill`).then((res) => {
      const skills: SkillItem[] = res.data;
      setSkills(skills);
      // this.setState({ skills });
    });
  }, []);

  const [userSkill, setSkillUser] = useState<string[]>(['C#', 'SQL Server']);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSkillUser(event.target.value as string[]);
  };

  const handleChangeMultiple = (event: ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSkillUser(value);
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
        console.log(e.target.files[0]);
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

        await api.post('/users', data);
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
      <Container>
        <Content>
          <strong>
            {skillRetorno.map((s) => (
              <li key={s?.idSkill}>{s?.descricao}</li>
            ))}
            Dados Pessoais
          </strong>
          <span>
            Para atualizar as informações preenche abaixoe e clique em salvar
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
                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder={user.tipo === 'PF' ? 'Nome' : 'Razão Social'}
                />

                <Input
                  name="sobrenome"
                  icon={FiUser}
                  type="text"
                  placeholder={
                    user.tipo === 'PF' ? 'Sobrenome' : 'Nome Fantasia'
                  }
                  maxLength={80}
                />
                <Input
                  name="rg"
                  icon={FiUser}
                  type="text"
                  placeholder={user.tipo === 'PF' ? 'RG' : 'CNPJ'}
                  maxLength={user.tipo === 'PF' ? 9 : 14}
                  tamanho={50}
                />
                <Input
                  name="cpf"
                  icon={FiUser}
                  type="text"
                  placeholder={
                    user.tipo === 'PF' ? 'CPF' : 'Inscrição Estadual'
                  }
                  maxLength={user.tipo === 'PF' ? 11 : 14}
                  tamanho={50}
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
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
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Input name="cep" icon={FiUser} type="text" placeholder="CEP" />
                <Input
                  name="logradouro"
                  icon={FiUser}
                  type="text"
                  placeholder="Logradouro"
                />
                <Input
                  name="numero"
                  icon={FiUser}
                  type="text"
                  placeholder="Número"
                  tamanho={50}
                  maxLength={8}
                />
                <Input
                  name="complemento"
                  icon={FiUser}
                  type="text"
                  placeholder="Complemento"
                  tamanho={50}
                  maxLength={50}
                />
                <Input
                  name="uf"
                  icon={FiUser}
                  type="text"
                  placeholder="UF"
                  tamanho={50}
                  maxLength={2}
                />
                <Input
                  name="cidade"
                  icon={FiUser}
                  type="text"
                  placeholder="Cidade"
                  tamanho={50}
                />
                <Input
                  name="bairro"
                  icon={FiUser}
                  type="text"
                  placeholder="bairro"
                  tamanho={50}
                />
                <Input
                  name="municipio"
                  icon={FiUser}
                  type="text"
                  placeholder="Município"
                  tamanho={50}
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
                />

                <FormControl>
                  <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={userSkill}
                    onChange={handleChange}
                    input={<InputMaterialCore />}
                    renderValue={(selected) =>
                      (selected as string[]).join(', ')}
                    MenuProps={MenuProps}
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
