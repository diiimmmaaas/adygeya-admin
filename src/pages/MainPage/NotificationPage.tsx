import React from 'react'
import styles from './NotificationPage.module.css'
import main from '../../style/common.module.css'

const NotificationPage = () => {
  return (
    <div className={styles.notificationPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Создать уведомление</h1>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default NotificationPage
