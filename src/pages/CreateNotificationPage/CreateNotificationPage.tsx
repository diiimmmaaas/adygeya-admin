import React, { useState } from 'react'
import styles from './CreateNotificationPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import InputMask from 'react-input-mask'

export type CreateNotificationType = {
  description: string
  date: string
  time: string
}
const CreateNotificationPage = () => {
  const [notificationData, setNotificationData] = useState<CreateNotificationType>({
    description: '',
    date: '',
    time: '',
  })

  const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationData({ ...notificationData, description: e.target.value })
  }

  const onChangeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationData({ ...notificationData, date: e.target.value })
  }

  const onChangeTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationData({ ...notificationData, time: e.target.value })
  }

  const onSubmit = async () => {
    console.log(notificationData)
  }

  return (
    <div className={styles.notifications}>
      <div className={main.container}>
        <h1 className={main.title}>Создать уведомление</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Описание уведомления'
            placeholder='Введите описание уведомления'
            type='text'
            callbackHandler={onChangeDescriptionHandler}
          />
          <div className={styles.dateBlock}>
            <div className={styles.dateText}>Дата</div>
            <InputMask
              mask='99/99/9999'
              placeholder='Введите дату отправки уведомления'
              type='text'
              className={styles.input}
              onChange={onChangeDateHandler}
            />
          </div>
          <div className={styles.dateBlock}>
            <div className={styles.dateText}>Время</div>
            <InputMask
              mask='99 : 99'
              placeholder='Введите время отправки уведомления'
              type='text'
              className={styles.input}
              onChange={onChangeTimeHandler}
            />
          </div>
        </div>
        <SubmitButton name='Сохранить' onClickHandler={onSubmit} />
      </div>
    </div>
  )
}

export default CreateNotificationPage
