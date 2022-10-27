import { AppRoutes } from "./router/AppRoutes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/Theme";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
