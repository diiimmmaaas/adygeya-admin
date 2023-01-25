import React from 'react'
import styles from './SubmitButton.module.css'

type CustomButtonType = {
  name: string
  onClickHandler?: () => void
}

const SubmitButton: React.FC<CustomButtonType> = ({ name, onClickHandler }) => {
  return (
    <button className={styles.submit} onClick={onClickHandler}>
      {name}
    </button>
  )
}

export default SubmitButton
