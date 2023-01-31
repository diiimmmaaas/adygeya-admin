import React, { useEffect, useState } from 'react'
import styles from './ObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { getObjects } from '../../redux/actions/objectsActions'
import Loading from '../../components/Loading/Loading'
import TableComponent from '../../components/TableComponent/TableComponent'

const ObjectPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)

  const { token } = useAppSelector((state) => state.auth)
  const {
    objects,
    isLoading,
    error,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.objects)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onRedirectToCreateObject = () => {
    navigate(PATH.createObjectCardPage)
  }

  const onDeleteObject = (objectId: number) => {
    console.log(objectId)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getObjects({ page: currentPage, size: currentSize, search, token }))

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
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
          />
        )}
      </div>
    </div>
  )
}

export default ObjectPage
