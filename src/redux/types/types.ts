export type ObjectResponseType = {
  data: ObjectResponseDataType[]
  meta: ObjectResponseMetaType
}

export type ObjectResponseDataType = {
  id: number
  name: string
  icon: string
  published: boolean
  categories: CategoryType[]
}

export type CategoryType = {
  id: number
  name: string
}

export type ObjectResponseMetaType = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  itemCount: number
  page: number
  pageCount: number
  take: number
}

export type NewsResponseType = {
  data: NewsResponseDataType[]
  meta: ObjectResponseMetaType
}

export type NewsResponseDataType = {
  id: number
  title: string
  icon: string
  published: boolean
  date: string
}

export type RoutesResponseType = {
  data: RoutesResponseDataType[]
  meta: ObjectResponseMetaType
}

export type RoutesResponseDataType = {
  id: number
  name: string
  published: boolean
}

export type UsersResponseType = {
  data: UsersResponseDataType[]
  meta: ObjectResponseMetaType
}

export type UsersResponseDataType = {
  id: number
  login: string
  roles: string[]
}

export type GetCurrentNewsType = {
  id: number
  title: string
  description: string
  date: string
  publishAt: string
  published: boolean
  icon: string
  location: LocationNewsType
  images: string[]
  stories: StoriesNewsType
}

export type LocationNewsType = {
  longitude: number
  latitude: number
  address: string
}

export type StoriesNewsType = {
  title: string
  content: string
  images: string[]
}
