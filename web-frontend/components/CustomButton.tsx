import { CustomButtonProps } from '@/types'
import React from 'react'

const CustomButton = ({ text, leftIcon, rightIcon, handleClick, type, styles, textStyles }: CustomButtonProps) => {
  return (
    <button type={type || "button"} onClick={handleClick} className={`bg-ascent-dark text-white py-3 text-sm font-medium px-5 rounded hover:bg-ascent transition duration-500 ease-in-out hover:ease-in-out flex items-center space-x-3 ${styles}`}>
      {leftIcon && <div className='h-7 w-7 flex items-center justify-center bg-white bg-opacity-30 rounded-md'>{leftIcon}</div> }
      <span className={textStyles}>{text}</span>
      {rightIcon && <div className='h-7 w-7 flex items-center justify-center bg-white bg-opacity-30 rounded-md'>{rightIcon}</div> }
    </button>
  )
}

export default CustomButton