type TComment = {
  id: string
  content: string
  updatedAt: string
  circleId: string
  nickname: string
  profile: string
}

type TPageable = {
  offset: number
  sort: Array<{
    direction: string
    nullHandling: string
    ascending: boolean
    property: string
    ignoreCase: boolean
  }>
  unpaged: boolean
  pageNumber: number
  paged: boolean
  pageSize: number
}

type TCommentPage = {
  totalElements: number
  totalPages: number
  size: number
  content: TComment[]
  number: number
  sort: Array<{
    direction: string
    nullHandling: string
    ascending: boolean
    property: string
    ignoreCase: boolean
  }>
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: TPageable
  empty: boolean
}

export type {TCommentPage, TComment}
