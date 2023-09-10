import FlexBetween from '@/components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';
import PixIcon from '@mui/icons-material/Pix';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const { palette } = useTheme();
    return (
        <FlexBetween
            mb={"0.25rem"}
            padding={"0.5rem 2rem"}
            color={palette.grey[300]}
        // position={"fixed"}
        >
            {/* LEFT SIDE */}
            <FlexBetween gap="0.75rem">
                <PixIcon sx={{ fontSize: "28px", }} />
                <Typography variant="h4" fontSize={"16px"}>
                    FinView
                </Typography>
            </FlexBetween>

            {/* Right Sise */}
            <FlexBetween gap="2rem">
                <Box sx={{
                    "&:hover": {
                        color: palette.primary[100]
                    }
                }}>
                    <NavLink
                        to={"/"}
                        style={({ isActive}) => {
                            return {
                                color: isActive ? "inherit" : palette.grey[700],
                                textDecoration: "inherit"
                            }
                        }}
                    >
                        dashboard
                    </NavLink>
                </Box>
                <Box sx={{
                    "&:hover": {
                        color: palette.primary[100]
                    }
                }}>
                    <NavLink
                        to={"/predictions"}
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "inherit" : palette.grey[700],
                                textDecoration: "inherit"
                            }
                        }}
                    >
                        predictions
                    </NavLink>
                </Box>
            </FlexBetween>

        </FlexBetween>
    )
}

export default Navbar;