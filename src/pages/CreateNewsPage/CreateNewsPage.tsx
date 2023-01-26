import React from 'react'
import styles from './CreateNewsPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import UploadVideoComponent from '../../components/UploadVideoComponent/UploadVideoComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import HighlightComponent from '../../components/HighlightComponent/HighlightComponent'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

const CreateNewsPage = () => {
  return (
    <div className={styles.news}>
      <div className={main.container}>
        <h1 className={main.title}>Создать событие</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Название объекта'
            placeholder='Введите название объекта'
            type='text'
          />
          <CustomNameInput name='Адрес объекта' placeholder='Введите адрес объекта' type='text' />
          <CustomDoubleInputComponent
            name='Дата'
            firstPlaceholder='Введите день'
            secondPlaceholder='Введите месяц'
            firstSubTitle='День'
            secondSubTitle='Месяц'
            type='text'
          />
          <CustomNameInput
            name='Краткое описание события (для плашки в категории)'
            placeholder='Введите краткое название события'
            type='text'
          />
          <div className={styles.uploadMediaContainer}>
            <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
            {/* <UploadPhotoComponent /> */}
            {/* <UploadVideoComponent /> */}
            <UploadDescriptionComponent placeholder='' title='Описание' />
          </div>
          <HighlightComponent />
        </div>
        <SubmitButton name='Сохранить' />
      </div>
    </div>
  )
}

export default CreateNewsPage
