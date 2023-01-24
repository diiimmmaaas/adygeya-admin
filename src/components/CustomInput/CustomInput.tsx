import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './CustomInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type CustomInputType = DefaultInputPropsType & {
  value?: string
  placeholder?: string
  type?: string
  callbackHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput: React.FC<CustomInputType> = ({
  value,
  placeholder,
  type,
  callbackHandler,
  className,
  ...restProps
}) => {
  return (
    <input
      value={value}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      type={type}
      onChange={callbackHandler}
      autoComplete='on'
      {...restProps}
    />
  )
}

export default CustomInput
