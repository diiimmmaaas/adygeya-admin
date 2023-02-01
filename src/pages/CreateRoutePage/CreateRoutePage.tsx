import React, { useState } from 'react'
import styles from './CreateRoutePage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import Waypoints from '../../components/Waypoints/Waypoints'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import { useAppDispatch } from '../../redux/utils/redux-utils'

const CreateRoutePage = () => {
  const dispatch = useAppDispatch()
  const [photoFiles, setPhotoFiles] = useState<any>()
  // const handleSendData = async () => {}

  const onChangeRouteName = () => {}
  const onChangeRouteDescription = () => {}
  return (
    <div className={styles.routes}>
      <div className={main.container}>
        <h1 className={main.title}>Создать маршрут</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Название маршрута'
            placeholder='Введите название маршрута'
            type='text'
            callbackHandler={onChangeRouteName}
          />
          <CustomNameInput
            name='Описание маршрута'
            placeholder='Введите описание маршрута'
            type='text'
            callbackHandler={onChangeRouteDescription}
          />
          <div className={styles.uploadMediaContainer}>
            <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
            <UploadPhotoComponent
              setPhotosFiles={setPhotoFiles}
              handleDeleteUploadedPhoto={() => console.log('поменять')}
            />
          </div>
          <Waypoints />
        </div>
        <SubmitButton name='Сохранить' />
      </div>
    </div>
  )
}

export default CreateRoutePage
