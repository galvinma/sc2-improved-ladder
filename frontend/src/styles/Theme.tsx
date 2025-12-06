import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import variables from "./Variables.module.scss";

export const Theme = responsiveFontSizes(
  createTheme({
    typography: {
      allVariants: {
        color: variables.primaryBlack,
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
  }),
);
