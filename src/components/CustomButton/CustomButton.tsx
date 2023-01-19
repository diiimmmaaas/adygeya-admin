import React from 'react'
import styles from './CustomButton.module.css'

type CustomButtonType = {
  name: string
}

const CustomButton: React.FC<CustomButtonType> = ({ name }) => {
  return <button className={styles.btn}>{name}</button>
}

export default CustomButton
