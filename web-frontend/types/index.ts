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

export interface CustomInputProps {
    value: string;
    placeHolder?: string;
    required: boolean;
    name: string;
    label: string;
    type: "text" | "number" | "datetime-local" | 'date' | 'time';
}