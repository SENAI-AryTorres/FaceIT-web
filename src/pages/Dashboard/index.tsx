import React,{useState,useEffect} from 'react';
import { Container } from './styles';
import api from '../../services/api'
import { Card } from '@material-ui/core';
import {AuthProvider, useAuth} from '../../hooks/Auth'
import { config } from 'process';
import { render } from '@testing-library/react';

interface PropostaItem {
  descricao: string;
  idProposta:string;

}


const Dashboard: React.FC = () =>{
  const token = useAuth();
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
 
  useEffect(() => {
    // Carrega os dados do drop down
    api.get(`/proposta`,config)
    .then((res) => {
      const proposta:PropostaItem[] = res.data;
       setPropostas(proposta);
    });
  }, []);



  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
 


    return(
      <div>
      {propostaRetorno.map((s)=>{
        <li key={s.idProposta}>
          {s.descricao}
        </li>
      })}
       
      </div>
     
    );
}
export default Dashboard;