import React from 'react'
import styles from './UploadDescriptionComponent.module.css'

const UploadDescriptionComponent = () => {
  return (
    <div className={styles.uploadDescriptionContainer}>
      <h4 className={styles.uploadDescriptionTitle}>Описание</h4>
      <div className={styles.uploadDescriptionBoard}>
        <textarea className={styles.uploadDescriptionText}></textarea>
      </div>
    </div>
  )
}

export default UploadDescriptionComponent
