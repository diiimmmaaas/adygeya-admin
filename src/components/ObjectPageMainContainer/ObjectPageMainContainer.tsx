import React, { useState } from 'react'
import styles from './ObjectPageMainContainer.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import Loading from '../../components/Loading/Loading'
import { AudioParametersType, CheckedParametersType } from '../../pages/CreateObjectPage/types'
import UploadAudioComponent from '../UploadAudioComponent/UploadAudioComponent'
import TimeTable from '../TimeTable/TimeTable'
import ContactsComponent from '../ContactsComponent/ContactsComponent'
import { getCurrentObject } from '../../redux/actions/objectsActions'
import { GetCurrentObjectType } from '../../redux/types/types'
import InputMask from 'react-input-mask'

const categoriesArray = [
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

export const options = [
  { label: 'Достопримечательности (музеи, объекты архитектуры и т.д.)', value: 'museum' },
  { label: 'Достопримечательности (горы)', value: 'mountain' },
  { label: 'Активный отдых', value: 'skiing' },
  { label: 'Места отдыха', value: 'highway' },
  { label: 'Маршруты', value: 'route' },
  { label: 'Проживание', value: 'lodging' },
  { label: 'Питание', value: 'restaraunt' },
]

export type ObjectPageMainContainerPropsType = {
  currentObject?: GetCurrentObjectType
  isLoadingPhoto: boolean
  isLoadingAudio: boolean
  onSubmitForm: (
    checkedParameters: CheckedParametersType,
    photosFiles: any,
    audioFiles: any,
    audioParameters: AudioParametersType,
  ) => void
  handleDeleteUploadedPhoto: (imageId: number) => void
  handleDeleteUploadedAudio: (audioId: number) => void
}

const ObjectPageMainContainer: React.FC<ObjectPageMainContainerPropsType> = ({
  currentObject,
  isLoadingPhoto,
  isLoadingAudio,
  onSubmitForm,
  handleDeleteUploadedPhoto,
  handleDeleteUploadedAudio,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(1)
  const [activeCategory, setActiveCategory] = useState(
    currentObject?.categories[0] !== undefined ? currentObject?.categories[0]?.id : 0,
  )
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(
    currentObject?.categories[1] !== undefined ? currentObject?.categories[1]?.id : 0,
  )
  const [photosFiles, setPhotosFiles] = useState<any>()
  const [audioFiles, setAudioFiles] = useState<any>()
  const [audioParameters, setAudioParameters] = useState<AudioParametersType>({
    voiced: currentObject?.audio?.voiced ? currentObject?.audio?.voiced : '',
    voicedLink: currentObject?.audio?.voicedLink ? currentObject?.audio?.voicedLink : '',
  })

  const [checkedParameters, setCheckedParameters] = useState<CheckedParametersType>({
    name: currentObject ? currentObject.name : '',
    icon: currentObject ? currentObject.icon : '',
    description: currentObject ? currentObject.description : '',
    location: {
      longitude: currentObject?.location ? currentObject.location.longitude : 0,
      latitude: currentObject?.location ? currentObject.location.latitude : 0,
      address: currentObject?.location ? currentObject.location.address : '',
    },
    schedule: [
      {
        weekday: 1,
        open:
          currentObject?.schedule[0]?.open !== undefined ? currentObject?.schedule[0]?.open : '',
        close:
          currentObject?.schedule[0]?.close !== undefined ? currentObject?.schedule[0]?.close : '',
      },
      {
        weekday: 2,
        open:
          currentObject?.schedule[1]?.open !== undefined ? currentObject?.schedule[1]?.open : '',
        close:
          currentObject?.schedule[1]?.close !== undefined ? currentObject?.schedule[1]?.close : '',
      },
      {
        weekday: 3,
        open:
          currentObject?.schedule[2]?.open !== undefined ? currentObject?.schedule[2]?.open : '',
        close:
          currentObject?.schedule[2]?.close !== undefined ? currentObject?.schedule[2]?.close : '',
      },
      {
        weekday: 4,
        open:
          currentObject?.schedule[3]?.open !== undefined ? currentObject?.schedule[3]?.open : '',
        close:
          currentObject?.schedule[3]?.close !== undefined ? currentObject?.schedule[3]?.close : '',
      },
      {
        weekday: 5,
        open:
          currentObject?.schedule[4]?.open !== undefined ? currentObject?.schedule[4]?.open : '',
        close:
          currentObject?.schedule[4]?.close !== undefined ? currentObject?.schedule[4]?.close : '',
      },
      {
        weekday: 6,
        open:
          currentObject?.schedule[5]?.open !== undefined ? currentObject?.schedule[5]?.open : '',
        close:
          currentObject?.schedule[5]?.close !== undefined ? currentObject?.schedule[5]?.close : '',
      },
      {
        weekday: 7,
        open:
          currentObject?.schedule[6]?.open !== undefined ? currentObject?.schedule[6]?.open : '',
        close:
          currentObject?.schedule[6]?.close !== undefined ? currentObject?.schedule[6]?.close : '',
      },
    ],
    contacts: currentObject?.contacts
      ? [...currentObject.contacts]
      : [
          { name: 'Мобильный телефон', contact: '' },
          { name: 'Сайт', contact: '' },
          { name: 'Почта', contact: '' },
        ],
    categories: [],
    waypoints: [],
    filters: [],
    publishAt: currentObject?.publishAt
      ? currentObject?.publishAt.slice(0, 10).split('-').reverse().join('-')
      : '',
  })

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
      location: { ...checkedParameters.location, latitude: e.target.value },
    })
  }
  const onChangeObjectLongitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({
      ...checkedParameters,
      location: { ...checkedParameters.location, longitude: e.target.value },
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
  const onChangeObjectDateSendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedParameters({ ...checkedParameters, publishAt: e.target.value })
  }

  const onSubmitFormHandler = () => {
    onSubmitForm(checkedParameters, photosFiles, audioFiles, audioParameters)
  }

  return (
    <div className={main.container}>
      <div className={styles.content}>
        <CustomNameInput
          value={checkedParameters.name}
          name='Название объекта'
          placeholder='Введите название объекта'
          type='text'
          callbackHandler={onChangeObjectNameHandler}
        />
        <CustomNameInput
          value={checkedParameters.location.address}
          name='Адрес объекта'
          placeholder='Введите адрес объекта'
          type='text'
          callbackHandler={onChangeObjectAddressHandler}
        />
        <div className={styles.dateBlock}>
          <h4 className={styles.dateText}>Дата публикации</h4>
          <InputMask
            value={checkedParameters.publishAt}
            mask='99-99-9999'
            placeholder='Введите дату публикации новости'
            type='text'
            className={styles.input}
            onChange={onChangeObjectDateSendHandler}
          />
        </div>
        <CustomDoubleInputComponent
          firstValue={checkedParameters.location.latitude}
          secondValue={checkedParameters.location.longitude}
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
            value={checkedParameters.icon}
            defaultValue='Select...'
            options={options}
            callbackHandler={(newValue) => {
              setCheckedParameters({ ...checkedParameters, icon: newValue.value })
            }}
          />
        </div>
        <div className={styles.categoriesBlock}>
          <h4 className={styles.categoriesTitle}>Выбрать категорию объекта</h4>
          <div className={styles.categoriesContainer}>
            {categoriesArray.map((category) => {
              const onActiveCategory = () => {
                setActiveCategoryId(category.id)
                setActiveCategory(categoriesArray.indexOf(category))
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
            {categoriesArray[activeCategory]?.subCategories.map((subcategory) => {
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
            <UploadPhotoComponent
              images={currentObject?.images}
              setPhotosFiles={setPhotosFiles}
              handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
            />
          )}
          {isLoadingAudio ? (
            <Loading />
          ) : (
            <UploadAudioComponent
              setAudioFiles={setAudioFiles}
              audios={currentObject?.audio}
              handleDeleteUploadedAudio={handleDeleteUploadedAudio}
            />
          )}
          <CustomNameInput
            value={audioParameters.voiced}
            name='Исполнитель'
            placeholder='Введите имя исполнителя'
            type='text'
            callbackHandler={onChangeNameOfArtistHandler}
          />
          <CustomNameInput
            value={audioParameters.voicedLink}
            name='Ссылка на аккаунт исполнителя'
            placeholder='Введите ссылку'
            type='text'
            callbackHandler={onChangeArtistLinkHandler}
          />
          <UploadDescriptionComponent
            value={checkedParameters.description}
            placeholder='Добавьте описание объекта'
            title='Описание'
            callbackHandler={onChangeDescriptionHandler}
          />
          <TimeTable
            schedule={checkedParameters.schedule}
            onOpenChangeHandler={onOpenChangeHandler}
            onCloseChangeHandler={onCloseChangeHandler}
          />
          <ContactsComponent
            contacts={checkedParameters.contacts}
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
  )
}

export default ObjectPageMainContainer
