type Notification = {
  id: string
  message: string
  viewed: boolean
  createdAt: string
}

type NotificationPageResponse = {
  notifications: Notification[]
  lastCreatedAt: string | null
  hasNext: boolean
}

type MainResponse<T> = {
  data: T
  message: string
  status: number
}

export type {Notification, NotificationPageResponse, MainResponse}
