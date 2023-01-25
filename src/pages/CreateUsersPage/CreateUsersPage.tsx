import React, { useState } from 'react'
import styles from './CreateUsersPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { postUser } from '../../redux/actions/usersActions'
import { loginUser } from '../../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'

export type CreateUserType = {
  login: string
  password: string
  roles: string[]
}

const options = [
  { label: 'admin', value: 'admin' },
  { label: 'copywriter', value: 'copywriter' },
]

const CreateUsersPage = () => {
  const [userData, setUserData] = useState<CreateUserType>({
    login: '',
    password: '',
    roles: ['copywriter'],
  })

  const { token, error, isLoading } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onChangeLoginUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, login: e.target.value })
  }

  const onChangePasswordUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value })
  }

  const onSubmit = async () => {
    const resultAction = await dispatch(postUser({ userData, token }))

    if (postUser.rejected.match(resultAction)) {
      console.log(String(error))
    } else {
      navigate(PATH.usersPage)
    }
  }

  return (
    <div className={styles.users}>
      <div className={main.container}>
        <h1 className={main.title}>Создать пользователя</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Логин пользователя'
            placeholder='Введите логин пользователя'
            type='text'
            callbackHandler={onChangeLoginUserHandler}
          />
          <CustomNameInput
            name='Пароль пользователя'
            placeholder='Введите пароль пользователя'
            type='text'
            callbackHandler={onChangePasswordUserHandler}
          />
          <div className={styles.selectBlock}>
            <h4 className={styles.objectNameTitle}>Выберите роль пользователя</h4>
            <CustomSelect
              value={userData.roles[0]}
              defaultValue='admin'
              options={options}
              callbackHandler={(newValue) => {
                setUserData({ ...userData, roles: [newValue.value] })
              }}
            />
          </div>
        </div>
        <SubmitButton name='Сохранить' onClickHandler={onSubmit} />
      </div>
    </div>
  )
}

export default CreateUsersPage
