import React from 'react'
import styles from './ContactsComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'
import InputMask from 'react-input-mask'
import { ContactsType } from '../../pages/CreateObjectPage/types'

type ContactsComponentPropsType = {
  contacts: ContactsType[]
  onChangePhoneNumberHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSiteNameHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeEmailHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ContactsComponent: React.FC<ContactsComponentPropsType> = ({
  contacts,
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
            value={contacts !== undefined ? contacts[0]?.contact : ''}
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
            value={contacts !== undefined ? contacts[1]?.contact : ''}
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
            value={contacts !== undefined ? contacts[2]?.contact : ''}
            placeholder='Введите почту'
            type='text'
            callbackHandler={onChangeEmailHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ContactsComponent)
