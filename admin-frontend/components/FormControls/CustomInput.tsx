import React, { ChangeEvent } from "react";

interface CustomInputProps {
  value: string;
  placeHolder?: string;
  required: boolean;
  name: string;
  label: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  type: "text" | "number" | "datetime-local" | 'date' | 'time' | 'email' | 'password' | 'month';
  isHidden?: boolean;
}

const CustomInput = ({ type, placeHolder, value, required, name, label, handleChange, isHidden }: CustomInputProps) => {
  return (
    <figure className={isHidden ? 'hidden': 'input-group'}>
      <label className='input-label' htmlFor={name}>
        {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
      </label>
      <input type={type} placeholder={placeHolder} value={value} onChange={handleChange} required={required} name={name} className='input-box-md' />
    </figure>
  )
}

export default CustomInput