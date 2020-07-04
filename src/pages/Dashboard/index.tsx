import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

interface PropostaItem {
  descricao: string;
  idProposta: string;
}

const Dashboard: React.FC = () => {
  const token = useAuth();
  const [propostaRetorno, setPropostas] = useState<PropostaItem[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // Carrega os dados do drop down
    api.get(`/proposta`, config).then((res) => {
      const proposta: PropostaItem[] = res.data;
      setPropostas(proposta);
    });
  }, [token]);

  // useEffect(() => {
  //   (async () => {
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` }
  //     };
  //    const proposta = await api.get(`/proposta`,config);
  //    setPropostas(proposta.data);
  //   })();
  //  }, []);

  return (
    <div>
      {propostaRetorno.map((s) => (
        <li key={s.idProposta}>{s.descricao}</li>
      ))}
    </div>
  );
};
export default Dashboard;
