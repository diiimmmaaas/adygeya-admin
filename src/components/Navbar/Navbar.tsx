import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/img/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'

const buttons = [
  { id: 1, title: 'Объекты', path: PATH.objectCardPage },
  { id: 2, title: 'События', path: PATH.newsCardPage },
  { id: 3, title: 'Маршруты', path: PATH.routeCardPage },
  { id: 4, title: 'Пользователи', path: PATH.usersPage },
  { id: 5, title: 'Уведомления', path: PATH.notificationsPage },
  { id: 6, title: 'Настройки', path: PATH.settingsPage },
]

const Navbar = () => {
  const [activeBtn, setActiveBtn] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const onActiveLogo = () => {
    navigate('/')
    setActiveBtn('')
  }

  const isAuth = true

  useEffect(() => {
    setActiveBtn(location.pathname)
  }, [])

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt='logo' onClick={onActiveLogo} />
          </div>
          {isAuth ? (
            <div className={styles.functionalityContainer}>
              <ul className={styles.buttonsList}>
                {buttons.map((btn) => {
                  const onClickBtn = () => {
                    navigate(btn.path)
                    setActiveBtn(btn.path)
                  }
                  return (
                    <li
                      key={btn.id}
                      onClick={onClickBtn}
                      className={location.pathname === btn.path ? styles.activeBtn : styles.btn}
                    >
                      {btn.title}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className={styles.loginContainer}>
              <p className={styles.loginText}>Log In</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
