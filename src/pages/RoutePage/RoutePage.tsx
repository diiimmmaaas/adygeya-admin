import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import styles from './RoutePage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import Loading from '../../components/Loading/Loading'
import TableComponent, { Order } from '../../components/TableComponent/TableComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { deleteRoute, getRoutes, publishRoute } from '../../redux/actions/routesActions'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'
import { HeadCellType } from '../ObjectPage/ObjectPage';

export const headCellsRoute:Array<HeadCellType> = [
  { title: '№', orderBy: 'number' },
  {
    title: 'Название',
    orderBy: 'name',
  },
  { title: 'Идентификатор', orderBy: 'id' },
  {
    title: 'Опубликовано',
    orderBy: 'published',
  },
  { title: 'Управление', orderBy: 'functional' },
]

const RoutePage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)
  const [activePublishModal, setActivePublishModal] = useState(false)
  const [activeDeleteModal, setActiveDeleteModal] = useState(false)
  const [activeObjectId, setActiveObjectId] = useState<number | null>(null)

  const { token } = useAppSelector((state) => state.auth)
  const {
    routes,
    isLoading,
    error,
    orderBy,
    order,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.routes)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onRedirectToCreateRoute = () => {
    navigate(PATH.createRouteCardPage)
  }

  const onDeleteRoute = async (routeId: number) => {
    setActiveObjectId(routeId)
    setActiveDeleteModal(true)
  }

  const onSubmitDelete = async () => {
    await dispatch(deleteRoute({ id: activeObjectId, token }))
    await dispatch(getRoutes({ page: currentPage, size: currentSize, search, token }))
    setActiveDeleteModal(false)
  }

  const onPublishObject = (objectId: number) => {
    setActiveObjectId(objectId)
    setActivePublishModal(true)
  }

  const onSubmitPublish = async () => {
    await dispatch(publishRoute({ objectId: activeObjectId, token }))
    await dispatch(getRoutes({ page: currentPage, size: currentSize, search, token }))
    setActivePublishModal(false)
  }

  const onSortHandler = async (order: Order, orderBy: string) => {
    dispatch(getRoutes({ page: currentPage, size: currentSize, search, token, order, orderBy }))
  }

  const onChangeRoute = (objectId: number) => {
    navigate(PATH.editRoutePage, { replace: true, state: objectId })
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
            onPublish={onPublishObject}
            onChangeObject={onChangeRoute}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
            headCells={headCellsRoute}
            onSort={onSortHandler}
            storeOrder={order}
            storeOrderBy={orderBy}
          />
        )}
      </div>
      <PopupWithButtons
        popupTitle='Публикация или снятие с публикации маршрута будет осуществлено в течении часа. Продолжить?'
        isPopupActive={activePublishModal}
        onCloseHandler={() => setActivePublishModal(false)}
        onSubmitHandler={onSubmitPublish}
        submitBtnTitle='Продолжить'
      />
      <PopupWithButtons
        popupTitle='Вы собираетесь удалить маршрут. Продолжить?'
        isPopupActive={activeDeleteModal}
        onCloseHandler={() => setActiveDeleteModal(false)}
        onSubmitHandler={onSubmitDelete}
        submitBtnTitle='Удалить'
      />
    </div>
  )
}

export default RoutePage
