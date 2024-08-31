type SignUpDataType = {
  name: string
  email: string
  password: string
  nickname?: string
  phone?: string
  profile?: string
}

type JwtTokenType = {
  accessToken: string
  refreshToken: string
}

type MemberDtoType = {
  id: number
  name: string
  email: string
  nickname: string
  profile: string
}

type SignInResponseType = {
  memberDto: MemberDtoType
  jwtToken: JwtTokenType
}

export type {JwtTokenType, SignInResponseType, SignUpDataType}
