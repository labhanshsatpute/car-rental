import { CustomButtonProps } from '@/types'
import React from 'react'

const CustomButton = ({ text, leftIcon, rightIcon, handleClick, type, styles, textStyles }: CustomButtonProps) => {
  return (
    <button type={type || "button"} onClick={handleClick} className={`bg-ascent-dark text-white py-3 text-sm font-medium px-5 rounded hover:bg-ascent transition duration-300 ease-in-out hover:ease-in-out flex items-center space-x-[3px] justify-center ${styles}`}>
      {leftIcon && <div>{leftIcon}</div> }
      <span className={textStyles}>{text}</span>
      {rightIcon && <div>{rightIcon}</div> }
    </button>
  )
}

export default CustomButton