import React, { useEffect, useState } from 'react'
import styles from './EditObjectPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import Loading from '../../components/Loading/Loading'
import main from '../../style/common.module.css'
import { useLocation } from 'react-router-dom'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'
import ObjectPageMainContainer from '../../components/ObjectPageMainContainer/ObjectPageMainContainer'
import { AudioParametersType, CheckedParametersType } from '../CreateObjectPage/types'
import {
  changeObject,
  deleteAudioObject,
  deleteImageObject,
  getCurrentObject,
  postAudioForObject,
  postImageForObject,
} from '../../redux/actions/objectsActions'

const EditObjectPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeImageModal, setActiveImageModal] = useState(false)
  const [activeAudioModal, setActiveAudioModal] = useState(false)
  const [deletedImageId, setDeletedImageId] = useState<number | null>(null)
  const [deletedAudioId, setDeletedAudioId] = useState<number | null>(null)

  const { isLoading, isLoadingPhoto, isLoadingAudio, currentObject } = useAppSelector(
    (state) => state.objects,
  )

  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = location.state as number
  const { token } = useAppSelector((state) => state.auth)

  const handleDeleteUploadedPhoto = (imageId: number) => {
    setActiveImageModal(true)
    setDeletedImageId(imageId)
  }

  const handleDeleteUploadedAudio = (audioId: number) => {
    setActiveAudioModal(true)
    setDeletedAudioId(audioId)
  }

  const onSubmitPhotoPopupHandler = async () => {
    setActiveImageModal(false)
    await dispatch(
      deleteImageObject({
        id: currentObject.id,
        imageId: deletedImageId,
        token,
      }),
    )
    setDeletedImageId(null)
    await dispatch(getCurrentObject({ id: state, token }))
  }

  const onSubmitAudioPopupHandler = async () => {
    setActiveAudioModal(false)
    await dispatch(
      deleteAudioObject({
        id: deletedAudioId,
        token,
      }),
    )
    setDeletedAudioId(null)
    await dispatch(getCurrentObject({ id: state, token }))
  }

  const onSubmitForm = async (
    checkedParameters: CheckedParametersType,
    photosFiles: any,
    audioFiles: any,
    audioParameters: AudioParametersType,
  ) => {
    console.log(checkedParameters);
    // await dispatch(changeObject({ objectId: currentObject.id, checkedParameters, token }))
    // if (photosFiles) {
    //   for (const photo of photosFiles) {
    //     const formData = new FormData()
    //     formData.append('image', photo)
    //     const res = await dispatch(
    //       postImageForObject({
    //         formData,
    //         id: currentObject.id,
    //         token,
    //       }),
    //     )
    //     if (postImageForObject.rejected.match(res)) {
    //       setError(true)
    //       const timer = setTimeout(() => {
    //         setError(false)
    //       }, 4000)
    //       return () => clearTimeout(timer)
    //     }
    //   }
    // }
    // if (audioFiles) {
    //   for (const audio of audioFiles) {
    //     const formData = new FormData()
    //     formData.append('audio', audio)
    //     formData.append('voiced', audioParameters.voiced)
    //     formData.append('voicedLink', audioParameters.voicedLink)
    //     const res = await dispatch(
    //       postAudioForObject({
    //         formData,
    //         id: currentObject.id,
    //         token,
    //       }),
    //     )
    //     if (postAudioForObject.rejected.match(res)) {
    //       setError(true)
    //       const timer = setTimeout(() => {
    //         setError(false)
    //       }, 4000)
    //       return () => clearTimeout(timer)
    //     }
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
    dispatch(getCurrentObject({ id: state, token }))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.object}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Объект был успешно обновлен</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при обновлении объекта, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Изменить обьект</h1>
      <ObjectPageMainContainer
        isEditMode={true}
        currentObject={currentObject}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
        handleDeleteUploadedAudio={handleDeleteUploadedAudio}
      />
      <PopupWithButtons
        popupTitle='Данная картинка находится на удаленном сервере. Вы точно хотите её удалить?'
        isPopupActive={activeImageModal}
        onCloseHandler={() => setActiveImageModal(false)}
        onSubmitHandler={onSubmitPhotoPopupHandler}
        submitBtnTitle='Удалить'
      />
      <PopupWithButtons
        popupTitle='Данное аудио находится на удаленном сервере. Вы точно хотите его удалить?'
        isPopupActive={activeAudioModal}
        onCloseHandler={() => setActiveAudioModal(false)}
        onSubmitHandler={onSubmitAudioPopupHandler}
        submitBtnTitle='Удалить'
      />
    </div>
  )
}

export default EditObjectPage
