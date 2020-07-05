import React, { useCallback, useRef, useState } from 'react';
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

// interface GetCepItem{
//   cep:string;
//   logradouro:string;
//   complemento:string;
//   bairro:string;
//   localidade:string;
//   uf:string;

// }
interface SignUpFormData {
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
  password_confirm: string;
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
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [value, setValue] = useState('PF');
  const [pfShow, setPfShow] = useState(true);
  const [[logradouro, bairro, cidade, municipio, uf], setCep] = useState([
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleBlueCep = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valor = (event.target as HTMLInputElement).value;
      axios.get(`https://viacep.com.br/ws/${valor}/json/`).then((res) => {
        setCep([
          res.data.logradouro,
          res.data.bairro,
          res.data.localidade,
          res.data.unidade,
          res.data.uf,
        ]);
      });
    },
    [setCep],
  );

  const { addToast } = useToast();

  const histoy = useHistory();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valor = (event.target as HTMLInputElement).value;
      setValue(valor);
      if (valor === 'PF') {
        setPfShow(true);
      } else {
        setPfShow(false);
      }
    },
    [setPfShow],
  );

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          rg: Yup.string()
            .required('RG obrigatório')
            .min(9, 'RG Inválido. Corrija a quantidade de caracteres'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .min(11, 'CPF Invalido. Corrija a quantidade de caracteres'),

          razaoSocial: Yup.string().required('Razão Social é obrigatório'),
          nomeFantasia: Yup.string().required('Nome Fantasia é obrigatório'),

          cnpj: Yup.string()
            .required('CNPJ obrigatório')
            .min(13, 'CNPJ Invalido. Corrija a quantidade de caracteres'),

          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
          passwordconfirm: Yup.string().min(6, 'No minimo 6 digitos'),
          telefone: Yup.string()
            .required('Telefone obrigatório')
            .min(8, 'Quantidade de caracteres inválida'),
          cep: Yup.string()
            .required('CEP obrigatório')
            .min(10, 'Quantidade de caracteres inválida'),
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
            razaoSocial: data.razaoSocial,
            nomeFantasia: data.nomeFantasia,
            cnpj: data.cnpj,
            ie: data.ie,
            idPessoa: 0,
            idPessoaNavigation: {
              idPessoa: 0,
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

        // history.push('/');
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
    [addToast, value],
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
                  name="telefone"
                  icon={FiLock}
                  type="text"
                  placeholder="Telefone"
                  tamanho={50}
                  maxLength={11}
                />
                <Input
                  name="celular"
                  icon={FiUser}
                  type="text"
                  placeholder="Celular"
                  tamanho={50}
                  maxLength={11}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="cep"
                  icon={FiUser}
                  type="text"
                  placeholder="CEP"
                  onBlur={(e) => handleBlueCep(e)}
                />

                <Input
                  name="logradouro"
                  icon={FiUser}
                  type="text"
                  placeholder="Logradouro"
                  value={logradouro}
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
                  value={uf}
                />
                <Input
                  name="cidade"
                  icon={FiUser}
                  type="text"
                  placeholder="Cidade"
                  tamanho={50}
                  value={cidade}
                />
                <Input
                  name="bairro"
                  icon={FiUser}
                  type="text"
                  placeholder="bairro"
                  tamanho={50}
                  value={bairro}
                />
                <Input
                  name="municipio"
                  icon={FiUser}
                  type="text"
                  placeholder="Município"
                  tamanho={50}
                  // value={municipio}
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
