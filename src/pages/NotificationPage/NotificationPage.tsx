import React from 'react'
import styles from './NotificationPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'

import tutorialImage1 from '../../assets/img/tutorialImages/1tutorial.png'
import tutorialImage2 from '../../assets/img/tutorialImages/2tutorial.png'
import tutorialImage3 from '../../assets/img/tutorialImages/3tutorial.png'
import tutorialImage4 from '../../assets/img/tutorialImages/4tutorial.png'
import tutorialImage5 from '../../assets/img/tutorialImages/5tutorial.png'
import tutorialImage6 from '../../assets/img/tutorialImages/6tutorial.png'
import tutorialImage7 from '../../assets/img/tutorialImages/7tutorial.png'
import tutorialImage8 from '../../assets/img/tutorialImages/8tutorial.png'
import tutorialImage9 from '../../assets/img/tutorialImages/9tutorial.png'

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
            1. Нажмите на кнопку Создать уведомление, вас перенаправит на Firebase console
          </p>
          <p className={styles.textTutorial}>
            2. Авторизируйтесь на сайте, если вы еще не сделали это
          </p>
          <p className={styles.textTutorial}>
            3. По ссылке https://console.firebase.google.com/ выберите проект adygeya
          </p>
          <img src={tutorialImage1} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            4. В левом меню выберите вкладку Engage, в ней нажмите Messaging
          </p>
          <img src={tutorialImage2} className={styles.fixImageSize} />
          <img src={tutorialImage3} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            5. Нажмите синюю кнопку New campaign и выберите там Notifications
          </p>
          <img src={tutorialImage4} className={styles.fixImageSize} />
          <img src={tutorialImage5} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            6. Напишите нужный вам заголовок в Notification title и его описание в Notification text
            соответственно
          </p>
          <img src={tutorialImage6} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            7. Выберите устройства на которые вы хотите отправить уведомления (ios/android/ios и
            android)
          </p>
          <img src={tutorialImage7} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            8. Выберите время в которые пуш уведомление должно отправиться пользователям, после
            этого нажмите кнопку Review
          </p>
          <img src={tutorialImage8} className={styles.fixImageSize} />

          <p className={styles.textTutorial}>
            9. Ваш пуш появится в консоли (
            https://console.firebase.google.com/u/1/project/adygeya-e1815/messaging ),по нажатию на
            пуш вы можете удалить его, посмотреть его статистику или продублировать
          </p>
          <img src={tutorialImage9} className={styles.fixImageSize} />

          <p className={styles.textTutorial} style={{ color: 'red' }}>
            *Примечание*
          </p>
          <p className={styles.textTutorial} style={{ paddingBottom: 24 }}>
            Пуш уведомления отправляются не моментально, нужно какое-то время чтобы уведомления
            отправились на все устройства, по завершению процесса вы увидите в консоли status
            completed
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
