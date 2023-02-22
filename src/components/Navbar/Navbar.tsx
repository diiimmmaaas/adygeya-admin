import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/img/logo.png'
import main from '../../style/common.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { logout } from '../../redux/reducers/auth/authSlice'

const Navbar = () => {
  const [activeBtn, setActiveBtn] = useState('')

  const { isAuth, userRoles } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  let buttons = []

  if (userRoles.includes('admin')) {
    buttons = [
      { id: 1, title: 'Объекты', path: PATH.objectCardPage },
      { id: 2, title: 'События', path: PATH.newsCardPage },
      { id: 3, title: 'Маршруты', path: PATH.routeCardPage },
      { id: 4, title: 'Пользователи', path: PATH.usersPage },
      { id: 5, title: 'Фильтры', path: PATH.filtersPage },
      { id: 6, title: 'Уведомления', path: PATH.notificationsPage },
      { id: 7, title: 'Настройки', path: PATH.settingsPage },
      { id: 8, title: 'Выйти', path: PATH.auth },
    ]
  } else {
    buttons = [
      { id: 1, title: 'Объекты', path: PATH.objectCardPage },
      { id: 2, title: 'События', path: PATH.newsCardPage },
      { id: 3, title: 'Маршруты', path: PATH.routeCardPage },
      { id: 4, title: 'Фильтры', path: PATH.filtersPage },
      { id: 5, title: 'Уведомления', path: PATH.notificationsPage },
      { id: 6, title: 'Настройки', path: PATH.settingsPage },
      { id: 7, title: 'Выйти', path: PATH.auth },
    ]
  }

  const onActiveLogo = () => {
    navigate('/')
    setActiveBtn('')
  }

  useEffect(() => {
    setActiveBtn(location.pathname)
  }, [])

  return (
    <div className={styles.navbar}>
      <div className={main.container}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt='logo' onClick={onActiveLogo} />
          </div>
          {isAuth && (
            <div className={styles.functionalityContainer}>
              <ul className={styles.buttonsList}>
                {buttons.map((btn) => {
                  const onClickBtn = async () => {
                    navigate(btn.path)
                    setActiveBtn(btn.path)
                    if (btn.path === PATH.auth) {
                      await dispatch(logout())
                    }
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
