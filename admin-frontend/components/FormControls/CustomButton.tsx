import React, { MouseEventHandler } from "react";

interface CustomButtonProps {
  text: string;
  styles?: string;
  textStyles?: string;
  type?: "button" | "submit";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  theme: "primary" | "light" | "secondary";
}

const CustomButton = ({ text, leftIcon, rightIcon, handleClick, type, styles, textStyles, theme }: CustomButtonProps) => {

  return (
    <button type={type} onClick={handleClick} className={`btn-${theme}-md flex items-center justify-center ${styles}`}>
      {leftIcon && <div>{leftIcon}</div>}
      <span className={textStyles}>{text}</span>
      {rightIcon && <div>{rightIcon}</div>}
    </button>
  )
}

export default CustomButton