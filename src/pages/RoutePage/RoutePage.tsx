import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import styles from './RoutePage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import Loading from '../../components/Loading/Loading'
import TableComponent from '../../components/TableComponent/TableComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { getRoutes } from '../../redux/actions/routesActions'

export const headCellsRoute = ['№', 'Название', 'Идентификатор', 'Опубликовано', 'Управление']

const RoutePage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)

  const { token } = useAppSelector((state) => state.auth)
  const {
    routes,
    isLoading,
    error,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.routes)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onRedirectToCreateRoute = () => {
    navigate(PATH.createRouteCardPage)
  }

  const onDeleteRoute = (routeId: number) => {
    console.log(routeId)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getRoutes({ page: currentPage, size: currentSize, search, token }))

    if (pageCount < page) {
      setCurrentPage(0)
    }
  }, [currentPage, currentSize, search])

  return (
    <div className={styles.routePageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список маршрутов</h1>
        <div className={styles.createRouteBtnContainer}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать маршрут' onClick={onRedirectToCreateRoute} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableComponent
            routes={routes}
            onDeleteObject={onDeleteRoute}
            onChangeObject={() => {
              console.log('')
            }}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
            headCells={headCellsRoute}
          />
        )}
      </div>
    </div>
  )
}

export default RoutePage
