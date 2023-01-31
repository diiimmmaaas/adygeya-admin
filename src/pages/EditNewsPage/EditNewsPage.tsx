import React, { useEffect, useState } from 'react'
import styles from './EditNewsPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import {
  changeNews,
  getCurrentNews,
  postHighlightForNews,
  postImageForNews,
  postNews,
} from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'
import NewsPageMainContainer from '../../components/NewsPageMainContainer/NewsPageMainContainer'
import main from '../../style/common.module.css'
import { useLocation } from 'react-router-dom'

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

  const { isLoading, isLoadingPhoto, isLoadingHighlight, currentNews } = useAppSelector(
    (state) => state.news,
  )

  const dispatch = useAppDispatch()
  const { state } = useLocation()
  const { token } = useAppSelector((state) => state.auth)

  const handleDeleteUploadedPhoto = async (imageId: number) => {
    console.log(imageId)
  }

  const onSubmitForm = async (
    checkedNewsParameters: CheckedNewsParametersType,
    photosNewsFiles: any,
    photoHighlightFiles: any,
  ) => {
    console.log(photosNewsFiles)
    const resultAction = await dispatch(
      changeNews({ newsId: currentNews.id, checkedNewsParameters, token }),
    )

    // if (postNews.rejected.match(resultAction)) {
    //   setError(false)
    //   const timer = setTimeout(() => {
    //     setError(true)
    //   }, 4000)
    //   return () => clearTimeout(timer)
    // }
    // if (postNews.fulfilled.match(resultAction)) {
    //   if (photosNewsFiles) {
    //     const timer = setTimeout(async () => {
    //       for (const photo of photosNewsFiles) {
    //         const formData = new FormData()
    //         formData.append('image', photo)
    //         await dispatch(postImageForNews({ formData, id: id, token }))
    //       }
    //
    //       return () => clearTimeout(timer)
    //     }, 2000)
    //   }
    //   if (photoHighlightFiles) {
    //     const timer = setTimeout(async () => {
    //       const formData = new FormData()
    //       formData.append('image', photoHighlightFiles)
    //       await dispatch(postHighlightForNews({ formData, id: id, token }))
    //
    //       return () => clearTimeout(timer)
    //     }, 2000)
    //   }
    //   setCorrect(true)
    //   const timer = setTimeout(() => {
    //     setCorrect(false)
    //   }, 4000)
    //   return () => clearTimeout(timer)
    // }
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
    </div>
  )
}

export default EditNewsPage
