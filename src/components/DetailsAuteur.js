import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sparqlConnect, setQueryURL } from 'sparql-connect';

setQueryURL('https://query.wikidata.org/sparql')
//setQueryURL('https://sandbox.bordercloud.com/sparql')
const resource = document.location.pathname.substr(15);
const queryBuilder = `
PREFIX wdt:<http://www.wikidata.org/prop/direct/>
PREFIX wd:<http://www.wikidata.org/entity/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX bd: <http://www.bigdata.com/rdf#>
SELECT DISTINCT ?item ?itemLabel
WHERE {
?item wdt:P31/wdt:P279* wd:Q47461344. #instance de oeuvre ecrite et ses sous classes
?item wdt:P50 wd:${resource}. #Identifiant Auteur (Geneviève Dormann)
SERVICE wikibase:label {bd:serviceParam wikibase:language "fr, en". }
}
`

const connector = sparqlConnect(queryBuilder, {
    queryName: 'results2',
    //singleResult: true
    })

const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(3),
            textAlign: 'left',
            color: theme.palette.text.secondary
        },
        avatar: {
            margin: 10,
            backgroundColor: theme.palette.grey['200'],
            color: theme.palette.text.primary,
        },
        avatarContainer: {
            [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(4)
            }
        },
        itemContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
            }
        },
        baseline: {
            alignSelf: 'baseline',
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: 0
            }
        },
        inline: {
            display: 'inline-block',
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
            marginLeft: 0
            }
        },
        inlineRight: {
            width: '30%',
            textAlign: 'right',
            marginLeft: 50,
            alignSelf: 'flex-end',
            [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
            textAlign: 'center'
            }
        },
        backButton: {
            marginRight: theme.spacing(2)
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        primary: {
            marginRight: theme.spacing(2)
        },
        secondary: {
            background: theme.palette.secondary['100'],
            color: 'white'
        },
        spaceTop: {
            marginTop: 20
        }
    }));

function DetailsAuteur({ results2 }) {
    const classes = useStyles();
    const { id } = useParams();
return (
<React.Fragment>
<CssBaseline />
<main>
    <Container className={classes.cardGrid} maxWidth="md">
    <Grid container spacing={4}>
        {results2.map(({ item, itemLabel }) => (
<div className={classes.root}>
    <Paper className={classes.paper}>
    <div className={classes.itemContainer}>
        <div className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>
            <DescriptionIcon />
        </Avatar>
        </div>
        <div className={classes.baseline}>

        <div className={classes.inline}>
            <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
            Titre de l'oeuvre
            </Typography>
            <Typography variant="h4" gutterBottom>
            {itemLabel}
            </Typography>
        </div>
            <br/>
            <br/>
        </div>
        <div className={classes.inlineRight}>
        <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
            Lien wikidata
        </Typography>
        <Typography variant="h6" gutterBottom>
            {item}
        </Typography>

        </div>
    </div>
    </Paper>
</div>
))}
</Grid>
</Container>
</main>
</React.Fragment>
)
}
export default connector(DetailsAuteur,{
loading: () => <span>
                    <Container>
                    <Grid container direction="row" justify="end" alignItems="end">
                    <CircularProgress />
                    <br/>Le chargement est en cours
                    </Grid>
                    </Container>
                </span>,
error: () => <span>
                <Container>
                <Grid container direction="row" justify="end" alignItems="end">
                <WarningIcon />
                <br/>Erreur lors du chargement des données wikidata
                </Grid>
                </Container>
            </span>,
    });
