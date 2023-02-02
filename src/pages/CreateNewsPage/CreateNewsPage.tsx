import React, { useState } from 'react'
import styles from './CreateNewsPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { postHighlightForNews, postImageForNews, postNews } from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'
import NewsPageMainContainer from '../../components/NewsPageMainContainer/NewsPageMainContainer'
import main from '../../style/common.module.css'

export type CheckedNewsParametersType = {
  title: string
  description: string
  date: string
  publishAt: string
  icon: string
  location: {
    longitude: number | string
    latitude: number | string
    address: string
  }
  stories: {
    title: string
    content: string
  }
}

const CreateNewsPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeModal, setActiveModal] = useState(false)

  const { isLoading, id } = useAppSelector((state) => state.news)

  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  const onSubmitForm = async (checkedNewsParameters: CheckedNewsParametersType) => {
    const resultAction = await dispatch(postNews({ checkedNewsParameters, token }))
    if (postNews.rejected.match(resultAction)) {
      setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
    if (postNews.fulfilled.match(resultAction)) {
      setActiveModal(true)
    }
  }

  const onSubmitPopup = async (photosNewsFiles: any, photoHighlightFiles: any) => {
    if (photosNewsFiles) {
      for (const photo of photosNewsFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postImageForNews({ formData, id: id, token }))
      }
    }
    if (photoHighlightFiles) {
      for (const photo of photoHighlightFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postHighlightForNews({ formData, id: id, token }))
      }
    }
    setActiveModal(false)
    setCorrect(true)
    const timer = setTimeout(() => {
      setCorrect(false)
    }, 4000)
    return () => clearTimeout(timer)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.news}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Событие было успешно добавлено</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при создании события, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Создать событие</h1>
      <NewsPageMainContainer
        isEditMode={false}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        onSubmitPopup={onSubmitPopup}
        onSubmitForm={onSubmitForm}
        handleDeleteUploadedPhoto={() => console.log('')}
        handleDeleteUploadedHighlight={() => console.log('')}
      />
    </div>
  )
}

export default CreateNewsPage
