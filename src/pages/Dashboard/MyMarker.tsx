import React, { useCallback } from 'react';
import { Button, Paper } from '@material-ui/core';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

interface Marker {
  lat: number;
  lng: number;
  key: number;
  text: number;
  tooltip: string;
  idProposta: number;
}
// { text, tooltip, idProposta }: Marker
const MyMarker: React.FC<Marker> = ({ text, tooltip, idProposta }) => {
  const token = localStorage.getItem('FaceIT:token');
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleMapClick = useCallback(
    async (idProp: number) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const candidatura = {
        idProposta: idProp,
        idPessoa: user.idPessoa,
      };

      api.post(`/Candidato`, candidatura, config);
      addToast({
        type: 'success',
        title: 'Sua Candidatura Foi Realizada!',
        description: 'Agora é só esperar o contato da empresa. Boa Sorte!',
      });
    },

    [addToast, token, user.idPessoa],
  );

  return (
    <div className="circle">
      <span className="circleText" title={tooltip}>
        {text}
        <Paper>
          <Button
            onClick={(): void => {
              handleMapClick(idProposta);
            }}
          >
            Cadastre-se
          </Button>
        </Paper>
      </span>
    </div>
  );
};

export default MyMarker;
