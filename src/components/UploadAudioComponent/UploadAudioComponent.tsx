import React from 'react'
import styles from './UploadAudioComponent.module.css'
import CustomButton from '../CustomButton/CustomButton'

const UploadAudioComponent = () => {
  return (
    <div className={styles.uploadAudioContainer}>
      <h4 className={styles.uploadAudioText}>Аудио</h4>
      <div className={styles.uploadAudioBoard}></div>
      <div className={styles.btnContainer}>
        <CustomButton name='Загрузить аудио' />
      </div>
    </div>
  )
}

export default UploadAudioComponent
