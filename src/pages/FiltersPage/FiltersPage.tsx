import React, { useEffect, useState } from 'react'
import styles from './FiltersPage.module.css'
import main from '../../style/common.module.css'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import {
  deleteFilter, deletePointFromFilter,
  getFilters,
  postFilter,
  postPointForFilter
} from '../../redux/actions/filtersActions';
import redCross from '../../assets/icons/red-cross.png'
import Loading from '../../components/Loading/Loading';

const categoryForFilter = [
  { id: 1, title: 'Достопримечательности' },
  { id: 2, title: 'Активный отдых' },
  { id: 4, title: 'Места отдыха' },
  { id: 5, title: 'Проживание' },
  { id: 6, title: 'Питание' },
]

const FiltersPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('1')
  const [inputNameForFilter, setInputNameForFilter] = useState('')
  const [inputNameForPoint, setInputNameForPoint] = useState('')

  const { token } = useAppSelector((state) => state.auth)
  const { filters, isLoading } = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  const handleChange = async (event: SelectChangeEvent) => {
    const checkedCategory = event.target.value
    setCategoryFilter(checkedCategory as string)
  }

  const onAddNewFilter = async () => {
    await dispatch(postFilter({ categoryId: +categoryFilter, name: inputNameForFilter, token }))
    await dispatch(getFilters({ categoryId: +categoryFilter, token }))
    setInputNameForFilter('')
  }

  const onDeleteFilter = async (filterId: number) => {
    await dispatch(deleteFilter({ categoryId: +categoryFilter, filterId, token }))
    await dispatch(getFilters({ categoryId: +categoryFilter, token }))
  }

  const onAddPointForFilter = async (filterId: number, filterName: string) => {
    await dispatch(postPointForFilter({ categoryId: +categoryFilter, name: filterName, value: inputNameForPoint, filterId, token }))
    await dispatch(getFilters({ categoryId: +categoryFilter, token }))
    setInputNameForPoint('')
  }

  const onDeletePointFromFilter = async (filterId: number, valueId: number) => {
    await dispatch(deletePointFromFilter({ categoryId: +categoryFilter, filterId, valueId, token }))
    await dispatch(getFilters({ categoryId: +categoryFilter, token }))
  }

  useEffect(() => {
    dispatch(getFilters({ categoryId: +categoryFilter, token }))
  }, [categoryFilter])

  if (isLoading){
    return <Loading/>
  }

  return (
    <div className={styles.filtersPage}>
      <div className={main.container}>
        <h1 className={main.title}>Страница редактирования фильтров</h1>
        <div className={styles.categoryFilter}>
          <FormControl variant='standard' sx={{ m: 1, width: 250 }}>
            <InputLabel id='label'>Выберите категорию</InputLabel>
            <Select
              labelId='label'
              id='demo-simple-select-standard'
              value={categoryFilter}
              onChange={handleChange}
              label='Age'
            >
              {categoryForFilter.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.filtersBoard}>
          {filters.map((filter) => {
            return (
              <ul key={filter.id} className={styles.filterBlock}>
                <div className={styles.filterHeader}>
                  <p className={styles.filterName}>{filter.name}</p>
                  <img onClick={() => onDeleteFilter(filter.id)} className={styles.cross} src={redCross} alt="cross" />
                </div>
                {filter?.values.map((value, index) => {
                  return (
                    <div key={index} className={styles.filterPoint} >
                      <li className={styles.filterPointName} key={value.id}>
                        {index + 1} {value.value}
                      </li>
                      <img onClick={() => onDeletePointFromFilter(filter.id, value.id)} className={styles.cross} src={redCross} alt="cross" />
                    </div>
                  )
                })}
                <div className={styles.newFilterPoint}>
                  <input onChange={(e) => setInputNameForPoint(e.target.value)} className={styles.newFilterPointInput} type="text" placeholder="Еще один пункт..."/>
                  <button onClick={() => onAddPointForFilter(filter.id, filter.name)} className={styles.newFilterPointButton}>+</button>
                </div>
              </ul>
            )
          })}
          <div className={styles.filterBlockEmpty}>
            <div className={styles.newFilterPoint}>
              <input value={inputNameForFilter} onChange={(e) => setInputNameForFilter(e.target.value)} className={styles.newFilterPointInput} type="text" placeholder="Еще один фильтр..."/>
              <button onClick={onAddNewFilter} className={styles.newFilterPointButton}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersPage
