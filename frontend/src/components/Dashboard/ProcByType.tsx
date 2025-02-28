import * as React from 'react';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const getColors = [
    '#FFC107','#FF5722','#4CAF50','#2196F3','#9C27B0','#E91E63',
    '#607D8B','#795548','#FF9800','#03A9F4','#00BCD4','#8BC34A',
    '#CDDC39','#FFEB3B','#FF5722','#9C27B0','#E91E63','#607D8B',
    '#795548', '#FF9800', '#03A9F4', '#00BCD4', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FF5722', '#9C27B0', '#E91E63', '#607D8B', '#795548',
]

interface PieCenterLabelProps {
    primaryText: string;
    secondaryText: string;
}

interface StyledTextProps {
    variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: theme.palette.text.secondary,
    variants: [
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontSize: theme.typography.body2.fontSize,
            },
        },
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontWeight: theme.typography.h5.fontWeight,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontWeight: theme.typography.body2.fontWeight,
            },
        },
    ],
}));

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <React.Fragment>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </React.Fragment>
    );
}

export default function ProcByType({ data }) {

    const totalValues = data.reduce((acc: any, { value }: any) => acc + value, 0);

    return (
        <Card
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
        >
            <CardContent>
                <Typography component="h2" variant="subtitle2">
                    Procedures By Type
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart
                        colors={getColors}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 20,
                        }}
                        series={[
                            {
                                data,
                                innerRadius: 75,
                                outerRadius: 100,
                                paddingAngle: 0,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fontWeight: 'bold',
                            },
                        }}
                        height={200}
                        width={400}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                    >
                        <PieCenterLabel primaryText={totalValues} secondaryText="Procedures" />
                    </PieChart>
                </Box>
            </CardContent>
        </Card>
    );
}
