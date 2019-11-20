import { createMuiTheme } from '@material-ui/core';
import tinycolor from "tinycolor2";

const primary = "#30303C";
const secondary = "#AE5F63";

const lightenRate = 7.5;
const darkenRate = 15;

const defaultTheme = {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#FFFFFF",
    },
    background: {
      default: '#F6F7FF',
      light: '#F3F5FF',
    },
  },
};

export const theme =  createMuiTheme({ ...defaultTheme });
