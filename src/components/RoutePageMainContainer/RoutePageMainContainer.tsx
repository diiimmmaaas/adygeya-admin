import React, { useState } from 'react'
import styles from './RoutePageMainContainer.module.css'
import main from '../../style/common.module.css'
import exitImg from '../../assets/icons/exit.svg'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { GetCurrentRouteType } from '../../redux/types/types'
import { CheckedRouteParametersType } from '../../pages/CreateRoutePage/CreateRoutePage'
import CustomDoubleInputComponent from '../CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadAudioComponent from '../UploadAudioComponent/UploadAudioComponent'
import { AudioParametersType } from '../../pages/CreateObjectPage/types'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { addAudioForRoutes } from '../../redux/actions/routesActions'
import CustomButton from '../CustomButton/CustomButton'
import CustomSelect from '../CustomSelect/CustomSelect'
import { options } from '../ObjectPageMainContainer/ObjectPageMainContainer'
import UploadPhotoComponent from '../UploadPhotoComponent/UploadPhotoComponent'
import PopupForCreateMedia from '../PopupForCreateMedia/PopupForCreateMedia'
import InputMask from 'react-input-mask'
import Loading from '../Loading/Loading'

export type RoutePageMainContainerPropsType = {
  isEditMode?: boolean
  activeModal?: boolean
  setActiveModal?: (activeModal: boolean) => void
  onSubmitPopup?: (photosNewsFiles: any) => void
  currentRoute?: GetCurrentRouteType
  onSubmitForm: (checkedRouteParameters: CheckedRouteParametersType, photosRouteFiles: any) => void
  handleDeleteUploadedPhoto: (imageId: number) => void
}

const RoutePageMainContainer: React.FC<RoutePageMainContainerPropsType> = ({
  isEditMode,
  activeModal,
  setActiveModal,
  onSubmitPopup,
  currentRoute,
  onSubmitForm,
  handleDeleteUploadedPhoto,
}) => {
  const [activePopupAudio, setActivePopupAudio] = useState<boolean>(false)
  const [photosRouteFiles, setPhotosRouteFiles] = useState<any>()
  const [audioRouteFiles, setAudioRouteFiles] = useState<any>()
  const [audioParameters, setAudioParameters] = useState<AudioParametersType>({
    voiced: '',
    voicedLink: '',
  })

  // eslint-disable-next-line prefer-const
  let [checkedRouteParameters, setCheckedRouteParameters] = useState<CheckedRouteParametersType>({
    name: currentRoute ? currentRoute?.name : '',
    description: currentRoute ? currentRoute?.description : '',
    publishAt: currentRoute?.publishAt
      ? currentRoute?.publishAt.slice(0, 10).split('-').reverse().join('-')
      : '',
    waypoints: currentRoute?.waypoints
      ? [...currentRoute.waypoints]
      : [
          {
            name: '',
            icon: '',
            description: '',
            location: {
              longitude: 0,
              latitude: 0,
              address: '',
            },
            audioId: 0,
          },
        ],
  })

  const { audioArray, isLoadingAudio } = useAppSelector((state) => state.routes)
  const { token } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onChangeRouteNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRouteParameters({ ...checkedRouteParameters, name: e.target.value })
  }
  const onChangeRouteDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckedRouteParameters({ ...checkedRouteParameters, description: e.target.value })
  }

  const onChangeWaypointNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    waypointIndex: number,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex ? { ...way, name: e.target.value } : { ...way },
      ),
    })
  }
  const onChangeWaypointDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    waypointIndex: number,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex ? { ...way, description: e.target.value } : { ...way },
      ),
    })
  }
  const onChangeRouteDateSendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRouteParameters({ ...checkedRouteParameters, publishAt: e.target.value })
  }
  const onChangeRouteLatitudeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    waypointIndex: number | string,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex
          ? { ...way, location: { ...way.location, latitude: e.currentTarget.value } }
          : { ...way },
      ),
    })
  }
  const onChangeRouteLongitudeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    waypointIndex: number | string,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex
          ? { ...way, location: { ...way.location, longitude: e.currentTarget.value } }
          : { ...way },
      ),
    })
  }
  const onChangeRouteAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    waypointIndex: number | string,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex
          ? { ...way, location: { ...way.location, address: e.currentTarget.value } }
          : { ...way },
      ),
    })
  }
  const onChangeIconHandler = (
    newValue: { value: string; label: string },
    waypointIndex: number | string,
  ) => {
    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: checkedRouteParameters.waypoints.map((way, index) =>
        index === waypointIndex ? { ...way, icon: newValue.value } : { ...way },
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

  const addOnePointHandler = () => {
    const newPoint = {
      name: '',
      icon: 'route',
      description: '',
      location: {
        longitude: 0,
        latitude: 0,
        address: '',
      },
      audioId: 0,
    }

    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: [...checkedRouteParameters.waypoints, newPoint],
    })
  }

  const addDeletePointHandler = () => {
    const newArray = [
      ...checkedRouteParameters.waypoints.filter(
        (el, i) => i !== checkedRouteParameters.waypoints.length - 1,
      ),
    ]

    setCheckedRouteParameters({
      ...checkedRouteParameters,
      waypoints: newArray,
    })
  }

  const onSubmitFormHandler = async () => {
    if (audioArray.length > 0) {
      const newArr = checkedRouteParameters.waypoints.map((w, ind) => {
        const newId = audioArray[ind]?.id
        return { ...w, audioId: newId }
      })

      checkedRouteParameters = { ...checkedRouteParameters, waypoints: newArr }
      setCheckedRouteParameters(checkedRouteParameters)
    }

    onSubmitForm(checkedRouteParameters, photosRouteFiles)
  }

  const onSubmitPopupHandler = () => {
    onSubmitPopup && onSubmitPopup(photosRouteFiles)
  }

  return (
    <div className={main.container}>
      <div className={styles.content}>
        {!isEditMode && (
          <PopupForCreateMedia
            popupTitle='Добавить медиа файлы'
            isPopupActive={activeModal}
            onCloseHandler={() => setActiveModal && setActiveModal(false)}
            onSubmitHandler={onSubmitPopupHandler}
          >
            <div className={styles.uploadMediaContainer}>
              <UploadPhotoComponent
                setPhotosFiles={setPhotosRouteFiles}
                handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
              />
            </div>
          </PopupForCreateMedia>
        )}
        <CustomNameInput
          value={checkedRouteParameters.name}
          name='Название маршрута'
          placeholder='Введите название маршрута'
          type='text'
          callbackHandler={onChangeRouteNameHandler}
        />
        <UploadDescriptionComponent
          value={checkedRouteParameters?.description}
          placeholder='Добавьте описание маршрута'
          title='Описание маршрута'
          callbackHandler={onChangeRouteDescriptionHandler}
        />
        <div className={styles.dateBlock}>
          <h4 className={styles.dateText}>Дата публикации</h4>
          <InputMask
            value={checkedRouteParameters?.publishAt}
            mask='99-99-9999'
            placeholder='Введите дату публикации новости'
            type='text'
            className={styles.input}
            onChange={onChangeRouteDateSendHandler}
          />
        </div>
        {isEditMode && (
          <div className={styles.uploadMediaContainer}>
            <UploadPhotoComponent
              images={currentRoute?.images}
              setPhotosFiles={setPhotosRouteFiles}
              handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
            />
          </div>
        )}
        <h1 className={main.title}>Точки маршрута</h1>
        <div className={styles.wayPointsBlock}>
          {checkedRouteParameters.waypoints.map((waypoint, index) => {
            const onAddAudioFile = async () => {
              if (audioRouteFiles) {
                for (const audio of audioRouteFiles) {
                  const formData = new FormData()
                  formData.append('audio', audio)
                  formData.append('voiced', audioParameters.voiced)
                  formData.append('voicedLink', audioParameters.voicedLink)
                  await dispatch(
                    addAudioForRoutes({
                      formData,
                      token,
                    }),
                  )
                }
              }
              setActivePopupAudio(false)
            }

            return (
              <div key={index} className={styles.wayPointBlock}>
                <PopupForCreateMedia
                  isPopupActive={activePopupAudio}
                  popupTitle='Добавить аудио'
                  onCloseHandler={() => setActivePopupAudio(false)}
                  onSubmitHandler={onAddAudioFile}
                >
                  {isLoadingAudio ? (
                    <Loading />
                  ) : (
                    <div className={styles.imagePopupBlock}>
                      <UploadAudioComponent
                        setAudioFiles={setAudioRouteFiles}
                        handleDeleteUploadedAudio={() => {
                          console.log('переделать')
                        }}
                      />
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
                    </div>
                  )}
                </PopupForCreateMedia>
                <h4 className={styles.waypointNameTitle}>Точка {index + 1}</h4>
                <img
                  onClick={addDeletePointHandler}
                  className={styles.exitImg}
                  src={exitImg}
                  alt='exitImg'
                />
                <CustomNameInput
                  value={waypoint.name}
                  name='Название точки маршрута'
                  placeholder='Введите название точки маршрута'
                  type='text'
                  callbackHandler={(e) => onChangeWaypointNameHandler(e, index)}
                />
                <CustomNameInput
                  value={waypoint.location.address}
                  name='Адрес точки маршрута'
                  placeholder='Введите адрес точки маршрута'
                  type='text'
                  callbackHandler={(e) => onChangeRouteAddressHandler(e, index)}
                />
                <UploadDescriptionComponent
                  value={waypoint.description}
                  placeholder='Добавьте описание точки маршрута'
                  title='Описание точки маршрута'
                  callbackHandler={(e) => onChangeWaypointDescriptionHandler(e, index)}
                />
                <div className={styles.selectBlock}>
                  <h4 className={styles.objectNameTitle}>Выберите тип иконки</h4>
                  <CustomSelect
                    value={waypoint.icon}
                    defaultValue='Select...'
                    options={options}
                    callbackHandler={(newValue) => onChangeIconHandler(newValue, index)}
                  />
                </div>
                <CustomDoubleInputComponent
                  firstValue={waypoint.location.latitude}
                  secondValue={waypoint.location.longitude}
                  name='Координаты объекта'
                  firstPlaceholder='Введите широту'
                  secondPlaceholder='Введите долготу'
                  firstSubTitle='Широта'
                  secondSubTitle='Долгота'
                  type='text'
                  callbackFirstHandler={(e) => onChangeRouteLatitudeHandler(e, index)}
                  callbackSecondHandler={(e) => onChangeRouteLongitudeHandler(e, index)}
                />
                <div className={styles.attachAudio} onClick={() => setActivePopupAudio(true)}>
                  Прикрепить аудио
                </div>
                <div className={styles.strip}></div>
              </div>
            )
          })}
          <div className={styles.addPointBlock}>
            <CustomButton
              onClick={addOnePointHandler}
              name='Добавить еще точку'
              className={styles.addPoint}
            />
          </div>
        </div>
      </div>
      <SubmitButton name='Сохранить' onClickHandler={onSubmitFormHandler} />
    </div>
  )
}

export default RoutePageMainContainer
