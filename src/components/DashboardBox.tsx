import { Box, styled } from "@mui/material";

const DashBoardBox = styled(Box)(({ theme }) => ({
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8)",
    backgroundColor: theme.palette.background.paper,
    // padding: "0.5rem"
}))

export default DashBoardBox;