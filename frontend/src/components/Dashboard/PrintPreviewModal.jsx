import { useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import StatCard from './StatCard';
import AgeGroupChart from './AgeGroupChart';
import ProcByType from './ProcByType';

import './Dashboard.css';

const PrintPreviewModal = ({
    open,
    onClose,
    CARDS_DATA,
    ptRows,
    ptColumns,
    prRows,
    prColumns,
    ageGroupData,
    procByTypeData
}) => {
    const printRef = useRef();
    const [printOptions, setPrintOptions] = useState({
        cards: true,
        charts: true,
        newPatients: true,
        procedures: true,
    });

    const handlePrint = () => {
        window.print();
    };

    // Helper function to render a table from columns and rows
    const renderTable = (columns, rows) => {
        return (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.field}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'left',
                                    backgroundColor: '#f2f2f2'
                                }}
                            >
                                {col.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td
                                    key={col.field}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px'
                                    }}
                                >
                                    {row[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Open Dental Report</DialogTitle>
            <DialogContent>
                {/* Checkbox selection (will not print) */}
                <div className="no-print" style={{ padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={printOptions.cards}
                                    onChange={(e) =>
                                        setPrintOptions({ ...printOptions, cards: e.target.checked })
                                    }
                                />
                            }
                            label="Stat Cards"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={printOptions.charts}
                                    onChange={(e) =>
                                        setPrintOptions({ ...printOptions, charts: e.target.checked })
                                    }
                                />
                            }
                            label="Charts"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={printOptions.newPatients}
                                    onChange={(e) =>
                                        setPrintOptions({ ...printOptions, newPatients: e.target.checked })
                                    }
                                />
                            }
                            label="New Patients Table"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={printOptions.procedures}
                                    onChange={(e) =>
                                        setPrintOptions({ ...printOptions, procedures: e.target.checked })
                                    }
                                />
                            }
                            label="Procedures Table"
                        />
                    </FormGroup>
                </div>

                {/* Print preview area */}
                <div ref={printRef} style={{ padding: '20px' }}>
                    {/* Always show the interval */}
                    <p>{CARDS_DATA[0].interval}</p>
                    {printOptions.cards && (
                        <Grid container spacing={2} columns={12} sx={{ mb: 2 }} justifyContent="space-between">
                            {CARDS_DATA.map((card, index) => (
                                <Grid key={index} item width="50%" padding={1}>
                                    <StatCard
                                        title={card.title}
                                        value={card.value}
                                        interval={card.interval}
                                        trend="up"
                                        data={card.data}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {printOptions.charts && (
                        <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
                            <Grid item width="50%" padding={1}>
                                <AgeGroupChart data={ageGroupData} />
                            </Grid>
                            <Grid item width="50%" padding={1}>
                                <ProcByType data={procByTypeData} />
                            </Grid>
                        </Grid>
                    )}

                    <Grid container display="flex" justifyContent="space-between" width="100%" rowGap={2} columnGap={2}>
                        {printOptions.newPatients && (
                            <Grid item xs={12}>
                                <Typography component="h3" variant="h6">New Patients</Typography>
                                {renderTable(ptColumns, ptRows)}
                            </Grid>
                        )}
                        {printOptions.procedures && (
                            <Grid item xs={12}>
                                <Typography component="h3" variant="h6">Procedures</Typography>
                                {renderTable(prColumns, prRows)}
                            </Grid>
                        )}
                    </Grid>
                </div>
            </DialogContent>
            {/* Actions section (hidden in print via the no-print class) */}
            <DialogActions className="no-print">
                <Button className="print-button" variant="contained" onClick={handlePrint}>
                    Print
                </Button>
                <Button className="cancel-button" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrintPreviewModal;
