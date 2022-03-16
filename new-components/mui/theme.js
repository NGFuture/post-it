import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    //contained buttons: Use the contrastText color as the text color and main color as the background color
    // text | outlined buttons: Use the main color (e.g. primary.main) as the text color.
    primary: {
      main: '#EF9D06',
      contrastText: "#00243D",

    },
    secondary: {
      main: '#00243D',
      contrastText: "#EF9D06",
      borderColor: "yellow !important",
    },
    action: {
      main: '#D50005',
    },

    error: {
      main: red.A400,
    },



  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#EF9D06"
        }
      }
    }
  }
});

export default theme;