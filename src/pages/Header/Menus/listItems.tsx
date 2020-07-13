import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BallotIcon from '@material-ui/icons/Ballot';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/opportunities">
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Oportunidades" />
    </ListItem>
    <ListItem button component={Link} to="/myVacanciesPf">
      <ListItemIcon>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="Minhas Candidaturas" />
    </ListItem>
    <ListItem button component={Link} to="/ranking">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Ranking" />
    </ListItem>
    <ListItem button component={Link} to="/profile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Meu Perfil" />
    </ListItem>
    <ListItem button component={Link} to="/faq">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="FAQ" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
   
    <ListItem button component={Link} to="/vacancy">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Criar Proposta" />
    </ListItem>
    <ListItem button component={Link} to="/profile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Meu Perfil" />
    </ListItem>
    <ListItem button component={Link} to="/myVacanciesPj">
      <ListItemIcon>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="Propostas Criadas" />
    </ListItem>
    <ListItem button component={Link} to="/ranking">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Ranking" />
    </ListItem>
    <ListItem button component={Link} to="/faq">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="FAQ" />
    </ListItem>
  </div>
);
