
const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
};

function manageToken(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'RESTORE_TOKEN':
            nextState = {
                ...state,
                userToken: action.value,
                isLoading: false,
            }
            return nextState || state;
        case 'SIGN_IN':
            nextState = {
                ...state,
                isSignout: false,
                userToken: action.value,
            }
            return nextState || state;
        case 'SIGN_OUT':
            nextState = {
                ...state,
                isSignout: true,
                userToken: null,
            }
            return nextState || state;

        default:
            return state;
    }
}

export default manageToken