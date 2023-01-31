import React, { useEffect, useState } from 'react'
import styles from '../UsersPage/UsersPage.module.css'
import main from '../../style/common.module.css'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import Loading from '../../components/Loading/Loading'
import TableComponent from '../../components/TableComponent/TableComponent'
import { headCellsRoute } from '../RoutePage/RoutePage'
import { getRoutes } from '../../redux/actions/routesActions'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { deleteUser, getUsers } from '../../redux/actions/usersActions'

export const headCellsUsers = ['№', 'Название', 'Идентификатор', 'Роли', 'Управление']

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)

  const { token } = useAppSelector((state) => state.auth)
  const {
    users,
    isLoading,
    error,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onRedirectToCreateUser = () => {
    navigate(PATH.createUsersPage)
  }

  const onDeleteRoute = async (userId: number) => {
    await dispatch(deleteUser({ id: userId, token }))
    await dispatch(getUsers({ page: currentPage, size: currentSize, search, token }))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getUsers({ page: currentPage, size: currentSize, search, token }))

    if (pageCount < page) {
      setCurrentPage(0)
    }
  }, [currentPage, currentSize, search])

  return (
    <div className={styles.usersPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список пользователей</h1>
        <div className={styles.createUserBtnContainer}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать пользователя' onClick={onRedirectToCreateUser} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableComponent
            users={users}
            onDeleteObject={onDeleteRoute}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
            headCells={headCellsUsers}
          />
        )}
      </div>
    </div>
  )
}

export default UsersPage
