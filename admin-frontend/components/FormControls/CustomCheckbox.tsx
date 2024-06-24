import React, { ChangeEvent } from 'react'

const CustomCheckbox = ({ name, isChecked, required, label, handleChange }: {
  isChecked: boolean;
  placeHolder?: string;
  required: boolean;
  name: string;
  label: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" name={name} id={name} required={required} checked={isChecked} onChange={handleChange} />
      <label htmlFor={name} className="text-sm select-none cursor-pointer font-medium">{label}</label>
    </div>
  )
}

export default CustomCheckbox
