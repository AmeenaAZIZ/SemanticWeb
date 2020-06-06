import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import history from '../history';
import MuiAlert from '@material-ui/lab/Alert';
import base64 from 'base-64';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddCard() {
    const [name, setName] = React.useState('');
    const [pagewiki, setPagewiki] = React.useState('');
    const [image, setImage] = React.useState('');
    const [placeofbirth, setPlaceofbirth] = React.useState('');
    const [dob, setDob] = React.useState(new Date().now);
    const handleDateChange = (date) => {setDob(date.toJSON())};
    const [registered, setRegistered] = React.useState(false);
    const [error, setError] = React.useState(false);
    const classes = useStyles();
    const [login, setLogin] = React.useState('ESGI-WEB-2020');
    const [password, setPassword] = React.useState('ESGI-WEB-2020-heUq9f');


    const queryAddData =`
    PREFIX vcard:<http://www.w3.org/2006/vcard/ns#>
    PREFIX wdt:<http://www.wikidata.org/prop/direct/>
    INSERT DATA 
    {   GRAPH <http://sandbox.bordercloud.com/groupe7-grapheVcard2>
        {
            <${pagewiki}> a vcard:Individual.
            <${pagewiki}> vcard:hasPhoto <${image}>.
            <${pagewiki}> vcard:bday "${dob}"^^xsd:dateTime.
            <${pagewiki}> vcard:fn "${name}".
            <${pagewiki}> wdt:P569 "${placeofbirth}".
        }
    }
    `

    function AddCardF(e) {
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
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            { registered && <h2>Page ajoutée</h2> }

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddCircleIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Ajouter page / card
                </Typography>

                <form className={classes.form} onSubmit={AddCardF}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="nom"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="pagewiki"
                                label="Page Wikidata"
                                name="pagewiki"
                                value={pagewiki}
                                onChange={e => setPagewiki(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="image"
                                label="image url"
                                name="image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            label="date de naissance"
                            format="MM/dd/yyyy"
                            value={dob}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'changer la date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="placeofbirth"
                                label="Lieu de naissance"
                                name="placeofbirth"
                                value={placeofbirth}
                                onChange={e => setPlaceofbirth(e.target.value)}
                            />
                        </Grid>


                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ajouter
                    </Button>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}