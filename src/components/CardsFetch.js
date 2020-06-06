import React from 'react';
import Button from '@material-ui/core/Button';
import base64 from 'base-64';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import history from '../history';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sparqlConnect, setQueryURL } from 'sparql-connect';


setQueryURL('https://query.wikidata.org/sparql')
const query =`
PREFIX wdt:<http://www.wikidata.org/prop/direct/>
PREFIX wd:<http://www.wikidata.org/entity/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX bd: <http://www.bigdata.com/rdf#>
SELECT DISTINCT ?item ?itemLabel ?placeofbirthLabel ?dob (GROUP_CONCAT(?image ; separator=", ") as ?img)
WHERE {
?item wdt:P27 wd:Q142. #française
?item wdt:P31 wd:Q5. #être humain
?item wdt:P21 wd:Q6581072. #genre femme
?item wdt:P106 wd:Q36180. #Occupation de type écrivain
OPTIONAL {?item wdt:P19 ?placeofbirth.}#lieu de naissance
OPTIONAL {?item wdt:P18 ?image.}
OPTIONAL {?item wdt:P569 ?dob.} #date de naissance
SERVICE wikibase:label {bd:serviceParam wikibase:language "fr, en". }
}
GROUP BY ?item ?itemLabel ?placeofbirthLabel ?dob
LIMIT 20
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

function CardsFetch({ results }) {
const classes = useStyles();
const [login, setLogin] = React.useState('ESGI-WEB-2020');
const [password, setPassword] = React.useState('ESGI-WEB-2020-heUq9f');

const queryAddData =`
PREFIX vcard:<http://www.w3.org/2006/vcard/ns#>
PREFIX wdt:<http://www.wikidata.org/prop/direct/>
INSERT DATA 
{   GRAPH <http://sandbox.bordercloud.com/groupe7-grapheTest>
    {
        ${results.map((result)=>(
            `<${result.item}> a vcard:Individual .
            <${result.item}> vcard:fn "${result.itemLabel}".
            <${result.item}> vcard:hasPhoto "<${result.img}>".
            <${result.item}> vcard:bday "${result.dob}".
            <${result.item}>  wdt:P569 "${result.placeofbirthLabel}".`
            ))}
    }
}
`

    function AddData(e) {
        e.preventDefault();
        e.stopPropagation();
        var myHeaders = new Headers();
        var proxy = 'https://safe-scrubland-28636.herokuapp.com/';
        var url = 'https://sandbox.bordercloud.com/sparql';
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', 'Basic ' + base64.encode(login + ":" + password));
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("update", queryAddData);
        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        fetch(proxy+url, requestOptions)
        .then(response => response.text())
        .then(results => console.log(results))
        .catch(error => console.log('error', error));
    
    }

return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
        <Button onClick={AddData} className={classes.btnAjouter} variant="contained" size="medium" color="primary">
            Ajouter les données
        </Button>
        </Grid>
        </Container>
    </main>
    <Fab onClick= {() =>(history.push('/artiste/add'))} color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
    </Fab>
    </React.Fragment>
);
}
export default connector(CardsFetch,{
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