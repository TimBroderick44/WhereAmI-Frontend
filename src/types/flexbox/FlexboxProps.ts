import { ReactNode } from "react";

export interface FlexboxProps {
  flexdirection?: "column" | "row";
  justifycontent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  alignitems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  gap?: number;
  children: ReactNode;
}