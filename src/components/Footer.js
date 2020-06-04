import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

function Copyright() {
return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="#">
        ESGI
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
);
}

const useStyles = makeStyles((theme) => ({
footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
},
}));


export default function Footer() {
const classes = useStyles();

return (
    <React.Fragment>
    <CssBaseline />
    {/* Footer */}
    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
        WIKIDATA INFOS
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Ce site est concu dans le cadre d'un projet d'études.
        </Typography>
        <Copyright />
    </footer>
    {/* End footer */}
    </React.Fragment>
);
}