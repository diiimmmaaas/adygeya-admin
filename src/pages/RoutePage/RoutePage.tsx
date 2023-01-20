import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import styles from './RoutePage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'

const RoutePage = () => {
  const navigate = useNavigate()
  const onRedirectToCreateRoute = () => {
    navigate(PATH.createRouteCardPage)
  }
  return (
    <div className={styles.routePageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список маршрутов</h1>
        <div className={styles.createRouteBtnContainer} onClick={onRedirectToCreateRoute}>
          <SearchFunctionalityComponent />
          <CustomButton name='Создать маршрут' />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default RoutePage
