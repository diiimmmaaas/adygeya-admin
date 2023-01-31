import React, { useState } from 'react'
import styles from './NewsPageMainContainer.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import HighlightComponent from '../../components/HighlightComponent/HighlightComponent'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import InputMask from 'react-input-mask'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import Loading from '../../components/Loading/Loading'
import { CheckedNewsParametersType } from '../../pages/CreateNewsPage/CreateNewsPage'
import { options } from '../../pages/CreateObjectPage/CreateObjectPage'

export type NewsPageMainContainerPropsType = {
  isLoadingPhoto: boolean
  isLoadingHighlight: boolean
  onSubmitForm: (
    checkedNewsParameters: CheckedNewsParametersType,
    photosNewsFiles: any,
    photoHighlightFiles: any,
  ) => void
}

const NewsPageMainContainer: React.FC<NewsPageMainContainerPropsType> = ({
  isLoadingPhoto,
  isLoadingHighlight,
  onSubmitForm,
}) => {
  const [photosNewsFiles, setPhotosNewsFiles] = useState<any>()
  const [photoHighlightFiles, setPhotoHighlightFiles] = useState<any>()

  const [checkedNewsParameters, setCheckedNewsParameters] = useState<CheckedNewsParametersType>({
    title: '',
    description: '',
    date: '',
    publishAt: '',
    icon: '',
    location: {
      longitude: 0,
      latitude: 0,
      address: '',
    },
    stories: {
      title: '',
      content: '',
    },
  })

  const onChangeNewsNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({ ...checkedNewsParameters, title: e.target.value })
  }
  const onChangeNewsAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      location: { ...checkedNewsParameters.location, address: e.target.value },
    })
  }
  const onChangeNewsDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({ ...checkedNewsParameters, date: e.target.value })
  }
  const onChangeNewsDateSendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({ ...checkedNewsParameters, publishAt: e.target.value })
  }
  const onChangeNewsLatitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      location: { ...checkedNewsParameters.location, latitude: +e.target.value },
    })
  }
  const onChangeNewsLongitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      location: { ...checkedNewsParameters.location, longitude: +e.target.value },
    })
  }
  const onChangeNewsDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckedNewsParameters({ ...checkedNewsParameters, description: e.target.value })
  }

  const onSubmitFormHandler = () => {
    onSubmitForm(checkedNewsParameters, photosNewsFiles, photoHighlightFiles)
  }

  return (
    <div className={main.container}>
      <h1 className={main.title}>Создать событие</h1>
      <div className={styles.content}>
        <CustomNameInput
          name='Название события'
          placeholder='Введите название события'
          type='text'
          callbackHandler={onChangeNewsNameHandler}
        />
        <CustomNameInput
          name='Адрес объекта'
          placeholder='Введите адрес объекта'
          type='text'
          callbackHandler={onChangeNewsAddressHandler}
        />
        <div className={styles.dateBlock}>
          <h4 className={styles.dateText}>Дата добавления</h4>
          <InputMask
            mask='99-99-9999'
            placeholder='Введите дату добавления новости'
            type='text'
            className={styles.input}
            onChange={onChangeNewsDateHandler}
          />
        </div>
        <div className={styles.dateBlock}>
          <h4 className={styles.dateText}>Дата публикации</h4>
          <InputMask
            mask='99-99-9999'
            placeholder='Введите дату публикации новости'
            type='text'
            className={styles.input}
            onChange={onChangeNewsDateSendHandler}
          />
        </div>
        <CustomDoubleInputComponent
          name='Координаты события'
          firstPlaceholder='Введите широту'
          secondPlaceholder='Введите долготу'
          firstSubTitle='Широта'
          secondSubTitle='Долгота'
          type='text'
          callbackFirstHandler={onChangeNewsLatitudeHandler}
          callbackSecondHandler={onChangeNewsLongitudeHandler}
        />
        <div className={styles.selectBlock}>
          <h4 className={styles.objectNameTitle}>Выберите тип иконки</h4>
          <CustomSelect
            value={options[0].label}
            defaultValue='admin'
            options={options}
            callbackHandler={(newValue) => {
              setCheckedNewsParameters({
                ...checkedNewsParameters,
                icon: newValue.value,
              })
            }}
          />
        </div>
        <div className={styles.uploadMediaContainer}>
          <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
          {isLoadingPhoto ? (
            <Loading />
          ) : (
            <UploadPhotoComponent setPhotosFiles={setPhotosNewsFiles} />
          )}
          <UploadDescriptionComponent
            placeholder='Добавьте описание события'
            title='Описание'
            callbackHandler={onChangeNewsDescriptionHandler}
          />
        </div>
        {isLoadingHighlight ? (
          <Loading />
        ) : (
          <HighlightComponent
            checkedNewsParameters={checkedNewsParameters}
            setPhotoHighlightFiles={setPhotoHighlightFiles}
            setCheckedNewsParameters={setCheckedNewsParameters}
          />
        )}
      </div>
      <SubmitButton name='Сохранить' onClickHandler={onSubmitFormHandler} />
    </div>
  )
}

export default NewsPageMainContainer
