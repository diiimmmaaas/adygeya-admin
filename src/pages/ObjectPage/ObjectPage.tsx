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
import {
  FormControl,
  Box,
  Select,
  InputLabel,
  SelectChangeEvent,
  MenuItem
} from '@mui/material';

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

const categoryForFilter = [
  {id: 0, title: 'Все'},
  {id: 1, title: 'Достопримечательности'},
  {id: 2, title: 'Активный отдых'},
  {id: 3, title: 'Маршруты'},
  {id: 4, title: 'Места отдыха'},
  {id: 5, title: 'Проживание'},
  {id: 6, title: 'Питание'},
  {id: 7, title: 'Культурные достопримечательности'},
  {id: 8, title: 'Природные достопримечательности'},
  {id: 9, title: 'Отели'},
  {id: 10, title: 'Базы отдыха'},
  {id: 11, title: 'Глэмпинги'},
  {id: 12, title: 'Кемпинги'},
  {id: 13, title: 'Рестораны'},
  {id: 14, title: 'Кафе'},
  {id: 15, title: 'Магазины'},
  {id: 16, title: 'Рафтинг'},
  {id: 17, title: 'Конные прогулки'},
  {id: 18, title: 'Квадроциклы'},
  {id: 19, title: 'Джимпинг'},
  {id: 20, title: 'Экстрим'},
  {id: 21, title: 'Зимний отдых'},
  {id: 22, title: 'Термальные источники'},
  {id: 23, title: 'Бани'},
  {id: 24, title: 'Бассейны'},
  {id: 25, title: 'Место для пикника'},
]

const ObjectPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)
  const [activePublishModal, setActivePublishModal] = useState(false)
  const [activeDeleteModal, setActiveDeleteModal] = useState(false)
  const [activeObjectId, setActiveObjectId] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('0');

  const handleChange = async (event: SelectChangeEvent) => {
    const checkedCategory = event.target.value
    setCategoryFilter(checkedCategory as string);
    await dispatch(
      getObjects({
        page: currentPage,
        size: currentSize,
        search,
        token,
        order,
        orderBy: orderBy,
        category: checkedCategory !== '0' ? +checkedCategory : 0
      }),
    )
  };

  const { token } = useAppSelector((state) => state.auth)
  const {
    objects,
    isLoading,
    error,
    order,
    orderBy,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.objects)

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
        <div className={styles.categoryFilter}>
          <FormControl variant="standard" sx={{ m: 1, width: 250 }}>
            <InputLabel id="label">Выберите категорию</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select-standard"
              value={categoryFilter}
              onChange={handleChange}
              label="Age"
            >
              {categoryForFilter.map(category => {
                return <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
              })}
            </Select>
          </FormControl>
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
