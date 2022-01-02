import base64 from "react-native-base64";

const API_URL = "http://localhost:3000/api";
const USER_ROUTE = "/user";
const SIGNUP_ROUTE = "/signup";
const LOGIN_ROUTE = "/login";

export function login(email, password) {
  const authorizationHeader = "Basic " + base64.encode(email + ":" + password);
  return fetch(API_URL + USER_ROUTE + LOGIN_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      console.log("--- LOGIN SUCCESSFULL ---");
      console.log(response.body)
      return response.body;
    })
    .catch((error) => {
      console.log("ERROR in User service");
      console.log(error);
    });
}

export function signup(user) {
  console.log(API_URL + USER_ROUTE + SIGNUP_ROUTE);
  console.log(JSON.stringify(user));
  return fetch(API_URL + USER_ROUTE + SIGNUP_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("--- SIGNUP SUCCESSFULL ---");
      return response;
    })
    .catch((error) => {
      console.log("ERROR in User service");
      console.log(error);
    });
}
