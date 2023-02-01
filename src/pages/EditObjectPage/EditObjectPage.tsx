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
  deleteImageObject,
  getCurrentObject,
  postImageForObject,
} from '../../redux/actions/objectsActions'

const EditObjectPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [deletedImageId, setDeletedImageId] = useState<number | null>(null)

  const { isLoading, isLoadingPhoto, isLoadingAudio, currentObject } = useAppSelector(
    (state) => state.objects,
  )

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
      deleteImageObject({
        id: currentObject.id,
        imageId: deletedImageId,
        token,
      }),
    )
    setDeletedImageId(null)
    await dispatch(getCurrentObject({ id: state, token }))
  }

  const onSubmitForm = async (
    checkedParameters: CheckedParametersType,
    photosFiles: any,
    audioFiles: any,
    audioParameters: AudioParametersType,
  ) => {
    console.log(photosFiles)
    await dispatch(changeObject({ objectId: currentObject.id, checkedParameters, token }))

    if (photosFiles) {
      for (const photo of photosFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postImageForObject({ formData, id: currentObject.id, token }))
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
        currentObject={currentObject}
        isLoadingPhoto={isLoadingPhoto}
        isLoadingAudio={isLoadingAudio}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
      />
      <PopupWithButtons
        popupTitle='Данная картинка находится на удаленном сервере. Вы точно хотите её удалить?'
        isPopupActive={activeModal}
        onCloseHandler={() => setActiveModal(false)}
        onSubmitHandler={onSubmitPopupHandler}
      />
    </div>
  )
}

export default EditObjectPage
