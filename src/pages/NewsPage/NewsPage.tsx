import React, { useEffect, useState } from 'react'
import styles from '../NewsPage/NewsPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import Loading from '../../components/Loading/Loading'
import TableComponent from '../../components/TableComponent/TableComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { deleteNews, getNews, publishNews } from '../../redux/actions/newsActions'
import PopupWithButtons from '../../components/PopupWithButtons/PopupWithButtons'
import { getObjects, publishObject } from '../../redux/actions/objectsActions'

export const headCellsNews = [
  '№',
  'Название',
  'Идентификатор',
  'Опубликовано',
  'Дата' + ' создания',
  'Управление',
]

const NewsPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)
  const [activePublishModal, setActivePublishModal] = useState(false)
  const [activeDeleteModal, setActiveDeleteModal] = useState(false)
  const [activeObjectId, setActiveObjectId] = useState<number | null>(null)

  const { token } = useAppSelector((state) => state.auth)
  const {
    news,
    isLoading,
    error,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.news)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onRedirectToCreateNews = () => {
    navigate(PATH.createNewsCardPage)
  }

  const onDeleteNews = async (objectId: number) => {
    setActiveObjectId(objectId)
    setActiveDeleteModal(true)
  }

  const onSubmitDelete = async () => {
    await dispatch(deleteNews({ id: activeObjectId, token }))
    await dispatch(getNews({ page: currentPage, size: currentSize, search, token }))
    setActiveDeleteModal(false)
  }

  const onPublishNews = (objectId: number) => {
    setActiveObjectId(objectId)
    setActivePublishModal(true)
  }

  const onSubmitPublish = async () => {
    await dispatch(publishNews({ objectId: activeObjectId, token }))
    await dispatch(getNews({ page: currentPage, size: currentSize, search, token }))
    setActivePublishModal(false)
  }

  const onChangeObject = (objectId: number) => {
    navigate(PATH.editNewsCardPage, { replace: true, state: objectId })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getNews({ page: currentPage, size: currentSize, search, token }))

    if (pageCount < page) {
      setCurrentPage(0)
    }
  }, [currentPage, currentSize, search])

  return (
    <div className={styles.newsPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список событий</h1>
        <div className={styles.createNewsBtnContainer}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать событие' onClick={onRedirectToCreateNews} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableComponent
            headCells={headCellsNews}
            news={news}
            onDeleteObject={onDeleteNews}
            onChangeObject={onChangeObject}
            onPublish={onPublishNews}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
          />
        )}
      </div>
      <PopupWithButtons
        popupTitle='Публикация или снятие с публикации события будет осуществлено в течении часа. Продолжить?'
        isPopupActive={activePublishModal}
        onCloseHandler={() => setActivePublishModal(false)}
        onSubmitHandler={onSubmitPublish}
        submitBtnTitle='Продолжить'
      />
      <PopupWithButtons
        popupTitle='Вы собираетесь удалить событие. Продолжить?'
        isPopupActive={activeDeleteModal}
        onCloseHandler={() => setActiveDeleteModal(false)}
        onSubmitHandler={onSubmitDelete}
        submitBtnTitle='Удалить'
      />
    </div>
  )
}

export default NewsPage
