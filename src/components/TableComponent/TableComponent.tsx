import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import changeObjIcon from '../../assets/icons/change.svg'
import deleteObjIcon from '../../assets/icons/delete.svg'
import { visuallyHidden } from '@mui/utils'
import { ObjectResponseDataType } from '../../redux/types/types'
import styles from './TableComponent.module.css'

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

type TableComponentPropsType = {
  objects: ObjectResponseDataType[]
  itemCount: number
  currentPage: number
  currentSize: number
  onDeleteObject: (objectId: number) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TableComponent: React.FC<TableComponentPropsType> = ({
  objects,
  itemCount,
  currentPage,
  currentSize,
  onDeleteObject,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  return (
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
                const onDeleteObjectHandler = () => {
                  onDeleteObject(object.id)
                }
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
                    <TableCell
                      className={styles.functionalBtnBlock}
                      align='left'
                      sx={{ overflowWrap: 'anywhere' }}
                    >
                      <img
                        className={styles.functionalBtn}
                        src={changeObjIcon}
                        alt='changeObjIcon'
                      />
                      <img
                        className={styles.functionalBtn}
                        src={deleteObjIcon}
                        alt='deleteObjIcon'
                        onClick={onDeleteObjectHandler}
                      />
                    </TableCell>
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
  )
}

export default TableComponent
