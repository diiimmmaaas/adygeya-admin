import React from 'react'
import styles from './UploadDescriptionComponent.module.css'

type UploadDescriptionComponentPropsType = {
  title: string
  placeholder: string
}

const UploadDescriptionComponent: React.FC<UploadDescriptionComponentPropsType> = ({
  title,
  placeholder,
}) => {
  return (
    <div className={styles.uploadDescriptionContainer}>
      <h4 className={styles.uploadDescriptionTitle}>{title}</h4>
      <div className={styles.uploadDescriptionBoard}>
        <textarea placeholder={placeholder} className={styles.uploadDescriptionText}></textarea>
      </div>
    </div>
  )
}

export default UploadDescriptionComponent
