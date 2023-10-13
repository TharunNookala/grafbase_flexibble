import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
type Props = {
    title : string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    isSubmitting?: boolean;
    type?: 'button' | 'submit';
    textColor?: string;
    bgColor?: string;
}
const Button = ({title, leftIcon, rightIcon, handleClick, isSubmitting, type, textColor, bgColor}: Props) => {
  return (
    <button
    type={type || 'button'}
    disabled={isSubmitting}
    className={`flex items-center justify-center gap-3 px-3 py-2 font-medium rounded 
        ${textColor || 'text-white'} 
        ${isSubmitting ? 'bg-black/50' : bgColor 
        ? bgColor : 'bg-black'}`
    }
    onClick={handleClick}
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt='left'/>}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right'/>}
    </button>
  )
}

export default Button