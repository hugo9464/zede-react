import base64 from 'react-native-base64'

const API_URL = "http://78.123.247.250:8080/api";
const AUTH_ROUTE = "/auth/1"
const SIGNUP_ROUTE = "/signup"
const LOGIN_ROUTE = "/login"

export function login(email, password) {

    authorizationHeader = "Basic " + base64.encode(email + ":" + password)
    console.log('authorizationHeader='+authorizationHeader)
    return fetch(API_URL + AUTH_ROUTE + LOGIN_ROUTE,  {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': authorizationHeader,
          }})
        .then((response) => {
            console.log("Login response : " + response.url)
            console.log("authorization="+response.headers.get("Authorization"))
            return response.headers.get("Authorization")
        })
        .catch((error) => {
            console.log('ERROR in User service')
            console.log(error)
        })
}   
 