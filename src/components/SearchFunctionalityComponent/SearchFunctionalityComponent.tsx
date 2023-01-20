import React from 'react'
import styles from './SearchFunctionalityComponent.module.css'
import search from '../../assets/icons/search.svg'

const SearchFunctionalityComponent = () => {
  return (
    <div className={styles.searchFunctionality}>
      <div className={styles.searchInputContainer}>
        <img className={styles.searchIcon} src={search} alt='search' />
        <input className={styles.searchInput} type='text' placeholder='Поиск' />
      </div>
    </div>
  )
}

export default SearchFunctionalityComponent
