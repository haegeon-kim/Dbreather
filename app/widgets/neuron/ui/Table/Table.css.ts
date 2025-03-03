import { style } from "@vanilla-extract/css";

export const table = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: 60,
  height: 60,

  border: "1px solid #000",
  borderRadius: "50%",

  backgroundColor: "blue",

  ":hover": {
    transform: "scale(1.1)",
  },
});
