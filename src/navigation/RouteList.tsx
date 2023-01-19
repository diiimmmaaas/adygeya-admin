import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { PATH } from './path'
import Error404 from '../pages/Error404/Error404'
import MainPage from '../pages/MainPage/MainPage'

const RouteList = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path={PATH.error404} element={<Error404 />} />
      <Route path='*' element={<Navigate to={PATH.error404} />} />
    </Routes>
  )
}

export default RouteList
