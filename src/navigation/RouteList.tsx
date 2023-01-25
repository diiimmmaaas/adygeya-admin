import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { PATH } from './path'
import Error404 from '../pages/Error404/Error404'
import NotificationPage from '../pages/MainPage/NotificationPage'
import CreateObjectPage from '../pages/CreateObjectPage/CreateObjectPage'
import CreateNewsPage from '../pages/CreateNewsPage/CreateNewsPage'
import CreateRoutePage from '../pages/CreateRoutePage/CreateRoutePage'
import UsersPage from '../pages/UsersPage/UsersPage'
import SettingsPage from '../pages/SettingsPage/SettingsPage'
import MainPage from '../pages/NotificationPage/MainPage'
import ObjectPage from '../pages/ObjectPage/ObjectPage'
import NewsPage from '../pages/NewsPage/NewsPage'
import RoutePage from '../pages/RoutePage/RoutePage'
import AuthPage from '../pages/AuthPage/AuthPage'

const RouteList = () => {
  return (
    <Routes>
      <Route path={PATH.adygeyaAdmin} element={<MainPage />} />
      <Route path={PATH.objectCardPage} element={<ObjectPage />} />
      <Route path={PATH.newsCardPage} element={<NewsPage />} />
      <Route path={PATH.routeCardPage} element={<RoutePage />} />
      <Route path={PATH.createObjectCardPage} element={<CreateObjectPage />} />
      <Route path={PATH.createNewsCardPage} element={<CreateNewsPage />} />
      <Route path={PATH.createRouteCardPage} element={<CreateRoutePage />} />
      <Route path={PATH.usersPage} element={<UsersPage />} />
      <Route path={PATH.notificationsPage} element={<NotificationPage />} />
      <Route path={PATH.settingsPage} element={<SettingsPage />} />
      <Route path={PATH.auth} element={<AuthPage />} />
      <Route path={PATH.error404} element={<Error404 />} />
      <Route path='*' element={<Navigate to={PATH.error404} />} />
    </Routes>
  )
}

export default RouteList
