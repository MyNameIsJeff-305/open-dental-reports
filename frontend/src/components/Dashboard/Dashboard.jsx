import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPatientsByDateRange } from '../../store/patientReducer';
import { fetchProceduresByDateRange } from '../../store/proceduresReducer';

import moment from 'moment';
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';


import AgeGroupChart from './AgeGroupChart';
import ProcByType from './ProcByType';
import StatCard from './StatCard';

import './Dashboard.css';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(dayjs().startOf('week'));
    const [endDate, setEndDate] = useState(dayjs().endOf('week'));
    const [error, setErrors] = useState({});

    const dashboard = useSelector(state => state.dashboard.dashboard);
    const patients = useSelector(state => state.patient.patients);
    const procedures = useSelector(state => state.procedure.procedures);

    const dispatch = useDispatch();

    useEffect(() => {
        const newErrors = {};

        if (dayjs(endDate).isBefore(startDate)) {
            setStartDate(dayjs().startOf('week'));
            setEndDate(dayjs().endOf('week'));
        }

        setErrors(newErrors);
    }, [startDate, endDate]);

    // Fetch dashboard, patients, and procedures based on selected date range
    useEffect(() => {
        setErrors({});
        dispatch(fetchPatientsByDateRange(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')));
        dispatch(fetchProceduresByDateRange(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')));
    }, [dispatch, startDate, endDate]); // Re-run when 'dateRange' changes

    if (!dashboard || !patients || !procedures) return (
        <div className="loading">
            <h1>Loading...</h1>
        </div>
    );

    const getPatientsByDay = (patients) => {
        const patientsByDay = {};

        patients.forEach(patient => {
            const day = moment(patient.SecDateEntry).format('MM/DD/YYYY');
            if (!patientsByDay[day]) {
                patientsByDay[day] = 0;
            }
            patientsByDay[day]++;
        });

        return Object.keys(patientsByDay).map(day => ({
            day,
            count: patientsByDay[day]
        }));
    };

    const getPeriodDataPatients = (patientsByDay) => {
        const periodData = Array(dayjs(endDate).diff(startDate, 'days') + 1).fill(0);

        patientsByDay.forEach((patient) => {
            const dayIndex = dayjs(patient.day).diff(startDate, 'days');
            periodData[dayIndex] = patient.count;
        });

        return periodData;
    };

    const getProceduresByDay = (procedures) => {
        const proceduresByDay = {};

        procedures.forEach(procedure => {
            const day = moment(procedure.procedure_date).format('MM/DD/YYYY');
            if (!proceduresByDay[day]) {
                proceduresByDay[day] = 0;
            }
            proceduresByDay[day]++;
        });

        return Object.keys(proceduresByDay).map(day => ({
            day,
            count: proceduresByDay[day]
        }));
    };

    const getPeriodDataProcedures = (proceduresByDay) => {
        const periodData = Array(dayjs(endDate).diff(startDate, 'days') + 1).fill(0);


        proceduresByDay.forEach((procedure) => {
            const dayIndex = dayjs(procedure.day).diff(startDate, "days");
            periodData[dayIndex] = procedure.count;
        })

        return periodData;
    };

    const getAgeGroups = (patients) => {
        const ageGroups = {
            "0-18": 0,
            "19-30": 0,
            "31-40": 0,
            "41-50": 0,
            "51-60": 0,
            "65+": 0
        };

        patients.forEach(patient => {
            const age = moment().diff(patient.Birthdate, 'years');
            if (age <= 18) {
                ageGroups["0-18"]++;
            } else if (age <= 30) {
                ageGroups["19-30"]++;
            } else if (age <= 40) {
                ageGroups["31-40"]++;
            } else if (age <= 50) {
                ageGroups["41-50"]++;
            } else if (age <= 60) {
                ageGroups["51-60"]++;
            } else {
                ageGroups["65+"]++;
            }
        });

        return ageGroups;
    }

    const getAgeGroupsData = (ageGroups) => {
        const data = [];
        for (let i = 0; i < Object.keys(ageGroups).length; i++) {
            data.push({ id: i + 1, value: Object.values(ageGroups)[i], label: Object.keys(ageGroups)[i] });
        }
        return data;
    }

    const getProceduresByName = (procedures) => {
        const proceduresByName = {};

        procedures.forEach(procedure => {
            const name = procedure.procedure_name;
            if (!proceduresByName[name]) {
                proceduresByName[name] = 0;
            }
            proceduresByName[name]++;
        });

        return Object.keys(proceduresByName).map(name => ({
            name,
            count: proceduresByName[name]
        }));
    };

    const getProceduresData = (filteredProcedures) => {
        const data = [];
        let counter = 1;
        for (let procedure of filteredProcedures) {
            data.push({
                id: counter,
                value: procedure.count,
                label: procedure.name
            });
            counter++;
        }

        return data;
    }

    const CARDS_DATA = [
        {
            title: "New Patients",
            value: patients.length,
            interval: `${startDate.format('MM/DD/YYYY')} to ${endDate.format('MM/DD/YYYY')}`,
            data: getPeriodDataPatients(getPatientsByDay(patients))
        },
        {
            title: "Procedures",
            value: procedures.length,
            interval: `${startDate.format('MM/DD/YYYY')} to ${endDate.format('MM/DD/YYYY')}`,
            data: getPeriodDataProcedures(getProceduresByDay(procedures))
        },
    ];

    const startDateChange = (newValue) => {
        if (dayjs(newValue).isAfter(endDate)) {
            setErrors({ invalidRange: "Invalid date range" });
            return;
        }
        setStartDate(newValue)
    }

    const endDateChange = (newValue) => {
        if (dayjs(newValue).isBefore(startDate)) {
            setErrors({ invalidRange: "Invalid date range" });
            return;
        }
        setEndDate(newValue);
    }

    const ptRows = patients.map(patient => {
        return {
            id: patient.PatNum,
            first_name: patient.FName,
            last_name: patient.LName,
            dob: moment(patient.Birthdate).format('L')
        }
    });

    const ptColumns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'first_name', headerName: 'First name', width: 150 },
        { field: 'last_name', headerName: 'Last name', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 150 }
    ];

    const prRows = () => {
        const result = [];
        for (let i = 0; i < procedures.length; i++) {
            result.push({
                id: i + 1,
                name: procedures[i].procedure_name,
                code: procedures[i].procedure_code,
                date: dayjs(procedures[i].procedure_date).format('MM/DD/YYYY'),
                patient: procedures[i].first_name + ' ' + procedures[i].last_name
            });
        }
        return result;
    }

    const prColumns = [
        { field: 'name', headerName: 'Procedure Name', width: 150 },
        { field: 'code', headerName: 'Procedure Code', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'patient', headerName: 'Patient', width: 150 }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <div className='dashboard-header'>
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                    Dashboard
                </Typography>
                <div className='date-picker-container'>
                    <div className='date-picker'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={startDateChange}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={endDateChange}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='error-msg'>
                        {error.invalidRange && <p>{error.invalidRange}</p>}
                    </div>
                </div>
            </div>
            <div className="dashboard">
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{ mb: (theme) => theme.spacing(2) }}
                >
                    {CARDS_DATA.map((card, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                            <StatCard
                                title={card.title}
                                value={card.value}
                                interval={card.interval}
                                trend={"up"}
                                data={card.data}
                            />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <AgeGroupChart data={getAgeGroupsData(getAgeGroups(patients))} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <ProcByType data={getProceduresData(getProceduresByName(procedures))} />
                    </Grid>
                </Grid>
                <Grid
                    container
                    display={"flex"}
                    alignContent={"space-between"}
                    justifyContent={"space-between"}
                    width={"100%"}
                >
                    <Grid width={"50%"} height={"94%"} paddingRight={"10px"}>
                        <Typography component="h3" variant="h6">
                            New Patients
                        </Typography>
                        <DataGrid
                            rows={ptRows}
                            columns={ptColumns}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            loading= {ptColumns.length === 0}
                            sx={{ height: 520 }}
                        />
                    </Grid>
                    <Grid width={"50%"} height={"94%"} paddingLeft={"10px"}>
                        <Typography component="h3" variant="h6">
                            Procedures
                        </Typography>
                        <DataGrid
                            rows={prRows()}
                            columns={prColumns}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            loading= {prColumns.length === 0}
                            sx={{ height: 520 }}
                        />
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default Dashboard;
