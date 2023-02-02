import React, { useEffect, useState } from 'react'
import styles from './MainPage.module.css'
import main from '../../style/common.module.css'
import { PATH } from '../../navigation/path'
import { useNavigate } from 'react-router-dom'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { postSearch } from '../../redux/actions/searchAction'
import TableComponentWithoutPagination from '../../components/TableComponentWithoutPagination/TableComponentWithoutPagination'
import Loading from '../../components/Loading/Loading'

export const headCellsObj = ['№', 'Название', 'Идентификатор', 'Опубликовано', 'Управление']

const blocks = [
  { id: 1, title: 'Создать объект', path: PATH.createObjectCardPage },
  { id: 2, title: 'Создать событие', path: PATH.createNewsCardPage },
  { id: 3, title: 'Создать маршрут', path: PATH.createRouteCardPage },
  { id: 4, title: 'Создать уведомление', path: PATH.createNotificationsPage },
  { id: 5, title: 'Создать пользователей', path: PATH.createUsersPage },
  { id: 6, title: 'Настройки', path: PATH.settingsPage },
]

const MainPage = () => {
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isAuth, token } = useAppSelector((state) => state.auth)
  const { searchData, isLoading } = useAppSelector((state) => state.search)

  useEffect(() => {
    if (!isAuth) {
      navigate(PATH.auth)
    }
  }, [])

  const handleSearch = async () => {
    await dispatch(postSearch({ query: search, token: token }))
  }

  const onDeleteElement = (elementId: number) => {
    console.log(elementId)
  }

  const onChangeElement = (elementId: number) => {
    console.log(elementId)
  }

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
            <SearchFunctionalityComponent
              search={search}
              setSearch={setSearch}
              onChangeHandler={handleSearch}
            />
          </div>
          {isLoading ? (
            <div className={styles.loadingMargin}>
              <Loading />
            </div>
          ) : (
            <div>
              <div className={styles.footerButtonContainer}>
                <button className={styles.footerButton}>
                  Объекты ({searchData.landmarks.length})
                </button>
                <button className={styles.footerButton}>Новости ({searchData.news.length})</button>
                <button className={styles.footerButton}>
                  Маршруты ({searchData.routes.length})
                </button>
              </div>
              <div className={styles.tableStyle}>
                <TableComponentWithoutPagination
                  objects={searchData.landmarks}
                  news={searchData.news}
                  routes={searchData.routes}
                  headCells={headCellsObj}
                  onDeleteObject={onDeleteElement}
                  onChangeObject={onChangeElement}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainPage
