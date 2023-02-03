import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import changeObjIcon from '../../assets/icons/change.svg'
import deleteObjIcon from '../../assets/icons/delete.svg'
import { visuallyHidden } from '@mui/utils'
import {
  NewsResponseDataType,
  ObjectResponseDataType,
  RoutesResponseDataType,
} from '../../redux/types/types'
import styles from './TableComponentWithoutPagination.module.css'

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  headCells: Array<string>
  isNews: boolean
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
  objects?: ObjectResponseDataType[]
  news?: NewsResponseDataType[]
  routes?: RoutesResponseDataType[]
  headCells: string[]
  onDeleteObject: (objectId: number) => void
  onChangeObject: (objectId: number) => void
}

const TableComponentWithoutPagination: React.FC<TableComponentPropsType> = ({
  objects,
  news,
  routes,
  headCells,
  onDeleteObject,
  onChangeObject,
}) => {
  return (
    <Box sx={{ width: '100%', marginBottom: 32 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 600 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              isNews
              headCells={headCells}
              order={'asc'}
              orderBy={''}
              onRequestSort={() => {
                console.log('')
              }}
            />
            <TableBody>
              {objects &&
                objects.map((object, index) => {
                  const onDeleteObjectHandler = () => {
                    onDeleteObject(object.id)
                  }
                  const onChangeObjectHandler = () => {
                    onChangeObject(object.id)
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
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div className={styles.functionalBtnBlock}>
                          <img
                            className={styles.functionalBtn}
                            src={changeObjIcon}
                            alt='changeObjIcon'
                            onClick={onChangeObjectHandler}
                          />
                          <img
                            className={styles.functionalBtn}
                            src={deleteObjIcon}
                            alt='deleteObjIcon'
                            onClick={onDeleteObjectHandler}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {news &&
                news.map((n, index) => {
                  const onDeleteObjectHandler = () => {
                    onDeleteObject(n.id)
                  }
                  const onChangeObjectHandler = () => {
                    onChangeObject(n.id)
                  }
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell size='small' align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{n.title}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{n.id}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{n.published ? 'Да' : 'Нет'}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{n.date}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div className={styles.functionalBtnBlock}>
                          <img
                            className={styles.functionalBtn}
                            src={changeObjIcon}
                            alt='changeObjIcon'
                            onClick={onChangeObjectHandler}
                          />
                          <img
                            className={styles.functionalBtn}
                            src={deleteObjIcon}
                            alt='deleteObjIcon'
                            onClick={onDeleteObjectHandler}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {routes &&
                routes.map((route, index) => {
                  const onDeleteObjectHandler = () => {
                    onDeleteObject(route.id)
                  }
                  const onChangeObjectHandler = () => {
                    onChangeObject(route.id)
                  }
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell size='small' align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{route.name}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{route.id}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{route.published ? 'Да' : 'Нет'}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div className={styles.functionalBtnBlock}>
                          <img
                            className={styles.functionalBtn}
                            src={changeObjIcon}
                            alt='changeObjIcon'
                            onClick={onChangeObjectHandler}
                          />
                          <img
                            className={styles.functionalBtn}
                            src={deleteObjIcon}
                            alt='deleteObjIcon'
                            onClick={onDeleteObjectHandler}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default TableComponentWithoutPagination