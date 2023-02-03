import React from 'react'
import styles from './NotificationPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'

const NotificationPage = () => {
  const onRedirectToCreateNotification = () => {
    window.open('https://console.firebase.google.com/')
  }
  return (
    <div className={styles.notificationPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Уведомления</h1>
        <div
          className={styles.createNotificationBtnContainer}
          onClick={onRedirectToCreateNotification}
        >
          <CustomButton name='Создать уведомление' />
        </div>
        <div className={styles.content}>
          <h1 className={main.title} style={{ paddingTop: 16 }}>
            Руководство по использованию Firebase
          </h1>
          <p className={styles.textTutorial}>
            1. Нажмите на кнопку Создать уведомление, вас перенаправит на консоль firebase
          </p>
          <p className={styles.textTutorial}>
            2. Авторизируйтесь на сайте, если вы еще не сделали это
          </p>
          <p className={styles.textTutorial}>
            3. По ссылке https://console.firebase.google.com/ выберите проект adygeya
          </p>
          <p className={styles.textTutorial}>
            4. В левом меню выберите вкладку Engage, в ней нажмите Messaging
          </p>
          <p className={styles.textTutorial}>5. Нажмите синюю кнопку New campaign</p>
          <p className={styles.textTutorial}>
            6. Напишите нужное вам сообещние и выберите устройства на которые требуется отправить
            пуш
          </p>
          <p className={styles.textTutorial}>
            7. Ваш пуш появится в консоли, вы можете удалить его, посмотреть его статистику,
            продублировать или редактировать
          </p>
          <p className={styles.textTutorial}>*Примечание*</p>
          <p className={styles.textTutorial}>
            Пуш уведомления отправляются не моментально, нужно какое-то время чтобы уведомления
            отправились на все устройства, по завершению процесса вы увидите в консоли status
            complete
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
