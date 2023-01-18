import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
  } from "@mui/material/styles";
  import CssBaseline from "@mui/material/CssBaseline";

  function ThemeProvider({ children }) {
    const themeOptions = {
      palette: {
        primary: {
           main: "rgba(19, 0, 90, 01)",
        }, secondary: {
            main: "rgba(19, 0, 90, 0.5)",
        }
      },
      shape: { borderRadius: 10 },
      typography: {
        fontFamily: "Arial, Helvetica, sans-serif",
        h5: {
          fontWeight: 800,
          letterSpacing: 3,
        },
        h6: {
          fontSize: "28px",
          fontWeight: 600,
        },
        h7: {
            fontSize: "14px",
            fontWeight: 400,
        },
        body: {
          fontSize: "18px",
          fontWeight: 300,
        },
        body1: {
          fontWeight: 600,
        },
      },
    };
  
    const theme = createTheme(themeOptions);
  
    return (
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    );
  }
  
  export default ThemeProvider;