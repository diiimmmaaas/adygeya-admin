import React from 'react'
import styles from './UploadVideoComponent.module.css'
import CustomButton from '../CustomButton/CustomButton'

const UploadVideoComponent = () => {
  return (
    <div className={styles.uploadVideoContainer}>
      <h4 className={styles.uploadVideoText}>Видео</h4>
      <div className={styles.uploadVideoBoard}></div>
      <div className={styles.btnContainer}>
        <CustomButton name='Загрузить видео' />
      </div>
    </div>
  )
}

export default UploadVideoComponent
