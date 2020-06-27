import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/Auth';
import { Container, Sidebar, SidebarAvatar } from './styles';

const MenuLateral: React.FC = () => {
  const { user } = useAuth();
  const items = [
    {
      name: 'Dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      pagina: '/profile',
    },
    { name: 'CV', label: 'CV', icon: 'assignment_ind', pagina: '/profile' },
    {
      name: 'Vagas',
      label: 'Vagas',
      icon: 'find_in_page',
      pagina: '/profile',
    },
    {
      name: 'Perfil',
      label: 'Pefil',
      icon: 'account_box',
      pagina: '/profile',
    },
  ];
  return user ? (
    <Container>
      <SidebarAvatar>
        <img src="https://avatars3.githubusercontent.com/u/271936?s=460&u=8f17648ac23b3b7ceda9d0aafe1f492d937e3648&v=4" />
        <div>
          <strong>Felipe Ayancan</strong>
          <p>Socio Diretor</p>
        </div>
      </SidebarAvatar>
      <Sidebar>
        <List disablePadding dense>
          {items.map(({ label, name, icon, pagina, ...rest }) => (
            <ListItem key={name} button {...rest} component={Link} to={pagina}>
              <Icon style={{ fontSize: 16 }}>{icon}</Icon>
              <ListItemText>{label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Sidebar>
    </Container>
  ) : null;
};

export default MenuLateral;
