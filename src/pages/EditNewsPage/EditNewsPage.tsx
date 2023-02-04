import React, { useEffect, useState } from 'react'
import styles from './EditNewsPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import {
  changeNews,
  deleteImageNews,
  getCurrentNews,
  postHighlightForNews,
  postImageForNews,
} from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'
import NewsPageMainContainer from '../../components/NewsPageMainContainer/NewsPageMainContainer'
import main from '../../style/common.module.css'
import { useLocation } from 'react-router-dom'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'
import { CheckedNewsParametersType } from '../CreateNewsPage/CreateNewsPage'

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
  }

  const handleDeleteUploadedHighlight = (imageId: number) => {
    setActiveModal(true)
    setDeletedImageId(imageId)
  }

  const onSubmitPopupHandler = async () => {
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
    if (photoHighlightFiles) {
      for (const photo of photoHighlightFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postHighlightForNews({ formData, id: currentNews.id, token }))
      }
    }
    await dispatch(getCurrentNews({ id: state, token }))
    setCorrect(true)
    const timer = setTimeout(() => {
      setCorrect(false)
    }, 4000)
    return () => clearTimeout(timer)
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
        isEditMode={true}
        currentNews={currentNews}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={handleDeleteUploadedPhoto}
        handleDeleteUploadedHighlight={handleDeleteUploadedHighlight}
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

export default EditNewsPage
