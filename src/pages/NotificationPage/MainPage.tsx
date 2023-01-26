import React, { useEffect } from 'react'
import styles from './MainPage.module.css'
import main from '../../style/common.module.css'
import { PATH } from '../../navigation/path'
import { useNavigate } from 'react-router-dom'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useAppSelector } from '../../redux/utils/redux-utils'

const blocks = [
  { id: 1, title: 'Создать объект', path: PATH.createObjectCardPage },
  { id: 2, title: 'Создать событие', path: PATH.createNewsCardPage },
  { id: 3, title: 'Создать маршрут', path: PATH.createRouteCardPage },
  { id: 4, title: 'Создать уведомление', path: PATH.notificationsPage },
  { id: 5, title: 'Создать пользователей', path: PATH.createUsersPage },
  { id: 6, title: 'Настройки', path: PATH.settingsPage },
]

const MainPage = () => {
  const navigate = useNavigate()

  const { isAuth } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuth) {
      navigate(PATH.auth)
    }
  }, [])

  return (
    <div className={styles.main}>
      <div className={main.container}>
        <h1 className={main.title}>Главная</h1>
        <div className={styles.content}>
          <h2 className={styles.subTitle}>Панель инструментов</h2>
          <div className={styles.functionalBlocks}>
            {blocks.map((block) => {
              const onActiveFunctionalButton = () => {
                navigate(block.path)
              }

              return (
                <div
                  key={block.id}
                  className={styles.functionalBlock}
                  onClick={onActiveFunctionalButton}
                >
                  <p className={styles.functionalBlockText}>{block.title}</p>
                </div>
              )
            })}
          </div>
          <div className={styles.searchContainer}>
            <h3 className={styles.searchTitle}>
              Поиск по уже существующим объектам, событиям, маршрутам
            </h3>
            <SearchFunctionalityComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
