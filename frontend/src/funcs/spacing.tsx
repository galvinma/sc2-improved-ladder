import variables from ".././styles/Variables.module.scss";

import * as spacing from "./spacing";

export const getAppBarHeight = () => {
  return spacing.convertRemToPixels(variables.appBarHeight);
};

export const getAppFooterHeight = () => {
  return spacing.convertRemToPixels(variables.appFooterHeight);
};

export const getPageMarginsPaddingTop = () => {
  return spacing.convertRemToPixels(variables.appBarHeight);
};

export const getPageWrapperHeight = () => {
  return (
    window.innerHeight -
    spacing.getAppBarHeight() -
    spacing.getAppFooterHeight()
  );
};

export const getDocumentFontSize = () => {
  return window.getComputedStyle(document.documentElement).fontSize;
};

export const convertRemToPixels = (rem: string) => {
  return parseFloat(rem) * parseFloat(spacing.getDocumentFontSize());
};
