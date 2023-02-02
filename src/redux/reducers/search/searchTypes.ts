export type newsSearch = {
  id: number
  title: string
  date: string
  icon: string
  published: boolean
}

export type landmarksSearch = {
  id: number
  name: string
  icon: string
  published: boolean
  categories: CategorySearchType[]
}

export type CategorySearchType = {
  id: number
  name: string
}

export type routesSearch = {
  id: number
  name: string
  published: boolean
}
