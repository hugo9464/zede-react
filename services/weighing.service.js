const API_URL = "http://78.123.247.250:8080/api";
const WEIGHING_ROUTE = "/app/weightedwaste/1/"

export function getWeighings() {
    return fetch(API_URL + WEIGHING_ROUTE, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NWQ0MDk3MS1mMmY2LTRkOWYtYmI2OS04NTE1YzlkYzJjMzciLCJyb2xlcyI6InN0YW5kYXJkX3VzZXIiLCJpc3MiOiJ3YXN0ZWxlc3MuaW8iLCJleHAiOjE1ODg5NTg3NTl9.TaXdS_Fdh5LKg5Tg7q4vaW7E4o6nQbQabexdZfwGuaA',
        }})
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error)
        })
}   

export function saveWeighing(weighing) {
    return fetch(API_URL + WEIGHING_ROUTE, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NWQ0MDk3MS1mMmY2LTRkOWYtYmI2OS04NTE1YzlkYzJjMzciLCJyb2xlcyI6InN0YW5kYXJkX3VzZXIiLCJpc3MiOiJ3YXN0ZWxlc3MuaW8iLCJleHAiOjE1ODg5NTg3NTl9.TaXdS_Fdh5LKg5Tg7q4vaW7E4o6nQbQabexdZfwGuaA',
        }})
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error)
        })
}   