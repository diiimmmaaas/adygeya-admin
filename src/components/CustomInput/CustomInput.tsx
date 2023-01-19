import React from 'react'
import styles from './CustomInput.module.css'

type CustomInputType = {
  placeholder: string
  type: string
}

const CustomInput: React.FC<CustomInputType> = ({ placeholder, type }) => {
  return <input className={styles.input} type={type} placeholder={placeholder} />
}

export default CustomInput
