import React, { useState } from 'react';
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
import publishIcon from '../../assets/icons/publish.svg'
import unpublishIcon from '../../assets/icons/unpublish.svg'
import { visuallyHidden } from '@mui/utils'
import {
  NewsResponseDataType,
  ObjectResponseDataType,
  RoutesResponseDataType,
  UsersResponseDataType,
} from '../../redux/types/types'
import styles from './TableComponent.module.css'
import { useAppSelector } from '../../redux/utils/redux-utils'

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
  users?: UsersResponseDataType[]
  itemCount: number
  currentPage: number
  currentSize: number
  headCells: string[]
  onDeleteObject: (objectId: number) => void
  onChangeObject: (objectId: number) => void
  onPublish?: (objectId: number) => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TableComponent: React.FC<TableComponentPropsType> = ({
  objects,
  news,
  routes,
  users,
  itemCount,
  currentPage,
  currentSize,
  headCells,
  onDeleteObject,
  onChangeObject,
  onPublish,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const { userRoles } = useAppSelector((state) => state.auth)
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('Name');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: 32 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 600 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              isNews
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
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
                  const onPublishHandler = () => {
                    onPublish && onPublish(object.id)
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
                          {(userRoles.includes('admin') || userRoles.includes('publish')) && (
                            <div>
                              {object.published ? (
                                <img
                                  className={styles.functionalBtn}
                                  src={publishIcon}
                                  alt='publishIcon'
                                  onClick={onPublishHandler}
                                />
                              ) : (
                                <img
                                  className={styles.functionalBtn}
                                  src={unpublishIcon}
                                  alt='unpublishIcon'
                                  onClick={onPublishHandler}
                                />
                              )}
                            </div>
                          )}
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
                  const onPublishHandler = () => {
                    onPublish && onPublish(n.id)
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
                          {(userRoles.includes('admin') || userRoles.includes('publish')) && (
                            <div>
                              {n.published ? (
                                <img
                                  className={styles.functionalBtn}
                                  src={publishIcon}
                                  alt='publishIcon'
                                  onClick={onPublishHandler}
                                />
                              ) : (
                                <img
                                  className={styles.functionalBtn}
                                  src={unpublishIcon}
                                  alt='unpublishIcon'
                                  onClick={onPublishHandler}
                                />
                              )}
                            </div>
                          )}
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

                  const onPublishHandler = () => {
                    onPublish && onPublish(route.id)
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
                          {(userRoles.includes('admin') || userRoles.includes('publish')) && (
                            <div>
                              {route.published ? (
                                <img
                                  className={styles.functionalBtn}
                                  src={publishIcon}
                                  alt='publishIcon'
                                  onClick={onPublishHandler}
                                />
                              ) : (
                                <img
                                  className={styles.functionalBtn}
                                  src={unpublishIcon}
                                  alt='unpublishIcon'
                                  onClick={onPublishHandler}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {users &&
                users.map((user, index) => {
                  const onDeleteObjectHandler = () => {
                    onDeleteObject(user.id)
                  }

                  const onChangeUserHandler = () => {
                    onChangeObject(user.id)
                  }
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell size='small' align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{user.login}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        <div>{user.id}</div>
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        {user.roles.map((u, index) => {
                          return <div key={index}>{u}</div>
                        })}
                      </TableCell>
                      <TableCell align='left' sx={{ overflowWrap: 'anywhere' }}>
                        {!user.roles.includes('admin') && (
                          <div className={styles.functionalBtnBlock}>
                            <img
                              className={styles.functionalBtn}
                              src={changeObjIcon}
                              alt='changeObjIcon'
                              onClick={onChangeUserHandler}
                            />
                            <img
                              className={styles.functionalBtn}
                              src={deleteObjIcon}
                              alt='deleteObjIcon'
                              onClick={onDeleteObjectHandler}
                            />
                          </div>
                        )}
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

export default TableComponent;
