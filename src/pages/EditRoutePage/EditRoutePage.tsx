import React, { useEffect, useState } from 'react'
import styles from './EditRoutePage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import Loading from '../../components/Loading/Loading'
import main from '../../style/common.module.css'
import { useLocation } from 'react-router-dom'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'
import RoutePageMainContainer from '../../components/RoutePageMainContainer/RoutePageMainContainer'
import { deleteImageRoute, getCurrentRoute } from '../../redux/actions/routesActions'
import { CheckedRouteParametersType } from '../CreateRoutePage/CreateRoutePage'

const EditRoutePage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [deletedImageId, setDeletedImageId] = useState<number | null>(null)

  const { isLoading, currentRoute } = useAppSelector((state) => state.routes)

  const dispatch = useAppDispatch()
  const { state } = useLocation()
  const { token } = useAppSelector((state) => state.auth)

  const handleDeleteUploadedPhoto = (imageId: number) => {
    setActiveModal(true)
    setDeletedImageId(imageId)
  }

  const onSubmitPopupHandler = async () => {
    setActiveModal(false)
    await dispatch(
      deleteImageRoute({
        id: currentRoute.id,
        imageId: deletedImageId,
        token,
      }),
    )
    setDeletedImageId(null)
    await dispatch(getCurrentRoute({ id: state, token }))
  }

  const onSubmitForm = async (
    checkedRouteParameters: CheckedRouteParametersType,
    photosRouteFiles: any,
  ) => {
    console.log(checkedRouteParameters)
    console.log(photosRouteFiles)
    // await dispatch(changeObject({ objectId: currentObject.id, checkedParameters, token }))
    // if (photosFiles) {
    //   for (const photo of photosFiles) {
    //     const formData = new FormData()
    //     formData.append('image', photo)
    //     await dispatch(postImageForObject({ formData, id: currentObject.id, token }))
    //   }
    // }
    // if (audioFiles) {
    //   for (const audio of audioFiles) {
    //     const formData = new FormData()
    //     formData.append('audio', audio)
    //     formData.append('voiced', audioParameters.voiced)
    //     formData.append('voicedLink', audioParameters.voicedLink)
    //     await dispatch(
    //       postAudioForObject({
    //         formData,
    //         id: currentObject.id,
    //         token,
    //       }),
    //     )
    //   }
    // }
    // await dispatch(getCurrentObject({ id: state, token }))
    // setCorrect(true)
    // const timer = setTimeout(() => {
    //   setCorrect(false)
    // }, 4000)
    // return () => clearTimeout(timer)
  }

  useEffect(() => {
    dispatch(getCurrentRoute({ id: state, token }))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.route}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Маршрут был успешно обновлен</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при обновлении маршрута, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Изменить маршрут</h1>
      <RoutePageMainContainer
        isEditMode={true}
        currentRoute={currentRoute}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
      />
      <PopupWithButtons
        popupTitle='Данная картинка находится на удаленном сервере. Вы точно хотите её удалить?'
        isPopupActive={activeModal}
        onCloseHandler={() => setActiveModal(false)}
        onSubmitHandler={onSubmitPopupHandler}
        submitBtnTitle='Удалить'
      />
    </div>
  )
}

export default EditRoutePage
