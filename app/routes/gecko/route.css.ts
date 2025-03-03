import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",

  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "100%",
});

export const title = style({
  marginBottom: "2rem",
  fontSize: "1.875rem",
  fontWeight: "700",
  color: "white",
});

export const description = style({
  marginTop: "2rem",
  textAlign: "center",
  color: "#D1D5DB",
});
