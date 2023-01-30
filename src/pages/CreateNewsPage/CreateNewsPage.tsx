import React, { useState } from 'react'
import styles from './CreateNewsPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import HighlightComponent from '../../components/HighlightComponent/HighlightComponent'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import InputMask from 'react-input-mask'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import { options } from '../CreateObjectPage/CreateObjectPage'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { postHighlightForNews, postImageForNews, postNews } from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'

export type CheckedNewsParametersType = {
  title: string
  description: string
  date: string
  publishAt: string
  icon: string
  location: {
    longitude: number
    latitude: number
    address: string
  }
  stories: {
    title: string
    content: string
  }
}

const CreateNewsPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
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

  const { token } = useAppSelector((state) => state.auth)
  const { isLoading, isLoadingPhoto, isLoadingHighlight, id } = useAppSelector(
    (state) => state.news,
  )

  const dispatch = useAppDispatch()

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

  const onSubmitFormHandler = async () => {
    const resultAction = await dispatch(postNews({ checkedNewsParameters, token }))
    if (postNews.rejected.match(resultAction)) {
      setError(false)
      const timer = setTimeout(() => {
        setError(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
    if (postNews.fulfilled.match(resultAction)) {
      if (photosNewsFiles) {
        const timer = setTimeout(async () => {
          for (const photo of photosNewsFiles) {
            const formData = new FormData()
            formData.append('image', photo)
            await dispatch(postImageForNews({ formData, id: id, token }))
          }

          return () => clearTimeout(timer)
        }, 2000)
      }
      if (photoHighlightFiles) {
        const timer = setTimeout(async () => {
          const formData = new FormData()
          formData.append('image', photoHighlightFiles)
          await dispatch(postHighlightForNews({ formData, id: 4, token }))

          return () => clearTimeout(timer)
        }, 2000)
      }
      setCorrect(true)
      const timer = setTimeout(() => {
        setCorrect(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }

  console.log(checkedNewsParameters)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.news}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Событие было успешно добавлено</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при создании события, попробуйте еще раз...
          </div>
        )}
      </div>
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
              placeholder='Введите дату добавления уведомления'
              type='text'
              className={styles.input}
              onChange={onChangeNewsDateHandler}
            />
          </div>
          <div className={styles.dateBlock}>
            <h4 className={styles.dateText}>Дата отправки</h4>
            <InputMask
              mask='99-99-9999'
              placeholder='Введите дату отправки уведомления'
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
    </div>
  )
}

export default CreateNewsPage
