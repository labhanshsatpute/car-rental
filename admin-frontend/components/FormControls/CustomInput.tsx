import React, { ChangeEvent } from "react";

interface CustomInputProps {
  value: string;
  placeHolder?: string;
  required: boolean;
  name: string;
  label: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  type: "text" | "number" | "datetime-local" | 'date' | 'time' | 'email' | 'password';
}

const CustomInput = ({ type, placeHolder, value, required, name, label, handleChange }: CustomInputProps) => {
  return (
    <figure className='flex flex-col space-y-2'>
      <label className='text-xs font-medium text-black' htmlFor={name}>
        {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
      </label>
      <input type={type} placeholder={placeHolder} value={value} onChange={handleChange} required={required} name={name} className='py-3 px-4 rounded-xl text-xs font-medium text-gray-900 border border-[#E0E5F2] bg-indigo-50 bg-opacity-0 w-full placeholder:text-black placeholder:font-normal placeholder:text-opacity-50' />
    </figure>
  )
}

export default CustomInput