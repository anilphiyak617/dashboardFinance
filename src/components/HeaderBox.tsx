import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material';

type Props = {
    icon?: React.ReactNode,
    title: string;
    subTitle?: string;
}

const HeaderBox = ({ icon, title, subTitle }: Props) => {
    return (
        <FlexBetween>
            <FlexBetween>
                <Box width={"100%"} sx={{ backgroundColor: 'red' }}>
                    <Typography>{title}</Typography>
                    <Typography>{subTitle}</Typography>
                </Box>
                {icon}
            </FlexBetween>
        </FlexBetween >
    )
}

export default HeaderBox