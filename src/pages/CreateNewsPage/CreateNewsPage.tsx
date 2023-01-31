import React, { useState } from 'react'
import styles from './CreateNewsPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { postHighlightForNews, postImageForNews, postNews } from '../../redux/actions/newsActions'
import Loading from '../../components/Loading/Loading'
import NewsPageMainContainer from '../../components/NewsPageMainContainer/NewsPageMainContainer'

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

const CreateNewsPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)

  const { isLoading, isLoadingPhoto, isLoadingHighlight, id } = useAppSelector(
    (state) => state.news,
  )

  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  // const [checkedNewsParameters, setCheckedNewsParameters] = useState<CheckedNewsParametersType>({
  //   title: '',
  //   description: '',
  //   date: '',
  //   publishAt: '',
  //   icon: '',
  //   location: {
  //     longitude: 0,
  //     latitude: 0,
  //     address: '',
  //   },
  //   stories: {
  //     title: '',
  //     content: '',
  //   },
  // })
  //
  // const { token } = useAppSelector((state) => state.auth)
  //
  // const dispatch = useAppDispatch()
  //
  // const onChangeNewsNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({ ...checkedNewsParameters, title: e.target.value })
  // }
  // const onChangeNewsAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({
  //     ...checkedNewsParameters,
  //     location: { ...checkedNewsParameters.location, address: e.target.value },
  //   })
  // }
  // const onChangeNewsDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({ ...checkedNewsParameters, date: e.target.value })
  // }
  // const onChangeNewsDateSendHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({ ...checkedNewsParameters, publishAt: e.target.value })
  // }
  // const onChangeNewsLatitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({
  //     ...checkedNewsParameters,
  //     location: { ...checkedNewsParameters.location, latitude: +e.target.value },
  //   })
  // }
  // const onChangeNewsLongitudeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedNewsParameters({
  //     ...checkedNewsParameters,
  //     location: { ...checkedNewsParameters.location, longitude: +e.target.value },
  //   })
  // }
  // const onChangeNewsDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setCheckedNewsParameters({ ...checkedNewsParameters, description: e.target.value })
  // }

  const onSubmitForm = async (
    checkedNewsParameters: CheckedNewsParametersType,
    photosNewsFiles: any,
    photoHighlightFiles: any,
  ) => {
    const resultAction = await dispatch(postNews({ checkedNewsParameters, token }))
    if (postNews.rejected.match(resultAction)) {
      setError(false)
      const timer = setTimeout(() => {
        setError(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
    if (postNews.fulfilled.match(resultAction)) {
      if (photosNewsFiles) {
        const timer = setTimeout(async () => {
          for (const photo of photosNewsFiles) {
            const formData = new FormData()
            formData.append('image', photo)
            await dispatch(postImageForNews({ formData, id: id, token }))
          }

          return () => clearTimeout(timer)
        }, 2000)
      }
      if (photoHighlightFiles) {
        const timer = setTimeout(async () => {
          const formData = new FormData()
          formData.append('image', photoHighlightFiles)
          await dispatch(postHighlightForNews({ formData, id: id, token }))

          return () => clearTimeout(timer)
        }, 2000)
      }
      setCorrect(true)
      const timer = setTimeout(() => {
        setCorrect(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
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
      <NewsPageMainContainer
        isLoadingPhoto={isLoadingPhoto}
        isLoadingHighlight={isLoadingHighlight}
        onSubmitForm={onSubmitForm}
      />
    </div>
  )
}

export default CreateNewsPage
