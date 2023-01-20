import React from 'react'
import styles from './UploadPhotoComponent.module.css'
import CustomButton from '../CustomButton/CustomButton'

const UploadPhotoComponent = () => {
  return (
    <div className={styles.uploadPhotoContainer}>
      <h4 className={styles.uploadPhotoText}>Фото</h4>
      <div className={styles.uploadPhotoBoard}></div>
      <div className={styles.btnContainer}>
        <CustomButton name='Загрузить фото' />
      </div>
    </div>
  )
}

export default UploadPhotoComponent
