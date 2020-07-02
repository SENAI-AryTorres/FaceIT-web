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
  const token = localStorage.getItem('FaceIT:token');
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);
 
  useEffect(() => {
    const config = {
             headers: { Authorization: `Bearer ${token}` }
           };
    // Carrega os dados do drop down
    api.get(`/proposta`,config)
    .then((res) => {
      const proposta:PropostaItem[] = res.data;
       setPropostas(proposta);
    });
  }, []);

    return(
      <div>
      {propostaRetorno.map((s)=>(
        <Card key={s.idProposta}>
          {s.descricao}
        </Card>
      ))}
       
      </div>
     
    );
}
export default Dashboard;