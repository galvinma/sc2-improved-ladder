// Global inline styles

import {
  getPageMarginsPaddingTop,
  getPageWrapperHeight,
} from ".././funcs/spacing";

export const pageWrapper = {
  height: "100%",
  minHeight: getPageWrapperHeight(),
  paddingTop: getPageMarginsPaddingTop(),
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "flex-start",
};
