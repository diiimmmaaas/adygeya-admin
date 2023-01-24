import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import styles from './CustomButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type CustomButtonType = DefaultButtonPropsType & {
  name?: string
}

const CustomButton: React.FC<CustomButtonType> = ({
  name,
  type,
  disabled,
  onClick,
  ...restProps
}) => {
  return (
    <button type={type} disabled={disabled} className={styles.btn} onClick={onClick} {...restProps}>
      {name}
    </button>
  )
}

export default CustomButton
