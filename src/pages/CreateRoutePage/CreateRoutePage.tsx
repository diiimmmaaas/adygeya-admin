import React, { useState } from 'react'
import styles from './CreateRoutePage.module.css'
import main from '../../style/common.module.css'
import RoutePageMainContainer from '../../components/RoutePageMainContainer/RoutePageMainContainer'

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
  waypoints: WaypointType[]
}

const CreateRoutePage = () => {
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)

  const onSubmitFormHandler = async (checkedRouteParameters: CheckedRouteParametersType) => {
    console.log(checkedRouteParameters)
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
      <RoutePageMainContainer onSubmitForm={onSubmitFormHandler} />
    </div>
  )
}

export default CreateRoutePage
