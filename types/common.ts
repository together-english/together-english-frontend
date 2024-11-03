type Sort = {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

type Pageable = {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}

type TPaginatedData<T> = {
  totalPages: number
  totalElements: number
  size: number
  content: T[]
  number: number
  sort: Sort
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: Pageable
  empty: boolean
}

type TApiResponse<T> = {
  status: string
  message: string
  data: T
}

export type {TPaginatedData, TApiResponse}
