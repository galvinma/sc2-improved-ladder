import {
  getPageMarginsPaddingLeftRight,
  getPageMarginsPaddingTop,
  getPageWrapperHeight,
} from ".././funcs/spacing";

export const pageWrapper = {
  minHeight: getPageWrapperHeight(),
  marginLeft: getPageMarginsPaddingLeftRight(),
  marginRight: getPageMarginsPaddingLeftRight(),
  marginTop: getPageMarginsPaddingTop(),
};

export const centerContent = {
  height: "100%",
  minHeight: getPageWrapperHeight(),
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  marginTop: getPageMarginsPaddingTop(),
};
