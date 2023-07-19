import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    text: string;
    styles?: string;
    textStyles?: string;
    type?: "button" | "submit";
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}