type TSignUpData = {
  name: string
  email: string
  password: string
  nickname?: string
  phone?: string
  profile?: string
  isTermsAgreed: boolean
  isPrivacyAgreed: boolean
  isMarketingAgreed: boolean
}

type TJwtToken = {
  accessToken: string
  refreshToken: string
}

type TMemberDto = {
  id: number
  name: string
  email: string
  nickname: string
  profile: string
}

type TSignInResponse = {
  memberDto: TMemberDto
  jwtToken: TJwtToken
}

export type {TJwtToken, TSignInResponse, TSignUpData}
