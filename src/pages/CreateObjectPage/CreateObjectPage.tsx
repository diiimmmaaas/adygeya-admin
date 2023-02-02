import React, { useState } from 'react'
import styles from './CreateObjectPage.module.css'
import {
  postAudioForObject,
  postImageForObject,
  postObject,
} from '../../redux/actions/objectsActions'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import Loading from '../../components/Loading/Loading'
import { AudioParametersType, CheckedParametersType } from './types'
import main from '../../style/common.module.css'
import ObjectPageMainContainer from '../../components/ObjectPageMainContainer/ObjectPageMainContainer'

const CreateObjectPage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)

  const { token } = useAppSelector((state) => state.auth)
  const { isLoading, isLoadingPhoto, isLoadingAudio, id } = useAppSelector((state) => state.objects)

  const dispatch = useAppDispatch()

  const onSubmitFormHandler = async (
    checkedParameters: CheckedParametersType,
    photosFiles: any,
    audioFiles: any,
    audioParameters: AudioParametersType,
  ) => {
    const resultAction = await dispatch(postObject({ checkedParameters, token }))
    if (postObject.rejected.match(resultAction)) {
      setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
    if (postObject.fulfilled.match(resultAction)) {
      if (photosFiles) {
        const timer = setTimeout(async () => {
          for (const photo of photosFiles) {
            const formData = new FormData()
            formData.append('image', photo)
            await dispatch(postImageForObject({ formData, id: id, token }))
          }

          return () => clearTimeout(timer)
        }, 2000)
      }
      if (audioFiles) {
        const timer = setTimeout(async () => {
          for (const audio of audioFiles) {
            const formData = new FormData()
            formData.append('audio', audio)
            formData.append('voiced', audioParameters.voiced)
            formData.append('voicedLink', audioParameters.voicedLink)
            await dispatch(
              postAudioForObject({
                formData,
                id: id,
                token,
              }),
            )
          }

          return () => clearTimeout(timer)
        }, 2000)
      }
      setCorrect(true)
      const timer = setTimeout(() => {
        setCorrect(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.object}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Объект был успешно добавлен</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при создании объекта, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Создать объект</h1>
      <ObjectPageMainContainer
        isLoadingPhoto={isLoadingPhoto}
        isLoadingAudio={isLoadingAudio}
        onSubmitForm={onSubmitFormHandler}
        handleDeleteUploadedPhoto={() => console.log('')}
        handleDeleteUploadedAudio={() => console.log('')}
      />
    </div>
  )
}

export default CreateObjectPage
