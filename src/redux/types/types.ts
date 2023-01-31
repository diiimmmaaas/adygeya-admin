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
