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
import { deleteNews } from '../../redux/actions/newsActions'
import { deleteObject } from '../../redux/actions/objectsActions'
import { deleteRoute } from '../../redux/actions/routesActions'
import { MyEditor } from '../../components/MyEditor/MyEditor'

export const headCellsObj = ['№', 'Название', 'Идентификатор', 'Опубликовано', 'Управление']
export const headCellsNews = [
  '№',
  'Название',
  'Идентификатор',
  'Опубликовано',
  'Дата',
  'Управление',
]

const blocks = [
  { id: 1, title: 'Создать объект', path: PATH.createObjectCardPage },
  { id: 2, title: 'Создать событие', path: PATH.createNewsCardPage },
  { id: 3, title: 'Создать маршрут', path: PATH.createRouteCardPage },
  { id: 4, title: 'Создать уведомление', path: PATH.notificationsPage },
  { id: 5, title: 'Создать пользователей', path: PATH.createUsersPage },
  { id: 6, title: 'Настройки', path: PATH.settingsPage },
]

const MainPage = () => {
  const [search, setSearch] = useState<string>('')
  const [isNews, setIsNews] = useState<boolean>(false)
  const [isObject, setIsObject] = useState<boolean>(false)
  const [isRoute, setIsRoute] = useState<boolean>(false)
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

  const onDeleteElement = async (elementId: number) => {
    await dispatch(deleteRoute({ id: elementId, token }))
    await dispatch(postSearch({ query: search, token: token }))
  }

  const onChangeElement = (elementId: number) => {
    navigate(PATH.editRoutePage, { replace: true, state: elementId })
  }

  const onDeleteNews = async (newsId: number) => {
    await dispatch(deleteNews({ id: newsId, token }))
    await dispatch(postSearch({ query: search, token: token }))
  }

  const onChangeNews = (newsId: number) => {
    navigate(PATH.editNewsCardPage, { replace: true, state: newsId })
  }

  const onDeleteObject = async (objectId: number) => {
    await dispatch(deleteObject({ id: objectId, token }))
    await dispatch(postSearch({ query: search, token: token }))
  }
  const onChangeObject = (objectId: number) => {
    navigate(PATH.editObjectCardPage, { replace: false, state: objectId })
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
                <button
                  className={styles.footerButton}
                  onClick={() => {
                    setIsNews(false)
                    setIsRoute(false)
                    setIsObject(!isObject)
                  }}
                >
                  Объекты ({searchData.landmarks.length})
                </button>
                <button
                  className={styles.footerButton}
                  onClick={() => {
                    setIsNews(!isNews)
                    setIsRoute(false)
                    setIsObject(false)
                  }}
                >
                  Новости ({searchData.news.length})
                </button>
                <button
                  className={styles.footerButton}
                  onClick={() => {
                    setIsNews(false)
                    setIsRoute(!isRoute)
                    setIsObject(false)
                  }}
                >
                  Маршруты ({searchData.routes.length})
                </button>
              </div>
              {/* для каждой из колонок надо создать свое удаление и редактирование */}
              {isRoute && (
                <div className={styles.tableStyle}>
                  <TableComponentWithoutPagination
                    routes={searchData.routes}
                    headCells={headCellsObj}
                    onDeleteObject={onDeleteElement}
                    onChangeObject={onChangeElement}
                  />
                </div>
              )}
              {isNews && (
                <div className={styles.tableStyle}>
                  <TableComponentWithoutPagination
                    news={searchData.news}
                    headCells={headCellsNews}
                    onDeleteObject={onDeleteNews}
                    onChangeObject={onChangeNews}
                  />
                </div>
              )}
              {isObject && (
                <div className={styles.tableStyle}>
                  <TableComponentWithoutPagination
                    objects={searchData.landmarks}
                    headCells={headCellsObj}
                    onDeleteObject={onDeleteObject}
                    onChangeObject={onChangeObject}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainPage
