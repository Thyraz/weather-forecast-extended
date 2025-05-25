import { css, unsafeCSS } from "lit";
// @ts-ignore: Will be loaded as string from parcel bundler
import customStyles from "bundle-text:./weather-forecast-extended.css";

export const styles = css`
  ${unsafeCSS(customStyles)}
`;
