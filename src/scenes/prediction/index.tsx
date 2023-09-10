import DashBoardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery } from '@/state/api';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DataPoint, linear } from 'regression';


type chartDataPoint = {
    name: string,
    "Actual Revenue": number,
    "Regression Line": number,
    "Predicted Revenue": number
}



function Prediction() {

    const { palette, breakpoints } = useTheme();
    const isBelowSmallScreeens = useMediaQuery(breakpoints.down('sm'));
    // const isBelowSmallScreeens = true;
    // console.log("Media Query ", isBelowSmallScreeens)
    const [isPrediction, setPrediction] = useState<boolean>(false);

    const { data: kpisData } = useGetKpisQuery();

    const chartData: Array<chartDataPoint> = useMemo(() => {
        // if kpisData is null
        if (!kpisData) return [];
        const monthlyData = kpisData[0].monthlyData;
        // Formatted data for regresssion JS
        const formattedData: Array<DataPoint> = monthlyData.map(({ revenue }, index) => {
            return [index, revenue]
        })

        const regressionResult = linear(formattedData);

        // *** regression.poiints returns regression line coordinates for 
        // input[x, y'] y' is new y' coordinates of the regression
        return monthlyData.map(({ month, revenue }, index) => {
            return {
                name: month[0].toLocaleUpperCase() + month.slice(1, 3).toLowerCase(),
                "Actual Revenue": revenue,
                "Regression Line": regressionResult.points[index][1],
                "Predicted Revenue": regressionResult.predict(12 + index)[1]
            }
        });
    }, [kpisData]);

    return (
        <>
            <DashBoardBox
                width={"100%"}
                height={"100%"}
                p={"1rem"}
                overflow={"hidden"}
            >
                {/* Prediction Header */}
                <FlexBetween
                    m={"1rem 2rem 1rem 2rem"}
                    gap={1}
                >
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                    >
                        <Typography variant='h3'>
                            Revenue and Predictions
                        </Typography>
                        <Typography variant='h5'>
                            The revenue was plotted and future revenue was forecasted using a basic linear regression model
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => {
                            setPrediction(!isPrediction)
                        }}
                        sx={{
                            color: palette.primary.main,
                            px: '1rem',
                            backgroundColor: palette.grey[800],
                            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
                            fontWeight: "bold",
                        }}
                    >
                        {isBelowSmallScreeens ? "Predict" : "Show Predicted Revenue"}
                    </Button>
                </FlexBetween>
                {/* Charts  */}
                <ResponsiveContainer height={"100%"} width={"100%"}  >
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 75,
                            left: 20,
                            bottom: 150,
                        }}
                    >

                        <CartesianGrid vertical={false} color={palette.grey[800]} />
                        <XAxis
                            tickLine={false}
                            dataKey="name" style={{ fontSize: "10px" }}
                        >
                            <Label value="Month" offset={-5} position="insideBottom" />
                        </XAxis>


                        <YAxis style={{ fontSize: "10px" }}
                            tickLine={false}
                            strokeWidth={0}
                            orientation='left'
                            domain={[15000, 26000]}
                            tickFormatter={(v) => `$${v}`}
                        >
                            <Label
                                value="Revenue in USD $"
                                position={'insideLeft'}
                                offset={-5}
                                angle={-90}
                            />
                        </YAxis>
                        <Line
                            dot={false}
                            type="monotone"
                            dataKey="Regression Line"
                            stroke={palette.tertiary[300]}
                            fillOpacity={1}
                        />

                        <Line
                            dot={{ strokeWidth: 5 }}
                            type="monotone"
                            dataKey="Actual Revenue"
                            stroke={palette.primary[600]} fillOpacity={1}
                        />

                        {
                            isPrediction
                            &&
                            <Line
                                dot
                                type="monotone"
                                strokeDasharray={"5 5"}
                                dataKey="Predicted Revenue"
                                stroke={palette.secondary[600]}
                                fillOpacity={1}
                            />
                        }

                        <Legend height={0} verticalAlign="top" wrapperStyle={{
                            paddingBottom: "20px",
                        }} />

                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </DashBoardBox >
        </>
    )
}

export default Prediction