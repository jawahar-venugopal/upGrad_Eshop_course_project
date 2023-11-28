import './App.css';
import { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from "./components/home/Home";
import { initCatalog } from "./store/actions/metadataAction";
import useAuth from "./hooks/useAuth";


const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    disabled: {
      main: "#56595c",
    }
  },
});

function App() {

  const { AuthContext } = useAuth();
  const { accessToken } = useContext(AuthContext);
  const dispatch = useDispatch();

  const initPageData = useCallback(() => {
    dispatch(initCatalog(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
