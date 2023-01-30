import React, { useState } from 'react'
import styles from '../UsersPage/UsersPage.module.css'
import main from '../../style/common.module.css'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const onRedirectToCreateUser = () => {
    navigate(PATH.createUsersPage)
  }
  return (
    <div className={styles.usersPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список пользователей</h1>
        <div className={styles.createUserBtnContainer} onClick={onRedirectToCreateUser}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать пользователя' />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default UsersPage
