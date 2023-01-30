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
