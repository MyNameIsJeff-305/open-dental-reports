import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_DASHBOARD = 'dashboard/GET_DASHBOARD';

//ACTION CREATORS
const getDashboard = (dashboard) => ({
    type: GET_DASHBOARD,
    payload: dashboard
});

//THUNKS
export const fetchDashboard = () => async (dispatch) => {
    const response = await csrfFetch('/api/dashboard');
    const data = await response.json();
    dispatch(getDashboard(data));
}

//REDUCER
const initialState = { dashboard: [] };

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD:
            return { ...state, dashboard: action.payload };
        default:
            return state;
    }
}

export default dashboardReducer;