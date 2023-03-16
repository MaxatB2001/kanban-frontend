import React, { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: string;
  [x: string]: any
};

const Button: FC<ButtonProps> = ({ children, variant, onClick, className }) => {
  const buttonStyle = `
    ${className}
    p-1 rounded-md w-full flex justify-center
    ${
      variant == "primary"
        ? "bg-sky-800 text-white"
        : variant == "danger"
        ? "bg-red-500 text-white"
        : "bg-sky-800 text-white"
    }
  `;
  return <button onClick={onClick} className={buttonStyle}>{children}</button>;
};

export default Button;
