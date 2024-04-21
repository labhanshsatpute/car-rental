import React, { ChangeEvent } from "react";

interface CustomSelectProps {
  value: string;
  required: boolean;
  name: string;
  label: string;
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  isHidden?: boolean;
  options: Array<{
    name: string,
    value: string
  }>
}

const CustomSelect = ({ value, required, name, label, handleChange, isHidden, options }: CustomSelectProps) => {
  return (
    <figure className={isHidden ? 'hidden': 'input-group'}>
      <label className='input-label' htmlFor={name}>
        {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
      </label>
      <select value={value} name={name} onChange={handleChange} required={required} className='input-box-md'>
        <option value="">Select {label}</option>
        {options.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
      </select>
    </figure>
  )
}

export default CustomSelect