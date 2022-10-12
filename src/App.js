// import "./App.css";
import { AppRoutes } from "./router/AppRoutes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
