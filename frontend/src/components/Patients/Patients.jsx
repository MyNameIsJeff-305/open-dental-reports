import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllPatients, fetchPatientById, fetchProceduresByPatientId } from '../../store/patientReducer';

import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import moment from 'moment';

import './Patients.css';

const Patients = () => {
    const patients = useSelector(state => state.patient.patients);
    const patient = useSelector(state => state.patient.currentPatient);
    const procedures = useSelector(state => state.patient.currentProcedures);

    const [selectedRow, setSelectedRow] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPatients());
        dispatch(fetchPatientById());
        // dispatch(fetchProceduresByPatientId(patient.PatNum));
    }, [dispatch]);

    if (!patients) {
        return <h1>Loading...</h1>
    }

    function renderGender(params) {
        switch (params.row.gender) {
            case 0:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #F7C6D7", borderRadius: "50px", backgroundColor: "pink", padding: "10px" }}>
                            <p style={{ paddingLeft: "15px", color: "#af4c5b" }}>Female</p>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #A8D9FF", borderRadius: "50px", backgroundColor: "#A8D9FF", padding: "10px" }}>
                            <p style={{ paddingLeft: "24px", color: "#4A90E2" }}>Male</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #D3D3D3", borderRadius: "50px", backgroundColor: "#D3D3D3", padding: "10px" }}>
                            <p style={{ paddingLeft: "8px", color: "#5A5A5A" }}>Unknown</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #D3D3D3", borderRadius: "50px", backgroundColor: "#D3D3D3", padding: "10px" }}>
                            <p style={{ paddingLeft: "20px", color: "#5A5A5A" }}>Other</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    function renderCivilStatus(params) {
        switch (params.row.civil_status) {
            case 0:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #A8D9FF", borderRadius: "50px", backgroundColor: "#A8D9FF", padding: "10px" }}>
                            <p style={{ paddingLeft: "19px", color: "#4A90E2" }}>Single</p>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #A8E6A3", borderRadius: "50px", backgroundColor: "#A8E6A3", padding: "10px" }}>
                            <p style={{ paddingLeft: "16px", color: "#4CAF50" }}>Married</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #FFF9A6", borderRadius: "50px", backgroundColor: "#FFF9A6", padding: "10px" }}>
                            <p style={{ paddingLeft: "22px", color: "#FBC02D" }}>Child</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #D3D3D3", borderRadius: "50px", backgroundColor: "#D3D3D3", padding: "10px" }}>
                            <p style={{ paddingLeft: "9px", color: "#5A5A5A" }}>Widowed</p>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div style={{ display: "flex", height: "90%", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
                        <div style={{ display: "flex", width: "60%", height: "30%", alignItems: "center", border: "1px solid #FFB6B6", borderRadius: "50px", backgroundColor: "#FFB6B6", padding: "10px" }}>
                            <p style={{ paddingLeft: "10px", color: "#E53935" }}>Divorced</p>
                        </div>
                    </div>
                );
        }
    }

    function getGender(number) {
        switch (number) {
            case 0:
                return "Male";
            case 1:
                return "Female";
            case 2:
                return "Unknown";
            case 3:
                return "Other";
        }
    }

    function getCivilStatus(number) {
        switch (number) {
            case 0:
                return "Single";
            case 1:
                return "Married";
            case 2:
                return "Child";
            case 3:
                return "Widowed";
            case 4:
                return "Divorced";
        }
    }

    function getFormattedPhone(phone) {
        if (!phone) {
            return { label: "", cta: "" };
        }

        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            const intlCode = cleaned.startsWith('1') ? '+1' : '';
            return {
                label: `(${match[1]}) ${match[2]}-${match[3]}`,
                cta: `${intlCode}${match[1]}${match[2]}${match[3]}`
            };
        }

        return { label: phone, cta: phone };
    }

    const prRows = procedures.map(procedure => {
        return {
            id: procedure.ProcNum,
            date: moment(procedure.ProcDate).format('L'),
            name: procedure.procedure_name,
        }
    });

    const prColumns = [{
        field: 'id',
        headerName: 'ID',
        width: 90
    }, {
        field: 'date',
        headerName: 'Date',
        width: 150
    }, {
        field: 'name',
        headerName: 'Name',
        width: 150
    }];

    const ptRows = patients.map(patient => {
        return {
            id: patient.PatNum,
            first_name: patient.FName,
            last_name: patient.LName,
            dob: moment(patient.Birthdate).format('L'),
            gender: patient.Gender,
            civil_status: patient.Position
        }
    });

    const ptColumns = [{
        field: 'id',
        headerName: 'ID',
        width: 90
    }, {
        field: 'first_name',
        headerName: 'First name',
        width: 150
    }, {
        field: 'last_name',
        headerName: 'Last name',
        width: 150
    }, {
        field: 'dob',
        headerName: 'Date of Birth',
        width: 150
    }, {
        field: 'gender',
        headerName: 'Gender',
        width: 150,
        renderCell: (params) => {
            return renderGender(params);
        },
    }, {
        field: "civil_status",
        headerName: "Civil Status",
        width: 150,
        renderCell: (params) => {
            return renderCivilStatus(params);
        }
    }];

    const handleRowClick = (row) => {
        dispatch(fetchPatientById(row.id));
        dispatch(fetchProceduresByPatientId(row.id));
        setSelectedRow(row);
    };

    return (
        <Box sx={{ width: '100%', height: '87vh' }}>
            <div className='patients-header'>
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                    Patients
                </Typography>
                <div className='patients-header-search'>
                    <div className='patients-search'>
                        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
                            <OutlinedInput
                                size="small"
                                id="search"
                                placeholder="Search…"
                                sx={{ flexGrow: 1 }}
                                startAdornment={
                                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                                        <SearchRoundedIcon fontSize="small" />
                                    </InputAdornment>
                                }
                                inputProps={{
                                    'aria-label': 'search',
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", height: '100%', width: '100%', rowGap: 2, columnGap: 2 }}>
                <Box sx={{ height: '100%', width: '60%' }}>
                    <DataGrid
                        rows={ptRows}
                        onRowClick={(e) => handleRowClick(e.row)}
                        columns={ptColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </Box>
                <Box sx={{ height: '100%', width: '40%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {patient.PatNum ? (
                        <Box sx={{ width: '90%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ width: '100%', height: "82vh", padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
                                <Typography component="h2" variant="h5" sx={{ color: 'text.secondary' }}>
                                    Patient Details
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Name: </strong>{patient.FName} {patient.LName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Date of Birth: </strong>{moment(patient.Birthdate).format('LL')}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Gender: </strong>{getGender(patient.Gender)}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Civil Status:</strong> {getCivilStatus(patient.Position)}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, gap: 3 }}>
                                    <strong>Contact Information: </strong>
                                </Typography>
                                <div style={{ display: "flex", flexDirection: "row", columnGap: "10px", marginBottom: "10px" }}>
                                    {patient.HmPhone ? (
                                        <Button
                                            variant="contained"
                                            size='small'
                                            startIcon={<CallIcon />}
                                            href={`tel:+1${getFormattedPhone(patient.HmPhone).cta}`}
                                        >
                                            {getFormattedPhone(patient.HmPhone).label}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            size='small'
                                            startIcon={<CallIcon />}
                                            disabled={true}
                                        >
                                            No Phone
                                        </Button>
                                    )}
                                    {patient.Email ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                size='small'
                                                startIcon={<AlternateEmailIcon />}
                                                href={`mailto:${patient.Email}`}
                                            >
                                                {patient.Email}
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            size='small'
                                            startIcon={<AlternateEmailIcon />}
                                            disabled={true}
                                        >
                                            No Email
                                        </Button>
                                    )}
                                </div>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Procedures</strong>
                                </Typography>
                                {procedures ? (
                                    <DataGrid
                                        rows={prRows}
                                        columns={prColumns}
                                        pageSize={5}
                                        defaultPageSize={5}
                                        pageSizeOptions={[5, 10, 20, 50, 100]}
                                        rowsPerPageOptions={[5]}
                                        sx={{ width: '100%', height: '66%' }}
                                    />
                                ) : (
                                    <Typography component="h2" variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                        No procedures found
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Typography component="h2" variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                            Select a Patient to view more details
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Patients