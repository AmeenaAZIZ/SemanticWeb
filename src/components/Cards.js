import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { sparqlConnect, setQueryURL } from 'sparql-connect';
import history from '../history';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';


setQueryURL('https://query.wikidata.org/sparql')
const query = `
PREFIX wdt:<http://www.wikidata.org/prop/direct/>
PREFIX wd:<http://www.wikidata.org/entity/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX bd: <http://www.bigdata.com/rdf#>
SELECT DISTINCT ?women ?womenLabel
WHERE
{
    ?women wdt:P31 wd:Q5 .
    ?women wdt:P21 wd:Q6581072 .
    ?women wdt:P106/wdt:P279* wd:Q483501 . # artists
    SERVICE wikibase:label {bd:serviceParam wikibase:language "fr,en" }
}
LIMIT 500
`
const connector = sparqlConnect(query, {
    queryName: 'results',
    })

const useStyles = makeStyles((theme) => ({
cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
},
card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
},
cardMedia: {
    paddingTop: '56.25%', // 16:9
},
cardContent: {
    flexGrow: 1,
},
btnAjouter: {
    'margin-bottom': theme.spacing(3),
},
margin: {
    position: 'fixed',
    bottom: '1%',
    right: '1%',
    'z-index': '9999',
},
}));

function Cards({ results }) {
const classes = useStyles();

return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container direction="row" justify="end" alignItems="end">
            <Button href="/mission/add" className={classes.btnAjouter} variant="contained" size="medium" color="primary">
            Ajouter une femme artiste
            </Button>
        </Grid>
        <Grid container spacing={4}>
            {results.map(({ women, womenLabel }) => (
            <Grid item key={womenLabel} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="/assets/arts.jpg"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    { women }
                    </Typography>
                    <Typography>
                    {womenLabel}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    Regarder les Oeuvres
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </main>
    <Fab onClick= {() =>(history.push('/artiste/add'))} color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
    </Fab>
    </React.Fragment>
);
}
export default connector(Cards,{
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