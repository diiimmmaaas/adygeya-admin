import React from 'react'
import styles from './HighlightComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'
import UploadDescriptionComponent from '../UploadDescriptionComponent/UploadDescriptionComponent'
import CustomButton from '../CustomButton/CustomButton'

const HighlightComponent = () => {
  return (
    <div className={styles.highlight}>
      <h2 className={styles.highlightTitle}>Хайлайт события</h2>
      <div className={styles.content}>
        <h4 className={styles.subTitle}>Загрузить медиа файлы</h4>
        <div className={styles.highlightContainer}>
          <div className={styles.imageContainer}>
            <h5 className={styles.h5}>Фото</h5>
            <div className={styles.image}></div>
            <CustomButton name='Загрузить фото' />
          </div>
          <div className={styles.highlightDescription}>
            <div className={styles.highlightBlock}>
              <h5 className={styles.h5}>Заголовок</h5>
              <CustomInput placeholder='Введите название хайлайта' type='text' />
            </div>
            <div>
              <h5 className={styles.h5}>Текст хайлайта</h5>
              <UploadDescriptionComponent placeholder='Введите описание хайлайта' title='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightComponent
