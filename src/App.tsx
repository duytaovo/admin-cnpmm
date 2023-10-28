import useRouteElements from "./useRouteElements";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import "normalize.css";
import "src/assets/styles/global.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { useContext } from "react";
import { DarkModeContext } from "./contexts/darkModeContext";

const theme = createTheme({
  direction: "rtl",
});

function App() {
  const routeElements = useRouteElements();
  const { enable } = useContext(DarkModeContext);
  return (
    <div className={enable === "true" ? "app dark" : "app"}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <ErrorBoundary>{routeElements}</ErrorBoundary>
          <ToastContainer />
        </HelmetProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
