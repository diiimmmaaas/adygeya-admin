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
import { GetCurrentNewsType } from '../../redux/types/types'
import { options } from '../ObjectPageMainContainer/ObjectPageMainContainer'

export type NewsPageMainContainerPropsType = {
  currentNews?: GetCurrentNewsType
  isLoadingPhoto: boolean
  isLoadingHighlight: boolean
  onSubmitForm: (
    checkedNewsParameters: CheckedNewsParametersType,
    photosNewsFiles: any,
    photoHighlightFiles: any,
  ) => void
  handleDeleteUploadedPhoto: (imageId: number) => void
}

const NewsPageMainContainer: React.FC<NewsPageMainContainerPropsType> = ({
  currentNews,
  isLoadingPhoto,
  isLoadingHighlight,
  onSubmitForm,
  handleDeleteUploadedPhoto,
}) => {
  const [photosNewsFiles, setPhotosNewsFiles] = useState<any>()
  const [photoHighlightFiles, setPhotoHighlightFiles] = useState<any>()

  const [checkedNewsParameters, setCheckedNewsParameters] = useState<CheckedNewsParametersType>({
    title: currentNews?.title ? currentNews?.title : '',
    description: currentNews?.description ? currentNews?.description : '',
    date: currentNews?.date ? currentNews?.date.split('-').reverse().join('-') : '',
    publishAt: currentNews?.publishAt
      ? currentNews?.publishAt.slice(0, 10).split('-').reverse().join('-')
      : '',
    icon: currentNews?.icon ? currentNews?.icon : 'museum',
    location: {
      longitude: currentNews?.location?.longitude ? currentNews?.location?.longitude : 0,
      latitude: currentNews?.location?.latitude ? currentNews?.location?.latitude : 0,
      address: currentNews?.location?.address ? currentNews?.location?.address : '',
    },
    stories: {
      title: currentNews?.stories?.title ? currentNews?.stories?.title : '',
      content: currentNews?.stories?.content ? currentNews?.stories?.content : '',
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
      location: { ...checkedNewsParameters.location, latitude: e.target.value },
    })
  }
  const onChangeNewsLongitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedNewsParameters({
      ...checkedNewsParameters,
      location: { ...checkedNewsParameters.location, longitude: e.target.value },
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
      <div className={styles.content}>
        <CustomNameInput
          value={checkedNewsParameters.title}
          name='Название события'
          placeholder='Введите название события'
          type='text'
          callbackHandler={onChangeNewsNameHandler}
        />
        <CustomNameInput
          value={checkedNewsParameters.location.address}
          name='Адрес объекта'
          placeholder='Введите адрес объекта'
          type='text'
          callbackHandler={onChangeNewsAddressHandler}
        />
        <div className={styles.dateBlock}>
          <h4 className={styles.dateText}>Дата добавления</h4>
          <InputMask
            value={checkedNewsParameters.date}
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
            value={checkedNewsParameters.publishAt}
            mask='99-99-9999'
            placeholder='Введите дату публикации новости'
            type='text'
            className={styles.input}
            onChange={onChangeNewsDateSendHandler}
          />
        </div>
        <CustomDoubleInputComponent
          firstValue={checkedNewsParameters.location.latitude}
          secondValue={String(checkedNewsParameters.location.longitude)}
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
            value={checkedNewsParameters.icon}
            defaultValue='Select...'
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
            <UploadPhotoComponent
              setPhotosFiles={setPhotosNewsFiles}
              images={currentNews?.images}
              handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
            />
          )}
          <UploadDescriptionComponent
            value={checkedNewsParameters.description}
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
