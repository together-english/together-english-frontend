enum Gender {
  F = 'F',
  M = 'M',
  NO = 'NO'
}

type TUserProfile = {
  name: string
  nickname: string
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
  profileImage?: string
  isMarketingAgreed: boolean
}

type TMyPageResponse = {
  id: string
  name: string
  email: string
  nickname: string
  profile?: string
  gender: Gender
  age: number
  isMarketingAgreed: boolean
}

type TMyPageRequest = {
  name: string
  nickname: string
  currentPassword: string
  newPassword: string
  isMarketingAgreed: boolean
}

export type {TUserProfile, TMyPageResponse, TMyPageRequest}
