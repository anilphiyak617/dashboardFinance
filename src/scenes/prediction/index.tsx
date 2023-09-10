import DashBoardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

function Prediction() {

    const { palette } = useTheme();
    console.log("prediction rendered")
    const [isPrediction, setPrediction] = useState<boolean>(true);
    return (
        <>
            <DashBoardBox
                width={"100%"}
                height={"100%"}
                p={"1rem"}
            >
                {/* Prediction Header */}
                <FlexBetween
                    m={"2rem 2rem 0rem 2rem"}
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
                            backgroundColor: palette.grey[800],
                            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
                            fontWeight: "bold",
                        }}
                    >Show Predicted Revenue</Button>
                </FlexBetween>
                {/* Charts  */}
            </DashBoardBox >
        </>
    )
}

export default Prediction