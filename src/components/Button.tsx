import type { ReactNode } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  bootstrapVariant?: "primary" | "secondary" | "warning" | "danger";
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      bootstrapVariant = "primary",
      type = "button",
      children,
      onClick,
      disabled = false,
    }: ButtonProps,
    ref
  ) => {
    const bootstrapClassName = clsx(
      "btn",
      `btn-${bootstrapVariant}`,
      `${className || ""}`
    );
    return (
      <button
        ref={ref}
        className={bootstrapClassName}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );
  }
);
