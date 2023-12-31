import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import DashBoard from "@/scenes/dashboard";
import Prediction from "./scenes/prediction";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Routes>
              <Route
                path="/"
                element={<DashBoard></DashBoard>} />
              <Route path="/predictions" element={<Prediction />} />
            </Routes >
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
