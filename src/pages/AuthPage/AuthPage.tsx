import React, { useState } from 'react'
import styles from './AuthPage.module.css'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { loginUser } from '../../redux/actions/authActions'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

interface FormValues {
  username: string
  password: string
}

const AuthPage = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Пользователь не указан.'),
    password: yup
      .string()
      .required('Пароль не указан.')
      .min(6, 'Пароль слишком короткий: минимум 6 символов.'),
  })

  const { error, isLoading } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    console.log(values)
    const resultAction = await dispatch(loginUser(values))

    // if (loginUser.rejected.match(resultAction)) {
    //   console.log(String(error))
    // } else {
    // }
  }

  return (
    <div className={styles.login}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validateOnBlur
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, isValid, handleChange, handleBlur, handleSubmit } = props

          return (
            <div className={styles.signInContainer}>
              <p className={styles.signInDescription}>Войдите в учетную запись</p>
              <div className={styles.signInInputGroup}>
                <CustomInput
                  type='username'
                  placeholder='Username'
                  name='username'
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={
                    errors.username && touched.username ? styles.inputError : styles.customInput
                  }
                />
                {touched.username && errors.username && (
                  <p className={styles.errorValidation}>{errors.username}</p>
                )}
                <CustomInput
                  placeholder='Password'
                  type='password'
                  name='password'
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    errors.password && touched.password ? styles.inputError : styles.customInput
                  }
                />
                {touched.password && errors.password && (
                  <p className={styles.errorValidation}>{errors.password}</p>
                )}
              </div>
              <div className={styles.errorNetwork}>{String(error)}</div>
              <div className={styles.buttonGroup}>
                <CustomButton
                  name='Войти'
                  disabled={!isValid}
                  onClick={() => handleSubmit()}
                  type='submit'
                />
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default AuthPage
