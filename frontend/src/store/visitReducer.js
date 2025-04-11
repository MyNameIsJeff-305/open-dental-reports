import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_ALL_VISITS = 'visit/GET_ALL_VISITS';


//ACTION CREATORS
const getAllVisits = (visits) => ({
    type: GET_ALL_VISITS,
    payload: visits
});

//THUNKS
export const fetchAllVisits = (startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/visits?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    dispatch(getAllVisits(data));
};

//REDUCER
const initialState = {
    visits: []
};

const visitReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VISITS:
            return {
                ...state,
                visits: action.payload
            };
        default:
            return state;
    }
};

export default visitReducer;