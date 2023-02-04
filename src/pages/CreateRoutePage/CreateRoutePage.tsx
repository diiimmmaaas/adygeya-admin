import React, { useState } from 'react'
import styles from './CreateRoutePage.module.css'
import main from '../../style/common.module.css'
import RoutePageMainContainer from '../../components/RoutePageMainContainer/RoutePageMainContainer'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import Loading from '../../components/Loading/Loading'
import { postObject } from '../../redux/actions/objectsActions'
import { postImageForRoute, postRoutes } from '../../redux/actions/routesActions'

export type WaypointType = {
  name: string
  icon: string
  description: string
  location: {
    longitude: number | string
    latitude: number | string
    address: string
  }
  audioId: number
}

export type CheckedRouteParametersType = {
  name: string
  description: string
  publishAt: string
  waypoints: WaypointType[]
}

const CreateRoutePage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [activeModal, setActiveModal] = useState(false)

  const { isLoading, id } = useAppSelector((state) => state.routes)
  const { token } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const onSubmitFormHandler = async (checkedRouteParameters: CheckedRouteParametersType) => {
    const resultAction = await dispatch(postRoutes({ checkedRouteParameters, token }))
    if (postObject.rejected.match(resultAction)) {
      setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
    setActiveModal(true)
  }

  const onSubmitPopup = async (photosFiles: any) => {
    if (photosFiles) {
      for (const photo of photosFiles) {
        const formData = new FormData()
        formData.append('image', photo)
        await dispatch(postImageForRoute({ formData, id: id, token }))
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
    <div className={styles.routes}>
      <div className={styles.errorBlock}>
        {correct && <div className={styles.correctText}>Маршрут был успешно добавлен</div>}
        {error && (
          <div className={styles.errorText}>
            Произошла ошибка при создании маршрута, попробуйте еще раз...
          </div>
        )}
      </div>
      <h1 className={main.title}>Создать маршрут</h1>
      <RoutePageMainContainer
        isEditMode={false}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        onSubmitPopup={onSubmitPopup}
        onSubmitForm={onSubmitFormHandler}
        handleDeleteUploadedPhoto={() => console.log('')}
      />
    </div>
  )
}

export default CreateRoutePage
