import type { FC } from "react";
import { SimpleSpinner } from "./SimpleSpinner";
import { cn } from "@/utilities";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600  disabled:opacity-75",
        props.className || ""
      )}
      type="button"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <SimpleSpinner /> : null}
      {children}
    </button>
  );
};
