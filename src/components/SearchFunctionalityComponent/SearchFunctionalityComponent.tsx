import React, { ChangeEvent } from 'react'
import styles from './SearchFunctionalityComponent.module.css'
import searchIcon from '../../assets/icons/search.svg'

type SearchFunctionalityComponentPropsType = {
  search: string
  setSearch: (search: string) => void
}

const SearchFunctionalityComponent: React.FC<SearchFunctionalityComponentPropsType> = ({
  search,
  setSearch,
}) => {
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className={styles.searchFunctionality}>
      <div className={styles.searchInputContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt='search' />
        <input
          value={search}
          className={styles.searchInput}
          type='text'
          placeholder='Поиск'
          onChange={onSearchHandler}
        />
      </div>
    </div>
  )
}

export default SearchFunctionalityComponent
