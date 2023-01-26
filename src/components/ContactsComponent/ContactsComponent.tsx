import React from 'react'
import styles from './ContactsComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import InputMask from 'react-input-mask'

type ContactsComponentPropsType = {
  onChangePhoneNumberHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSiteNameHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeEmailHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ContactsComponent: React.FC<ContactsComponentPropsType> = ({
  onChangeSiteNameHandler,
  onChangePhoneNumberHandler,
  onChangeEmailHandler,
}) => {
  return (
    <div className={styles.contactsContainer}>
      <h4 className={styles.contactsTitle}>Контакты</h4>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Телефон</div>
        <div className={styles.contactInput}>
          <InputMask
            mask='+7 (999) 999-99-99'
            placeholder='Введите номер телефона'
            type='text'
            className={styles.input}
            onChange={onChangePhoneNumberHandler}
          />
        </div>
      </div>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Сайт</div>
        <div className={styles.contactInput}>
          <CustomInput
            placeholder='Введите название сайта'
            type='text'
            callbackHandler={onChangeSiteNameHandler}
          />
        </div>
      </div>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Почта</div>
        <div className={styles.contactInput}>
          <CustomInput
            placeholder='Введите почту'
            type='text'
            callbackHandler={onChangeEmailHandler}
          />
        </div>
      </div>
      <div className={styles.submitContainer}>
        <SubmitButton name='Сохранить' />
      </div>
    </div>
  )
}

export default React.memo(ContactsComponent)
