const API_URL = "http://78.123.247.250:8080/api";
const WEIGHING_ROUTE = "/app/weightedwaste/1/"
const SUMMARY_ROUTE = "summary"

export function getWeighings(userToken) {
    console.log("\ngetting weighings with token="+userToken)
    return fetch(API_URL + WEIGHING_ROUTE, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': userToken,
        }})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error)
        })
}   

export function saveWeighing(weighing, userToken) {

    return fetch(API_URL + WEIGHING_ROUTE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': userToken,
        },
        //TODO: envoyer les bonnes infos
        body : JSON.stringify(weighing)})
        .then((response) => console.log("status code="+response.status))
        .catch((error) => {
            console.log('ERROR in weigning service')
            console.log(error)
        })
}   

export function getSummary(userToken) {
    console.log("\ngetting weighings summary with token="+userToken)
    return fetch(API_URL + WEIGHING_ROUTE + SUMMARY_ROUTE, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': userToken,
        }})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json.summary;
        })
        .catch((error) => {
            console.log(error)
        })
}   