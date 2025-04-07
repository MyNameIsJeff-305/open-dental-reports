import { useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import StatCard from './StatCard';
import AgeGroupChart from './AgeGroupChart';
import ProcByType from './ProcByType';



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
    // Other props you need to render charts if required
}) => {
    const printRef = useRef();

    const handlePrint = () => {
        window.print();
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Print Preview</DialogTitle>
            <DialogContent>
                <div ref={printRef}>
                    {/* Preview Layout */}
                    <Grid container spacing={2} columns={12} sx={{ mb: 2 }} justifyContent={'space-between'}>
                        {CARDS_DATA.map((card, index) => (
                            <Grid key={index} item width={'50%'} padding={1}>
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

                    <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
                        <Grid item width={'50%'} padding={1}>
                            <AgeGroupChart data={ageGroupData} />
                        </Grid>
                        <Grid item width={'50%'} padding={1}>
                            <ProcByType data={procByTypeData} />
                        </Grid>
                    </Grid>

                    <Grid container display="flex" justifyContent="space-between" width={'100%'} rowGap={2} columnGap={2}>
                        <Grid width="100%">
                            <Typography component="h3" variant="h6">New Patients</Typography>
                            <DataGrid
                                rows={ptRows}
                                columns={ptColumns}
                                sx={{ height: 520 }}
                            />
                        </Grid>
                        <Grid width="100%">
                            <Typography component="h3" variant="h6">Procedures</Typography>
                            <DataGrid
                                rows={prRows}
                                columns={prColumns}
                                sx={{ height: 520 }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handlePrint}>Print</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrintPreviewModal;
