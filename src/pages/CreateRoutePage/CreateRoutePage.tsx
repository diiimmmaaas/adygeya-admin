import React from 'react'
import styles from './CreateRoutePage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import Waypoints from '../../components/Waypoints/Waypoints'

const CreateRoutePage = () => {
  return (
    <div className={styles.routes}>
      <div className={main.container}>
        <h1 className={main.title}>Создать маршрут</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Название маршрута'
            placeholder='Введите название маршрута'
            type='text'
          />
          <div className={styles.uploadMediaContainer}>
            <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
            {/* <UploadPhotoComponent /> */}
            {/* <UploadVideoComponent /> */}
          </div>
          <Waypoints />
        </div>
        <SubmitButton name='Сохранить' />
      </div>
    </div>
  )
}

export default CreateRoutePage
