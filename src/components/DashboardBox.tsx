import { Box, styled } from "@mui/material";

const DashBoardBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8)",
    backgroundColor: theme.palette.background.paper
}))

export default DashBoardBox;