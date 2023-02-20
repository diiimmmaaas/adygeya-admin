import React, { useEffect, useState } from 'react'
import styles from './ObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { deleteObject, getObjects, publishObject } from '../../redux/actions/objectsActions'
import Loading from '../../components/Loading/Loading'
import TableComponent, { Order } from '../../components/TableComponent/TableComponent'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'

export type HeadCellType = {
  title: string
  orderBy: string
}

export const headCellsObj:Array<HeadCellType> = [
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

const ObjectPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)
  const [activePublishModal, setActivePublishModal] = useState(false)
  const [activeDeleteModal, setActiveDeleteModal] = useState(false)
  const [activeObjectId, setActiveObjectId] = useState<number | null>(null)

  const { token } = useAppSelector((state) => state.auth)
  const {
    objects,
    isLoading,
    error,
    order,
    orderBy,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.objects)

  console.log(order, orderBy);

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onRedirectToCreateObject = () => {
    navigate(PATH.createObjectCardPage)
  }

  const onDeleteObject = async (objectId: number) => {
    setActiveObjectId(objectId)
    setActiveDeleteModal(true)
  }

  const onPublishObject = (objectId: number) => {
    setActiveObjectId(objectId)
    setActivePublishModal(true)
  }

  const onSubmitDelete = async () => {
    await dispatch(deleteObject({ id: activeObjectId, token }))
    await dispatch(getObjects({ page: currentPage, size: currentSize, search, token }))
    setActiveDeleteModal(false)
  }

  const onSubmitPublish = async () => {
    await dispatch(publishObject({ objectId: activeObjectId, token }))
    await dispatch(getObjects({ page: currentPage, size: currentSize, search, token }))
    setActivePublishModal(false)
  }

  const onSortHandler = async (order: Order, orderBy: string) => {
    await dispatch(
      getObjects({
        page: currentPage,
        size: currentSize,
        search,
        token,
        order,
        orderBy: orderBy,
      }),
    )
  }

  const onChangeObject = (objectId: number) => {
    navigate(PATH.editObjectCardPage, { replace: false, state: objectId })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getObjects({ page: currentPage, size: currentSize, search, token, order, orderBy }))

    if (pageCount < page) {
      setCurrentPage(0)
    }
  }, [currentPage, currentSize, search])

  return (
    <div className={styles.objectPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список объектов</h1>
        <div className={styles.createObjectBtnContainer}>
          <SearchFunctionalityComponent setSearch={setSearch} search={search} />
          <CustomButton name='Создать объект' onClick={onRedirectToCreateObject} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableComponent
            objects={objects}
            onDeleteObject={onDeleteObject}
            onChangeObject={onChangeObject}
            onPublish={onPublishObject}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
            headCells={headCellsObj}
            onSort={onSortHandler}
            storeOrder={order}
            storeOrderBy={orderBy}
          />
        )}
      </div>
      <PopupWithButtons
        popupTitle='Публикация или снятие с публикации объекта будет осуществлено в течении часа. Продолжить?'
        isPopupActive={activePublishModal}
        onCloseHandler={() => setActivePublishModal(false)}
        onSubmitHandler={onSubmitPublish}
        submitBtnTitle='Продолжить'
      />
      <PopupWithButtons
        popupTitle='Вы собираетесь удалить объект. Продолжить?'
        isPopupActive={activeDeleteModal}
        onCloseHandler={() => setActiveDeleteModal(false)}
        onSubmitHandler={onSubmitDelete}
        submitBtnTitle='Удалить'
      />
    </div>
  )
}

export default ObjectPage
