import React, { useEffect, useState } from 'react'
import styles from '../UsersPage/UsersPage.module.css'
import main from '../../style/common.module.css'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import Loading from '../../components/Loading/Loading'
import TableComponent, { Order } from '../../components/TableComponent/TableComponent';
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { changeUserRole, deleteUser, getUsers } from '../../redux/actions/usersActions'
import PopupForCreateMedia from '../../components/PopupForCreateMedia/PopupForCreateMedia'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import { options } from '../CreateUsersPage/CreateUsersPage'
import { HeadCellType } from '../ObjectPage/ObjectPage';


export const headCellsUsers:Array<HeadCellType> = [
  { title: '№', orderBy: 'number' },
  {
    title: 'Название',
    orderBy: 'name',
  },
  { title: 'Идентификатор', orderBy: 'id' },
  {
    title: 'Роли',
    orderBy: 'role',
  },
  { title: 'Управление', orderBy: 'functional' },
]

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)
  const [activeModal, setActiveModal] = useState(false)
  const [roles, setRoles] = useState<string[]>(['copywriter'])
  const [userChangedId, setUserChangedId] = useState<number | null>(null)

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

  const onDeleteUser = async (userId: number) => {
    await dispatch(deleteUser({ id: userId, token }))
    await dispatch(getUsers({ page: currentPage, size: currentSize, search, token }))
  }

  const onChangeUserRole = (userId: number) => {
    setUserChangedId(userId)
    setActiveModal(true)
  }

  const onSubmitPopup = async () => {
    await dispatch(changeUserRole({ id: userChangedId, roles: roles, token }))
    setActiveModal(false)
    setUserChangedId(null)
  }

  const onSortHandler = async (order: Order, orderBy: string) => {
    console.log(order);
    console.log(orderBy);
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
  }, [currentPage, currentSize, search, userChangedId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.usersPageContainer}>
      <PopupForCreateMedia
        onSubmitHandler={onSubmitPopup}
        isPopupActive={activeModal}
        popupTitle='Редактирование пользователя'
        onCloseHandler={() => setActiveModal(false)}
      >
        <div className={styles.selectBlock}>
          <h4 className={styles.objectNameTitle}>Выберите роль пользователя</h4>
          <CustomSelect
            value={roles[0]}
            defaultValue='copywriter'
            options={options}
            callbackHandler={(newValue) => {
              setRoles([newValue.value])
            }}
          />
        </div>
      </PopupForCreateMedia>
      <div className={main.container}>
        <h1 className={main.title}>Список пользователей</h1>
        {error && (
          <div className={styles.errorText}>Упс... что-то пошло не так, попробуйте еще раз...</div>
        )}
        <div className={styles.createUserBtnContainer}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать пользователя' onClick={onRedirectToCreateUser} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableComponent
            users={users}
            onDeleteObject={onDeleteUser}
            onChangeObject={onChangeUserRole}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            itemCount={itemCount}
            currentPage={currentPage}
            currentSize={currentSize}
            headCells={headCellsUsers}
            onSort={onSortHandler}
            storeOrder={'asc'}
            storeOrderBy={'name'}
          />
        )}
      </div>
    </div>
  )
}

export default UsersPage
