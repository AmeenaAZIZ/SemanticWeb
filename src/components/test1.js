import React from 'react';
import { sparqlConnect, setQueryURL } from 'sparql-connect';


//Set the sparql endpoint (should be done once for the whole application)
setQueryURL('https://query.wikidata.org/sparql')
//setQueryURL('http://dbpedia.org/sparql');

//Write a query that returns some resources with the additional field `label`
/* PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX : <http://dbpedia.org/resource/>
SELECT DISTINCT ?name ?person
WHERE {      
    ?person dbo:birthPlace :Brussels .     
    ?person foaf:name ?name .
}
LIMIT 10 */
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
//Create a connector to populate the component with the results
const connector = sparqlConnect(query, {
    queryName: 'results',
    })

//Write a component assuming the query results will be available as a prop
//named `results`
function ResourcesList({ results }) {
return (
    <ul>
    {
        results.map(({ women, womenLabel }) => 
        <li key={women.value}>{ women }: {womenLabel}</li>
        )
    }
    </ul>
)
}

//Connect the query to your component
export default connector(ResourcesList, {
    loading: () => <span>Resources are loading</span>,
    error: () => <span>Something went wrong</span>
    })