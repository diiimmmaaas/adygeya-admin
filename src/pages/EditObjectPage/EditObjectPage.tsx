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
  const { state } = useLocation()
  const { token } = useAppSelector((state) => state.auth)

  const handleDeleteUploadedPhoto = (imageId: number) => {
    setActiveImageModal(true)
    setDeletedImageId(imageId)
  }

  const handleDeleteUploadedAudio = (audioId: number) => {
    setActiveAudioModal(true)
    setDeletedImageId(audioId)
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
    console.log('удалено')
    // await dispatch(
    //   deleteAudioObject({
    //     id: currentObject.id,
    //     token,
    //   }),
    // )
    setDeletedAudioId(null)
    await dispatch(getCurrentObject({ id: state, token }))
  }

  const onSubmitForm = async (
    checkedParameters: CheckedParametersType,
    photosFiles: any,
    audioFiles: any,
    audioParameters: AudioParametersType,
  ) => {
    await dispatch(changeObject({ objectId: currentObject.id, checkedParameters, token }))
    console.log(audioFiles)
    if (photosFiles) {
      for (const photo of photosFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postImageForObject({ formData, id: currentObject.id, token }))
      }
    }
    if (audioFiles) {
      for (const audio of audioFiles) {
        const formData = new FormData()
        formData.append('audio', audio)
        formData.append('voiced', audioParameters.voiced)
        formData.append('voicedLink', audioParameters.voicedLink)
        await dispatch(
          postAudioForObject({
            formData,
            id: currentObject.id,
            token,
          }),
        )
      }
    }
    await dispatch(getCurrentObject({ id: state, token }))
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
      />
      <PopupWithButtons
        popupTitle='Данное аудио находится на удаленном сервере. Вы точно хотите его удалить?'
        isPopupActive={activeAudioModal}
        onCloseHandler={() => setActiveAudioModal(false)}
        onSubmitHandler={onSubmitAudioPopupHandler}
      />
    </div>
  )
}

export default EditObjectPage
