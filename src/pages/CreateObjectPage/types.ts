export type AudioParametersType = {
  voiced: string
  voicedLink: string
}

export type FileType = {
  name: string
  type: string
  size: string
  src: string
}

type ScheduleType = {
  weekday: number
  open: string
  close: string
}

type ContactsType = {
  name: string
  contact: string
}

export type CheckedParametersType = {
  name: string
  icon: string
  description: string
  location: {
    longitude: number
    latitude: number
    address: string
  }
  schedule: ScheduleType[]
  contacts: ContactsType[]
  categories: number[]
  waypoints: number[]
  filters: number[]
  publishAt: null
}
