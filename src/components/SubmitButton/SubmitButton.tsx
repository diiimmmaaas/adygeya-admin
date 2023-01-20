import React from 'react'
import styles from './SubmitButton.module.css'

type CustomButtonType = {
  name: string
}

const SubmitButton: React.FC<CustomButtonType> = ({ name }) => {
  return <button className={styles.submit}>{name}</button>
}

export default SubmitButton
