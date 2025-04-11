import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

export default function PageViewsBarChart({data}) {
    const theme = useTheme();
    const colorPalette = [
        theme.palette.primary.dark,
        theme.palette.primary.main,
        theme.palette.primary.light,
    ];

    const getWeekdayCounts = (data: { date: string; count: number }[]) => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekdayCounts = weekdays.map((day) => ({ weekday: day, count: 0 }));

        data.forEach(({ date, count }) => {
            const dayIndex = moment(date).day();
            weekdayCounts[dayIndex].count += 1;
        });

        return weekdayCounts;
    }

    console.log(getWeekdayCounts(data), "THIS IS WHAT I WANT");

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Page views and downloads
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            1.3M
                        </Typography>
                        <Chip size="small" color="error" label="-8%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Page views and downloads for the last 6 months
                    </Typography>
                </Stack>
                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={
                        [
                            {
                                scaleType: 'band',
                                categoryGapRatio: 0.5,
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            },
                        ] as any
                    }
                    series={[
                        {
                            id: 'visitors',
                            label: 'Visitors',
                            data: Object.values(getWeekdayCounts(data)).map((item) => item.count),
                            stack: 'A',
                        }
                    ]}
                    height={250}
                    margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
