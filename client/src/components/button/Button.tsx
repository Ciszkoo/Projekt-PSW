import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`bg-stone-500 py-2 px-4 rounded-full shadow-md focus:outline-none active:shadow-inner active:bg-stone-600 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
