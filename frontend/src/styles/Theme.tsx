import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import variables from "./Variables.module.scss";
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/lato";

export const Theme = responsiveFontSizes(
  createTheme({
    typography: {
      h1: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      h2: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      h3: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      h4: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      h5: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      h6: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      subtitle1: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      subtitle2: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      body1: { fontFamily: "Lato, sans-serif", fontSize: "1.4rem" },
      body2: { fontFamily: "Lato, sans-serif", fontSize: "1.25rem" },
      button: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      caption: { fontFamily: "IBM Plex Sans Variable, sans-serif" },
      overline: { fontFamily: "IBM Plex Sans Variable, sans-serif" },

      allVariants: {
        color: variables.tertiaryBlue,
      },
    },
    palette: {
      primary: {
        main: variables.primaryBlue,
      },
      secondary: {
        main: variables.primaryBlack,
      },
    },
  })
);
