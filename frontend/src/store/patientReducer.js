import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_ALL_PATIENTS = 'patient/GET_ALL_PATIENTS';
const GET_LAST_WEEK_PATIENTS = 'patient/GET_LAST_WEEK_PATIENTS';
const GET_LAST_MONTH_PATIENTS = 'patient/GET_LAST_MONTH_PATIENTS';
const GET_LAST_YEAR_PATIENTS = 'patient/GET_LAST_YEAR_PATIENTS';
const GET_PATIENTS_BY_DATE_RANGE = 'patient/GET_PATIENTS_BY_DATE_RANGE';
const GET_PATIENT_BY_ID = 'patient/GET_PATIENT_BY_ID';
const GET_PROCEDURES_BY_PATIENT_ID = 'patient/GET_PROCEDURES_BY_PATIENT_ID';

//ACTION CREATORS
const getAllPatients = (patients) => ({
    type: GET_ALL_PATIENTS,
    payload: patients
});

const getLastWeekPatients = (patients) => ({
    type: GET_LAST_WEEK_PATIENTS,
    payload: patients
});

const getLastMonthPatients = (patients) => ({
    type: GET_LAST_MONTH_PATIENTS,
    payload: patients
});

const getLastYearPatients = (patients) => ({
    type: GET_LAST_YEAR_PATIENTS,
    payload: patients
});

const getPatientsByDateRange = (patients) => ({
    type: GET_PATIENTS_BY_DATE_RANGE,
    payload: patients
});

const getPatientById = (patient) => ({
    type: GET_PATIENT_BY_ID,
    payload: patient
});

const getProceduresByPatientId = (procedures) => ({
    type: GET_PROCEDURES_BY_PATIENT_ID,
    payload: procedures
});


//THUNKS
export const fetchAllPatients = () => async (dispatch) => {
    const response = await csrfFetch('/api/patients');
    const data = await response.json();
    dispatch(getAllPatients(data));
};

export const fetchLastWeekPatients = () => async (dispatch) => {
    const response = await csrfFetch('/api/patients/lastweek');
    const data = await response.json();
    dispatch(getLastWeekPatients(data));
};

export const fetchLastMonthPatients = () => async (dispatch) => {
    const response = await csrfFetch('/api/patients/lastmonth');
    const data = await response.json();
    dispatch(getLastMonthPatients(data));
};

export const fetchLastYearPatients = () => async (dispatch) => {
    const response = await csrfFetch('/api/patients/lastyear');
    const data = await response.json();
    dispatch(getLastYearPatients(data));
};

export const fetchPatientsByDateRange = (startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/patients/dateRange?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    dispatch(getPatientsByDateRange(data));
}

export const fetchPatientById = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/patients/${id}`);
    const data = await response.json();
    dispatch(getPatientById(data));
}

export const fetchProceduresByPatientId = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/patients/${id}/procedures`);
    const data = await response.json();
    dispatch(getProceduresByPatientId(data));
}

//REDUCER
const initialState = { patients: [], currentPatient: {}, currentProcedures: [] };

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PATIENTS:
            return { ...state, patients: action.payload };
        case GET_LAST_WEEK_PATIENTS:
            return { ...state, patients: action.payload };
        case GET_LAST_MONTH_PATIENTS:
            return { ...state, patients: action.payload };
        case GET_LAST_YEAR_PATIENTS:
            return { ...state, patients: action.payload };
        case GET_PATIENTS_BY_DATE_RANGE:
            return { ...state, patients: action.payload };
        case GET_PATIENT_BY_ID:
            return { ...state, currentPatient: action.payload };
        case GET_PROCEDURES_BY_PATIENT_ID:
            return { ...state, currentProcedures: action.payload };
        default:
            return state;
    }
}

export default patientReducer;