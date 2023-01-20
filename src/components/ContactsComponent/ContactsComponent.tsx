import React from 'react'
import styles from './ContactsComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'
import CustomDoubleInputComponent from '../CustomDoubleInputComponent/CustomDoubleInputComponent'
import CustomButton from '../CustomButton/CustomButton'
import SubmitButton from '../SubmitButton/SubmitButton'

const ContactsComponent = () => {
  return (
    <div className={styles.contactsContainer}>
      <h4 className={styles.contactsTitle}>Контакты</h4>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Телефон</div>
        <div className={styles.contactInput}>
          <CustomInput placeholder='Введите номер телефона' type='text' />
        </div>
      </div>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Сайт</div>
        <div className={styles.contactInput}>
          <CustomInput placeholder='Введите название сайта' type='text' />
        </div>
      </div>
      <div className={styles.contactBlock}>
        <div className={styles.contactText}>Почта</div>
        <div className={styles.contactInput}>
          <CustomInput placeholder='Введите почту' type='text' />
        </div>
      </div>
      <CustomDoubleInputComponent
        name='Другой тип контакта'
        firstPlaceholder='Введите название'
        secondPlaceholder='Введите номер контакта'
        firstSubTitle='Название'
        secondSubTitle='Контакт'
        type='text'
      />
      <div className={styles.createContactBtn}>
        <CustomButton name='Создать' />
      </div>
      <SubmitButton name='Сохранить' />
    </div>
  )
}

export default ContactsComponent
