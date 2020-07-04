import React, { useCallback, useRef, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErros from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/Toast';
import { Container, Content, AnimationContainer, Background } from './styles';

interface GetCepItem {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
interface SignUpFormData {
  pfpj: string;
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
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [value, setValue] = useState('PF');
  const [viaCep, setCep] = useState<GetCepItem[]>([]);
  const [[name, sobrenome, RG, CPF], setPFPJ] = useState([
    'Nome',
    'Sobrenome',
    'RG',
    'CPF',
  ]);

  // useEffect(() => {
  //   // Carrega os dados do drop down
  //   axios.get(`https://viacep.com.br/ws/04835330/json/`)
  //   .then((res) => {
  //      console.log(res.data);

  //   });
  // }, []);

  const { addToast } = useToast();

  const history = useHistory();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valor = (event.target as HTMLInputElement).value;
      setValue(valor);
      if (valor === 'PF') {
        setPFPJ(['Nome', 'Sobrenome', 'RG', 'CPF']);
      } else {
        setPFPJ([
          'Razão Social',
          'Nome Fantasia',
          'Inscrição Estadual',
          'CNPJ',
        ]);
      }
    },
    [setValue],
  );

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
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
          passwordconfirm: Yup.string().min(6, 'No minimo 6 digitos'),
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

        if (value === 'PF') {
          const pessoaFisica = {
            nome: data.name,
            cpf: data.cpf,
            rg: data.rg,
            idPessoa: 0,
            idPessoaNavigation: {
              idPessoa: 0,
              tipo: 'PF',
              email: data.email,
              senha: data.password,
              excluido: false,
              googleID: 0,
              celular: data.dddCelular + data.celular,
              telefone: data.ddd + data.telefone,
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
                idPessoa: 0,
              },
              // "imagem": {
              //   "idPessoa": 0,
              //   "nome": "string",
              //   "bytes": "string"
              // },
            },
          };

          await api.post('/PessoaFisica', pessoaFisica);
        } else {
          const pessoaJuridica = {
            razaoSocial: data.name,
            nomeFantasia: data.sobrenome,
            cnpj: data.cpf,
            ie: data.rg,
            idPessoa: 0,
            idPessoaNavigation: {
              idPessoa: 0,
              tipo: 'PJ',
              email: data.email,
              senha: data.password,
              excluido: false,
              googleID: 0,
              celular: data.dddCelular + data.celular,
              telefone: data.ddd + data.telefone,
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
                idPessoa: 0,
              },
              imagem: {
                idPessoa: 0,
                nome: 'string',
                bytes: 'string',
              },
            },
          };
          await api.post('/PessoaJuridica', pessoaJuridica);
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
    [addToast, history, value],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <RadioGroup
                  row
                  aria-label="PFPJ"
                  name="pfpj"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="PF"
                    control={<Radio />}
                    label="Pessoa Física"
                  />
                  <FormControlLabel
                    value="PJ"
                    control={<Radio />}
                    label="Pessoa Juridica"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder={name}
                />
                <Input
                  name="sobrenome"
                  icon={FiUser}
                  type="text"
                  placeholder={sobrenome}
                  maxLength={50}
                />
                <Input
                  name="rg"
                  icon={FiUser}
                  type="text"
                  placeholder={RG}
                  maxLength={12}
                  tamanho={50}
                />
                <Input
                  name="cpf"
                  icon={FiUser}
                  type="text"
                  placeholder={CPF}
                  tamanho={50}
                  maxLength={14}
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
                  name="passwordconfirm"
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
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>

            <Button type="submit" tamanho={50}>
              Cadastrar
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

export default SignUp;
