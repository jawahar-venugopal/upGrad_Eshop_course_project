import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from "./components/home/Home";


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
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
