import React, { useState } from 'react'
import styles from './AuthPage.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(false)

  const navigate = useNavigate()

  if (isAuth) {
    navigate('/')
  }
  return (
    <div className={styles.auth}>
      <div className={styles.content}>
        <h1 className={styles.title}>Log In</h1>
        <CustomNameInput name='Login' placeholder='Введите логин' type='text' />
        <CustomNameInput name='Password' placeholder='Введите пароль' type='text' />
        <div className={styles.loginBtn} onClick={() => setIsAuth(true)}>
          <CustomButton name='Войти' />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
