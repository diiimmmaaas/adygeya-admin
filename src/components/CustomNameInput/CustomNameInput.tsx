import React from 'react'
import styles from './CustomNameInput.module.css'
import CustomInput from '../CustomInput/CustomInput'

type CustomNameInputType = {
  name: string
  placeholder: string
  type: string
}

const CustomNameInput: React.FC<CustomNameInputType> = ({ name, placeholder, type }) => {
  return (
    <div className={styles.objectNameContainer}>
      <h4 className={styles.objectNameTitle}>{name}</h4>
      <CustomInput placeholder={placeholder} type={type} />
    </div>
  )
}

export default CustomNameInput
