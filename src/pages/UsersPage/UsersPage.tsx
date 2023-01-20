import React from 'react'
import styles from '../UsersPage/UsersPage.module.css'
import main from '../../style/common.module.css'

const UsersPage = () => {
  return (
    <div className={styles.usersPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список пользователей</h1>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default UsersPage
