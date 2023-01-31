import React from 'react'
import styles from './CustomNameInput.module.css'
import CustomInput from '../CustomInput/CustomInput'

type CustomNameInputType = {
  name: string
  placeholder: string
  type: string
  value?: string
  callbackHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomNameInput: React.FC<CustomNameInputType> = ({
  name,
  placeholder,
  type,
  value,
  callbackHandler,
}) => {
  return (
    <div className={styles.objectNameContainer}>
      <h4 className={styles.objectNameTitle}>{name}</h4>
      <CustomInput
        placeholder={placeholder}
        type={type}
        callbackHandler={callbackHandler}
        value={value}
      />
    </div>
  )
}

export default React.memo(CustomNameInput)
