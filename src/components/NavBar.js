import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import history from '../history';

const useStyles = makeStyles((theme) => ({
icon: {
    marginRight: theme.spacing(2),
},
}));

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
    }

export default function NavBar() {
const classes = useStyles();

return (
    <React.Fragment>
    <CssBaseline />
    <AppBar position="relative">
        <Toolbar>
        <HomeIcon onClick= {() =>(history.push('/'))} className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
            Artistes
        </Typography>
        {localStorage.getItem('user') && (
            <div>
                <Button color="inherit" href="/">Accueil</Button>
                <Button color="inherit" href="/artiste/add">Ajouter un artiste</Button>
                <Button color="inherit" href="/listAuteurFetched">Liste des auteurs</Button>
                <Button color="inherit" href="/listeFemmesFetched">Importer des données</Button>
                <Button color="inherit" onClick={() => { localStorage.removeItem('user'); history.push('/'); } }>Se déconnecter</Button>
            </div>
        )}
        {!localStorage.getItem('user') && (
                <div>
                <Button color="inherit" href="/">Accueil</Button>
                <Button color="inherit" href="/register">S'enregistrer</Button>
                <Button color="inherit" href="/login">Login</Button>

                </div>
            )}
        </Toolbar>
    </AppBar>
    </React.Fragment>
);
}
