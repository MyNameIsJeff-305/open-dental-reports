import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_ALL_PROCEDURES = 'procedure/GET_ALL_PROCEDURES';
const GET_LAST_WEEK_PROCEDURES = 'procedure/GET_LAST_WEEK_PROCEDURES';
const GET_LAST_MONTH_PROCEDURES = 'procedure/GET_LAST_MONTH_PROCEDURES';
const GET_LAST_YEAR_PROCEDURES = 'procedure/GET_LAST_YEAR_PROCEDURES';
const GET_ALL_PROCEDURES_BY_DATERANGE = 'procedure/GET_ALL_PROCEDURES_BY_DATERANGE';

//ACTION CREATORS
const getAllProcedures = (procedures) => ({
    type: GET_ALL_PROCEDURES,
    payload: procedures
});

const getLastWeekProcedures = (procedures) => ({
    type: GET_LAST_WEEK_PROCEDURES,
    payload: procedures
});

const getLastMonthProcedures = (procedures) => ({
    type: GET_LAST_MONTH_PROCEDURES,
    payload: procedures
});

const getLastYearProcedures = (procedures) => ({
    type: GET_LAST_YEAR_PROCEDURES,
    payload: procedures
});

const getAllProceduresByDateRange = (procedures) => ({
    type: GET_ALL_PROCEDURES_BY_DATERANGE,
    payload: procedures
});

//THUNKS
export const fetchAllProcedures = () => async (dispatch) => {
    const response = await csrfFetch('/api/procedures');
    const data = await response.json();
    dispatch(getAllProcedures(data));
};

export const fetchLastWeekProcedures = () => async (dispatch) => {
    const response = await csrfFetch('/api/procedures/lastweek');
    const data = await response.json();
    dispatch(getLastWeekProcedures(data));
};

export const fetchLastMonthProcedures = () => async (dispatch) => {
    const response = await csrfFetch('/api/procedures/lastmonth');
    const data = await response.json();
    dispatch(getLastMonthProcedures(data));
};

export const fetchLastYearProcedures = () => async (dispatch) => {
    const response = await csrfFetch('/api/procedures/lastyear');
    const data = await response.json();
    dispatch(getLastYearProcedures(data));
};

export const fetchProceduresByDateRange = (startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/procedures/dateRange?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    dispatch(getAllProceduresByDateRange(data));
}

//REDUCER
const initialState = { procedures: [] };

const procedureReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROCEDURES:
            return { ...state, procedures: action.payload };
        case GET_LAST_WEEK_PROCEDURES:
            return { ...state, procedures: action.payload };
        case GET_LAST_MONTH_PROCEDURES:
            return { ...state, procedures: action.payload };
        case GET_LAST_YEAR_PROCEDURES:
            return { ...state, procedures: action.payload };
        case GET_ALL_PROCEDURES_BY_DATERANGE:
            return { ...state, procedures: action.payload };
        default:
            return state;
    }
}

export default procedureReducer;