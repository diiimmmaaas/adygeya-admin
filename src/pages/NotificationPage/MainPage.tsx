import React from 'react'
import styles from './MainPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import search from '../../assets/icons/search.svg'
import { PATH } from '../../navigation/path'
import { useNavigate } from 'react-router-dom'

const blocks = [
  { id: 1, title: 'Создать объект', path: PATH.createObjectCardPage },
  { id: 2, title: 'Создать событие', path: PATH.createNewsCardPage },
  { id: 3, title: 'Создать Маршрут', path: PATH.createRouteCardPage },
  { id: 4, title: 'Пользователи', path: PATH.usersPage },
  { id: 5, title: 'Создать уведомление', path: PATH.notificationsPage },
  { id: 6, title: 'Настройки', path: PATH.settingsPage },
]

const MainPage = () => {
  const navigate = useNavigate()

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
            <div className={styles.searchFunctionality}>
              <div className={styles.searchInputContainer}>
                <img className={styles.searchIcon} src={search} alt='search' />
                <input className={styles.searchInput} type='text' placeholder='Поиск' />
              </div>
              <CustomButton name={'Редактировать'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
