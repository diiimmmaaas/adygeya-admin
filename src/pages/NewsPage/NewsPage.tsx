import React, { useState } from 'react'
import styles from '../NewsPage/NewsPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'

const NewsPage = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const onRedirectToCreateNews = () => {
    navigate(PATH.createNewsCardPage)
  }
  return (
    <div className={styles.newsPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список событий</h1>
        <div className={styles.createNewsBtnContainer}>
          <SearchFunctionalityComponent search={search} setSearch={setSearch} />
          <CustomButton name='Создать событие' onClick={onRedirectToCreateNews} />
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default NewsPage
