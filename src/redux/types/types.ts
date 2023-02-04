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
  location: LocationType
  images: ImagesType[]
  stories: StoriesNewsType
}

export type LocationType = {
  longitude: number
  latitude: number
  address: string
}

export type ImagesType = {
  id: number
  link: string
}

export type StoriesNewsType = {
  title: string
  content: string
  images: ImagesType[]
}

export type GetCurrentObjectType = {
  id: number
  name: string
  icon: string
  published: boolean
  publishAt: string
  audio: AudioType
  images: ImagesType[]
  description: string
  location: LocationType
  schedule: ScheduleType[]
  contacts: ContactType[]
  categories: CategoryType[]
  filters: FilterType[]
}

export type AudioType = {
  audio: string
  length: number
  voiced: string
  voicedLink: string
}

export type ScheduleType = {
  weekday: number
  open: string
  close: string
}

export type ContactType = {
  name: string
  contact: string
}

export type FilterType = {
  id: number
  value: string
}

export type GetCurrentRouteType = {
  id: number
  name: string
  published: boolean
  publishAt: string
  images: ImagesType[]
  waypoints: GetWaypointType[]
  description: string
}

export type GetWaypointType = {
  id: number
  link: string
}

export type AudioArrayType = {
  id: number
  audio: string
  length: number
  voiced: string
  voicedLink: string
}
