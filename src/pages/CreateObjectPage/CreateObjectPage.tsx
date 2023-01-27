import React, { useState } from 'react'
import styles from './CreateObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import UploadVideoComponent from '../../components/UploadVideoComponent/UploadVideoComponent'
import UploadAudioComponent from '../../components/UploadAudioComponent/UploadAudioComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import TimeTable from '../../components/TimeTable/TimeTable'
import ContactsComponent from '../../components/ContactsComponent/ContactsComponent'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import {
  postAudioForObject,
  postImageForObject,
  postObject,
} from '../../redux/actions/objectsActions'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { AudioParametersType, CheckedParametersType } from './types';

const categories = [
  {
    id: 1,
    name: 'Достопримечательности',
    subCategories: [
      { id: 7, name: 'Культурные достопримечательности' },
      { id: 8, name: 'Природные достопримечательности' },
    ],
  },
  {
    id: 2,
    name: ' Активный отдых',
    subCategories: [
      { id: 16, name: 'Рафтинг' },
      { id: 17, name: 'Конные прогулки' },
      { id: 18, name: 'Квадроциклы' },
      { id: 19, name: 'Джимпинг' },
      { id: 20, name: 'Экстрим' },
      { id: 21, name: 'Зимний отдых' },
    ],
  },
  {
    id: 4,
    name: 'Места отдыха',
    subCategories: [
      { id: 22, name: 'Термальные источники' },
      { id: 23, name: 'Бани' },
      { id: 24, name: 'Бассейны ' },
      { id: 25, name: 'Место для пикника' },
    ],
  },
  {
    id: 5,
    name: 'Проживание',
    subCategories: [
      { id: 9, name: 'Отели' },
      { id: 10, name: 'Базы отдыха' },
      { id: 11, name: 'Глэмпинги' },
      { id: 12, name: 'Кемпинги' },
    ],
  },
  {
    id: 6,
    name: 'Питание',
    subCategories: [
      { id: 13, name: 'Рестораны' },
      { id: 14, name: 'Кафе' },
      { id: 15, name: 'Магазины' },
    ],
  },
]

const options = [
  { label: 'Достопримечательности (музеи, объекты архитектуры и т.д.)', value: 'museum' },
  { label: 'Достопримечательности (горы)', value: 'mountain' },
  { label: 'Активный отдых', value: 'skiing' },
  { label: 'Места отдыха', value: 'highway' },
  { label: 'Маршруты', value: 'route' },
  { label: 'Проживание', value: 'lodging' },
  { label: 'Питание', value: 'restaraunt' },
]

const CreateObjectPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(1)
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [photosFiles, setPhotosFiles] = useState<any>()
  const [audioFiles, setAudioFiles] = useState<any>()
  const [videosFiles, setVideosFiles] = useState<any>()
  const [audioParameters, setAudioParameters] = useState<AudioParametersType>({
    voiced: '',
    voicedLink: '',
  })

  const [checkedParameters, setCheckedParameters] = useState<CheckedParametersType>({
    name: '',
    icon: '',
    description: '',
    location: {
      longitude: 0,
      latitude: 0,
      address: '',
    },
    schedule: [
      { weekday: 0, open: '', close: '' },
      { weekday: 1, open: '', close: '' },
      { weekday: 2, open: '', close: '' },
      { weekday: 3, open: '', close: '' },
      { weekday: 4, open: '', close: '' },
      { weekday: 5, open: '', close: '' },
      { weekday: 6, open: '', close: '' },
    ],
    contacts: [
      { name: 'Мобильный телефон', contact: '' },
      { name: 'Сайт', contact: '' },
      { name: 'Почта', contact: '' },
    ],
    categories: [],
    waypoints: [],
    filters: [],
    publishAt: null,
  })
  const { token } = useAppSelector((state) => state.auth)
  const { isLoading, isLoadingPhoto, isLoadingAudio, id } = useAppSelector((state) => state.objects)

  const dispatch = useAppDispatch()

  const onChangeObjectNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({ ...checkedParameters, name: e.target.value })
  }
  const onChangeObjectAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      location: { ...checkedParameters.location, address: e.target.value },
    })
  }
  const onChangeObjectLatitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      location: { ...checkedParameters.location, latitude: +e.target.value },
    })
  }
  const onChangeObjectLongitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      location: { ...checkedParameters.location, longitude: +e.target.value },
    })
  }
  const onChangePhoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      contacts: checkedParameters.contacts.map((ctc) =>
        ctc.name === 'Мобильный' + ' телефон'
          ? {
              ...ctc,
              contact: e.target.value,
            }
          : { ...ctc },
      ),
    })
  }
  const onChangeSiteNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      contacts: checkedParameters.contacts.map((ctc) =>
        ctc.name === 'Сайт' ? { ...ctc, contact: e.target.value } : { ...ctc },
      ),
    })
  }
  const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      contacts: checkedParameters.contacts.map((ctc) =>
        ctc.name === 'Почта' ? { ...ctc, contact: e.target.value } : { ...ctc },
      ),
    })
  }
  const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckedParameters({ ...checkedParameters, description: e.target.value })
  }
  const onOpenChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => {
    setCheckedParameters({
      ...checkedParameters,
      schedule: checkedParameters.schedule.map((ctc) =>
        ctc.weekday === weekday ? { ...ctc, open: e.target.value } : { ...ctc },
      ),
    })
  }
  const onCloseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => {
    setCheckedParameters({
      ...checkedParameters,
      schedule: checkedParameters.schedule.map((ctc) =>
        ctc.weekday === weekday ? { ...ctc, close: e.target.value } : { ...ctc },
      ),
    })
  }
  const onChangeNameOfArtistHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioParameters({
      ...audioParameters,
      voiced: e.target.value,
    })
  }
  const onChangeArtistLinkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioParameters({
      ...audioParameters,
      voicedLink: e.target.value,
    })
  }

  const onSubmitFormHandler = async () => {
    const resultAction = await dispatch(postObject({ checkedParameters, token }))
    if (postObject.rejected.match(resultAction)) {
      setError(false)
      const timer = setTimeout(() => {
        setError(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
    if (postObject.fulfilled.match(resultAction)) {
      if (photosFiles) {
        const timer = setTimeout(async () => {
          for (const photo of photosFiles) {
            const formData = new FormData()
            formData.append('image', photo)
            await dispatch(postImageForObject({ formData, id: id, token }))
          }

          return () => clearTimeout(timer)
        }, 2000)
      }
      if (audioFiles) {
        const timer = setTimeout(async () => {
          for (const audio of audioFiles) {
            const formData = new FormData()
            formData.append('audio', audio)
            formData.append('voiced', audioParameters.voiced)
            formData.append('voicedLink', audioParameters.voicedLink)
            await dispatch(
              postAudioForObject({
                formData,
                id: id,
                token,
              }),
            )
          }

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

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.object}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Объект был успешно добавлен</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при создании объекта, попробуйте еще раз...
          </div>
        )}
      </div>
      <div className={main.container}>
        <h1 className={main.title}>Создать объект</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Название объекта'
            placeholder='Введите название объекта'
            type='text'
            callbackHandler={onChangeObjectNameHandler}
          />
          <CustomNameInput
            name='Адрес объекта'
            placeholder='Введите адрес объекта'
            type='text'
            callbackHandler={onChangeObjectAddressHandler}
          />
          <CustomDoubleInputComponent
            name='Координаты объекта'
            firstPlaceholder='Введите широту'
            secondPlaceholder='Введите долготу'
            firstSubTitle='Широта'
            secondSubTitle='Долгота'
            type='text'
            callbackFirstHandler={onChangeObjectLatitudeHandler}
            callbackSecondHandler={onChangeObjectLongitudeHandler}
          />
          <div className={styles.selectBlock}>
            <h4 className={styles.objectNameTitle}>Выберите тип иконки</h4>
            <CustomSelect
              value={options[0].label}
              defaultValue='admin'
              options={options}
              callbackHandler={(newValue) => {
                setCheckedParameters({ ...checkedParameters, icon: newValue.value })
              }}
            />
          </div>
          <div className={styles.categoriesBlock}>
            <h4 className={styles.categoriesTitle}>Выбрать категорию объекта</h4>
            <div className={styles.categoriesContainer}>
              {categories.map((category) => {
                const onActiveCategory = () => {
                  setActiveCategoryId(category.id)
                  setActiveCategory(categories.indexOf(category))
                }
                return (
                  <div
                    key={category.id}
                    className={
                      activeCategoryId === category.id
                        ? `${styles.categoryBlock} ${styles.activeCategoryBlock}`
                        : styles.categoryBlock
                    }
                    onClick={onActiveCategory}
                  >
                    <p
                      className={
                        activeCategoryId === category.id
                          ? `${styles.categoryName} ${styles.activeCategoryName}`
                          : styles.categoryName
                      }
                    >
                      {category.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.subCategoriesBlock}>
            <h4 className={styles.categoriesTitle}>Выбрать подкатегорию объекта</h4>
            <div className={styles.categoriesContainer}>
              {categories[activeCategory].subCategories.map((subcategory) => {
                const onActiveSubCategory = () => {
                  setActiveSubCategoryId(subcategory.id)
                  setCheckedParameters({
                    ...checkedParameters,
                    categories: [subcategory.id],
                  })
                }
                return (
                  <div
                    key={subcategory.id}
                    className={
                      activeSubCategoryId === subcategory.id
                        ? `${styles.categoryBlock} ${styles.activeCategoryBlock}`
                        : styles.categoryBlock
                    }
                    onClick={onActiveSubCategory}
                  >
                    <p
                      className={
                        activeSubCategoryId === subcategory.id
                          ? `${styles.categoryName} ${styles.activeCategoryName}`
                          : styles.categoryName
                      }
                    >
                      {subcategory.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.uploadMediaContainer}>
            <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
            {isLoadingPhoto ? (
              <Loading />
            ) : (
              <UploadPhotoComponent setPhotosFiles={setPhotosFiles} />
            )}
            <UploadVideoComponent setVideosFiles={setVideosFiles} />
            {isLoadingAudio ? <Loading /> : <UploadAudioComponent setAudioFiles={setAudioFiles} />}
            <CustomNameInput
              name='Исполнитель'
              placeholder='Введите имя исполнителя'
              type='text'
              callbackHandler={onChangeNameOfArtistHandler}
            />
            <CustomNameInput
              name='Ссылка на аккаунт исполнителя'
              placeholder='Введите ссылку'
              type='text'
              callbackHandler={onChangeArtistLinkHandler}
            />
            <UploadDescriptionComponent
              placeholder='Добавьте описание объекта'
              title='Описание'
              callbackHandler={onChangeDescriptionHandler}
            />
            <TimeTable
              onOpenChangeHandler={onOpenChangeHandler}
              onCloseChangeHandler={onCloseChangeHandler}
            />
            <ContactsComponent
              onChangePhoneNumberHandler={onChangePhoneNumberHandler}
              onChangeSiteNameHandler={onChangeSiteNameHandler}
              onChangeEmailHandler={onChangeEmailHandler}
            />
            <div className={styles.submitContainer}>
              <SubmitButton name='Сохранить' onClickHandler={onSubmitFormHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateObjectPage
