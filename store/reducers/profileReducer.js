
const initialState = { 
    isLoggedIn: false,
    token: ""
};

function toggleLoggedIn(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'TOGGLE_LOGGEDIN':

            if(state.isLoggedIn) {
                nextState = {
                    ...state,
                    isLoggedIn: false,
                    token: ""
                }
            } else {
                nextState = {
                    ...state,
                    isLoggedIn: true,
                    token: action.value
                }
            }

            return nextState || state;
        default:
            return state;
    }
}

export default toggleLoggedIn