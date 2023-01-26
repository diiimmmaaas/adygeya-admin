import React from 'react'
import styles from './NotificationPage.module.css'
import main from '../../style/common.module.css'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import CustomButton from '../../components/CustomButton/CustomButton'

const NotificationPage = () => {
  const navigate = useNavigate()
  const onRedirectToCreateNotification = () => {
    navigate(PATH.createNotificationsPage)
  }
  return (
    <div className={styles.notificationPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список уведомлений</h1>
        <div
          className={styles.createNotificationBtnContainer}
          onClick={onRedirectToCreateNotification}
        >
          <SearchFunctionalityComponent />
          <CustomButton name='Создать уведомление' />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default NotificationPage
