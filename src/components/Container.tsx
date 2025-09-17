import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string; // extra classes
  dFlex?: boolean; // enable flex
  flexDirection?: "row" | "column"; // flex direction
  justifyCenter?: boolean; // horizontal center
  alignCenter?: boolean; // vertical center
  fullHeight?: boolean; // 100vh
  fullWidth?: boolean; // 100vw
  drawBorder?: boolean; // border
  onClick?: () => void;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      className,
      dFlex = false,
      flexDirection,
      justifyCenter = false,
      alignCenter = false,
      fullHeight = false,
      fullWidth = false,
      drawBorder = false,
      onClick,
      ...rest
    }: ContainerProps,
    ref
  ) => {
    const containerClass = clsx(
      "container",
      {
        "d-flex": dFlex,
        "flex-column": flexDirection === "column",
        "flex-row": flexDirection === "row",
        "justify-content-center": justifyCenter,
        "align-items-center": alignCenter,
        "vh-100": fullHeight,
        "vw-100": fullWidth,
        border: drawBorder,
      },
      className
    );

    return (
      <div className={containerClass} ref={ref} onClick={onClick} {...rest}>
        {children}
      </div>
    );
  }
);
