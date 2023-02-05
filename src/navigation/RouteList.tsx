import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { PATH } from './path'
import Error404 from '../pages/Error404/Error404'
import CreateNotificationPage from '../pages/CreateNotificationPage/CreateNotificationPage'
import CreateObjectPage from '../pages/CreateObjectPage/CreateObjectPage'
import CreateNewsPage from '../pages/CreateNewsPage/CreateNewsPage'
import CreateRoutePage from '../pages/CreateRoutePage/CreateRoutePage'
import UsersPage from '../pages/UsersPage/UsersPage'
import SettingsPage from '../pages/SettingsPage/SettingsPage'
import MainPage from '../pages/MainPage/MainPage'
import ObjectPage from '../pages/ObjectPage/ObjectPage'
import NewsPage from '../pages/NewsPage/NewsPage'
import RoutePage from '../pages/RoutePage/RoutePage'
import AuthPage from '../pages/AuthPage/AuthPage'
import CreateUsersPage from '../pages/CreateUsersPage/CreateUsersPage'
import NotificationPage from '../pages/NotificationPage/NotificationPage'
import EditNewsPage from '../pages/EditNewsPage/EditNewsPage'
import EditObjectPage from '../pages/EditObjectPage/EditObjectPage'
import EditRoutePage from '../pages/EditRoutePage/EditRoutePage'

const RouteList = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage />} />
      <Route path='/adygeya-admin' element={<Navigate to={'/'} />} />
      <Route path={PATH.objectCardPage} element={<ObjectPage />} />
      <Route path={PATH.newsCardPage} element={<NewsPage />} />
      <Route path={PATH.routeCardPage} element={<RoutePage />} />
      <Route path={PATH.notificationsPage} element={<NotificationPage />} />
      <Route path={PATH.createObjectCardPage} element={<CreateObjectPage />} />
      <Route path={PATH.createNewsCardPage} element={<CreateNewsPage />} />
      <Route path={PATH.createRouteCardPage} element={<CreateRoutePage />} />
      <Route path={PATH.createUsersPage} element={<CreateUsersPage />} />
      <Route path={PATH.editNewsCardPage} element={<EditNewsPage />} />
      <Route path={PATH.editObjectCardPage} element={<EditObjectPage />} />
      <Route path={PATH.editRoutePage} element={<EditRoutePage />} />
      <Route path={PATH.usersPage} element={<UsersPage />} />
      <Route path={PATH.createNotificationsPage} element={<CreateNotificationPage />} />
      <Route path={PATH.settingsPage} element={<SettingsPage />} />
      <Route path={PATH.auth} element={<AuthPage />} />
      <Route path={PATH.error404} element={<Error404 />} />
      <Route path='*' element={<Navigate to={PATH.error404} />} />
    </Routes>
  )
}

export default RouteList
