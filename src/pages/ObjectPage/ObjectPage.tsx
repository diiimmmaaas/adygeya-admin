import React from 'react'
import styles from './ObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'

const ObjectPage = () => {
  const navigate = useNavigate()
  const onRedirectToCreateObject = () => {
    navigate(PATH.createObjectCardPage)
  }
  return (
    <div className={styles.objectPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список объектов</h1>
        <div className={styles.createObjectBtnContainer} onClick={onRedirectToCreateObject}>
          <CustomButton name='Создать объект' />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default ObjectPage
