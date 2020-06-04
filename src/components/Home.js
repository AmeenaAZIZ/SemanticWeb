import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history';

const useStyles = makeStyles((theme) => ({
heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
},
heroButtons: {
    marginTop: theme.spacing(4),
},
}));

export default function Home() {
const classes = useStyles();

return (
    <React.Fragment>
    <CssBaseline />
    <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Bienvenue sur notre site
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Vous pouvez choisir entre femmes et hommes artistes
            </Typography>
            <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item>
                <Button onClick= {() =>(history.push('/ListeFemmes'))} variant="contained" color="primary">
                    Femmes Artistes
                </Button>
                </Grid>
                <Grid item>
                <Button onClick= {() =>(history.push('/ListeHommes'))} variant="outlined" color="primary">
                    Hommes Artistes
                </Button>
                </Grid>
            </Grid>
            </div>
        </Container>
        </div>
    </main>
    </React.Fragment>
);
}