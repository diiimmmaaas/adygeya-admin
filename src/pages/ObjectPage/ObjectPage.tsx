import React, { useEffect, useState } from 'react'
import styles from './ObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../navigation/path'
import SearchFunctionalityComponent from '../../components/SearchFunctionalityComponent/SearchFunctionalityComponent'
import { useAppDispatch, useAppSelector } from '../../redux/utils/redux-utils'
import { getObjects } from '../../redux/actions/objectsActions'
import { visuallyHidden } from '@mui/utils'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
} from '@mui/material'
import Loading from '../../components/Loading/Loading'

type Order = 'asc' | 'desc'
const headCells = ['№', 'Название', 'Идентификатор', 'Опубликовано', 'Управление']

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  headCells: Array<string>
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, headCells } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell}
            align={'left'}
            padding='normal'
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ObjectPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState<number>(5)

  const { token } = useAppSelector((state) => state.auth)
  const {
    objects,
    isLoading,
    error,
    meta: { page, hasPreviousPage, pageCount, itemCount, hasNextPage, take },
  } = useAppSelector((state) => state.objects)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onRedirectToCreateObject = () => {
    navigate(PATH.createObjectCardPage)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(parseInt(event.target.value))
  }

  useEffect(() => {
    dispatch(getObjects({ page: currentPage, size: currentSize, search, token }))

    if (pageCount < page) {
      setCurrentPage(0)
    }
  }, [currentPage, currentSize, search])

  return (
    <div className={styles.objectPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Список объектов</h1>
        <div className={styles.createObjectBtnContainer}>
          <SearchFunctionalityComponent setSearch={setSearch} search={search} />
          <CustomButton name='Создать объект' onClick={onRedirectToCreateObject} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Box sx={{ width: '100%', marginBottom: 32 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 600 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead
                    headCells={headCells}
                    order={'asc'}
                    orderBy={''}
                    onRequestSort={() => {
                      console.log('')
                    }}
                  />
                  <TableBody>
                    {objects.map((object, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell size='small' align='left' sx={{ overflowWrap: 'anywhere' }}>
                            <div>{index + 1}</div>
                          </TableCell>
                          <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                            <div>{object.name}</div>
                          </TableCell>
                          <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                            <div>{object.id}</div>
                          </TableCell>
                          <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                            <div>{object.published ? 'Да' : 'Нет'}</div>
                          </TableCell>
                          <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}></TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={itemCount}
                rowsPerPage={currentSize}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={'Объектов на странице'}
              />
            </Paper>
          </Box>
        )}
      </div>
    </div>
  )
}

export default ObjectPage
