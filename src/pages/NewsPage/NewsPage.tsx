import React from 'react'
import styles from '../NewsPage/NewsPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'

const NewsPage = () => {
  const navigate = useNavigate()
  const onRedirectToCreateNews = () => {
    navigate(PATH.createNewsCardPage)
  }
  return (
    <div className={styles.newsPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список событий</h1>
        <div className={styles.createNewsBtnContainer} onClick={onRedirectToCreateNews}>
          <CustomButton name='Создать событие' />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default NewsPage
