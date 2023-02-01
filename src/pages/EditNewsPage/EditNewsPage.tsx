import React, { useEffect, useState } from 'react'
import styles from './EditNewsPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import {
  changeNews,
  deleteImageNews,
  getCurrentNews,
  postImageForNews,
} from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'
import NewsPageMainContainer from '../../components/NewsPageMainContainer/NewsPageMainContainer'
import main from '../../style/common.module.css'
import { useLocation } from 'react-router-dom'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'

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

const EditNewsPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [deletedImageId, setDeletedImageId] = useState<number | null>(null)

  const { isLoading, isLoadingPhoto, isLoadingHighlight, currentNews } = useAppSelector(
    (state) => state.news,
  )

  const dispatch = useAppDispatch()
  const { state } = useLocation()
  const { token } = useAppSelector((state) => state.auth)

  const handleDeleteUploadedPhoto = (imageId: number) => {
    setActiveModal(true)
    setDeletedImageId(imageId)
    console.log(imageId)
  }

  const onSubmitPopupHandle = async () => {
    setActiveModal(false)
    await dispatch(
      deleteImageNews({
        id: currentNews.id,
        imageId: deletedImageId,
        token,
      }),
    )
    setDeletedImageId(null)
    await dispatch(getCurrentNews({ id: state, token }))
  }

  const onSubmitForm = async (
    checkedNewsParameters: CheckedNewsParametersType,
    photosNewsFiles: any,
    photoHighlightFiles: any,
  ) => {
    await dispatch(changeNews({ newsId: currentNews.id, checkedNewsParameters, token }))
    if (photosNewsFiles) {
      for (const photo of photosNewsFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postImageForNews({ formData, id: currentNews.id, token }))
      }
    }
    await dispatch(getCurrentNews({ id: state, token }))
  }

  useEffect(() => {
    dispatch(getCurrentNews({ id: state, token }))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.news}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Событие было успешно обновлено</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при обновлении события, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Изменить событие</h1>
      <NewsPageMainContainer
        currentNews={currentNews}
        isLoadingPhoto={isLoadingPhoto}
        isLoadingHighlight={isLoadingHighlight}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
      />
      <PopupWithButtons
        popupTitle='Данная картинка находится на удаленном сервере. Вы точно хотите её удалить?'
        isPopupActive={activeModal}
        onCloseHandler={() => setActiveModal(false)}
        onSubmitHandler={onSubmitPopupHandle}
      />
    </div>
  )
}

export default EditNewsPage
