import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
    icon?: React.ReactNode,
    title: string;
    subTitle?: string;
    sideText?: string;
}

const HeaderBox = ({ icon, title, subTitle, sideText }: Props) => {
    const { palette } = useTheme()
    return (
        <FlexBetween color={palette.grey[400]} m={"1rem 1rem 0rem 1rem"} >
            <FlexBetween >
                <Box width={"100%"} >
                    <Typography variant='h4' >{title}</Typography>
                    <Typography variant='h6'>{subTitle}</Typography>
                </Box>
                {icon}
            </FlexBetween>
            <Typography variant='h4' fontWeight={'700'} color={palette.secondary[500]}>
                {sideText}
            </Typography>
        </FlexBetween >
    )
}

export default HeaderBox