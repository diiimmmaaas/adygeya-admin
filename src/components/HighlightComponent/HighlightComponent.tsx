import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './HighlightComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'
import UploadDescriptionComponent from '../UploadDescriptionComponent/UploadDescriptionComponent'
import CustomButton from '../CustomButton/CustomButton'
import { CheckedNewsParametersType } from '../../pages/CreateNewsPage/CreateNewsPage'

type HighlightComponentPropsType = {
  setPhotoHighlightFiles: (photoHighlightFiles: any) => void
  setCheckedNewsParameters: (checkedNewsParameters: CheckedNewsParametersType) => void
  checkedNewsParameters: any
}

const HighlightComponent: React.FC<HighlightComponentPropsType> = ({
  setPhotoHighlightFiles,
  setCheckedNewsParameters,
  checkedNewsParameters,
}) => {
  const [photo, setPhoto] = useState<string>()

  const filePicker = useRef<HTMLInputElement | null>(null)

  const handlePick = (): void => {
    filePicker.current?.click()
  }

  const onChangeTitleHighlightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      stories: { ...checkedNewsParameters.stories, title: e.target.value },
    })
  }
  const onChangeDescriptionHighlightHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      stories: { ...checkedNewsParameters.stories, content: e.target.value },
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setPhotoHighlightFiles(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
    }
  }

  return (
    <div className={styles.highlight}>
      <h2 className={styles.highlightTitle}>Хайлайт события</h2>
      <div className={styles.content}>
        <h4 className={styles.subTitle}>Загрузить медиа файлы</h4>
        <div className={styles.highlightContainer}>
          <div className={styles.imageContainer}>
            <h5 className={styles.h5}>Фото</h5>
            <input
              className={styles.inputFile}
              ref={filePicker}
              type='file'
              name='photos'
              placeholder='Добавьте картинки'
              id='filephotos'
              onChange={handleFileChange}
              accept='image/*'
            />
            <div className={styles.imageBlock}>
              {photo && <img className={styles.image} src={photo} alt='highlight' />}
            </div>
            <div onClick={handlePick}>
              <CustomButton name='Загрузить фото' />
            </div>
          </div>
          <div className={styles.highlightDescription}>
            <div className={styles.highlightBlock}>
              <h5 className={styles.h5}>Заголовок</h5>
              <CustomInput
                placeholder='Введите название хайлайта'
                type='text'
                onChange={onChangeTitleHighlightHandler}
              />
            </div>
            <div>
              <h5 className={styles.h5}>Текст хайлайта</h5>
              <UploadDescriptionComponent
                placeholder='Введите описание хайлайта'
                title='Описание'
                callbackHandler={onChangeDescriptionHighlightHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightComponent
