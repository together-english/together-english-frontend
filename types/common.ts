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

type PaginatedData<T> = {
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

type ApiResponse<T> = {
  status: string
  message: string
  data: T
}
