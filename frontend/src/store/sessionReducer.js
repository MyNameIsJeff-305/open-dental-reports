import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_SESSION = 'session/GET_SESSION';
const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';
const SIGNUP = 'session/SIGNUP';

//ACTION CREATORS
const getSession = (user) => ({
    type: GET_SESSION,
    payload: user
});

const login = (user) => ({
    type: LOGIN,
    payload: user
});

const logout = () => ({
    type: LOGOUT
});

const signup = (user) => ({
    type: SIGNUP,
    payload: user
});

//THUNKS
export const fetchSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(getSession(data));
};

export const loginThunk = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(login(data));
    return response;
};

export const logoutThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(logout());
    return response;
};

export const signupThunk = (user) => async (dispatch) => {
    const { email, username, password, firstName, lastName, userRoleId } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password,
            firstName,
            lastName,
            userRoleId
        })
    });
    const data = await response.json();
    dispatch(signup(data));
    return response;
};

//REDUCER
const sessionReducer = (state = { user: null }, action) => {
    let newState;
    switch (action.type) {
        case GET_SESSION:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case LOGIN:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case LOGOUT:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case SIGNUP:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;