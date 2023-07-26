import { Box, useTheme } from '@mui/material'

type Props = {}

const DashBoard = (props: Props) => {

    const { palette } = useTheme();
    return (
        <Box sx={{ color: palette.grey[300] }}>DashBoard</Box>
    )
}

export default DashBoard 