type TCircle = {
  id: number
  name: string
  englishLevel: string
  city: string
  thumbnailUrl: string
  title: string
  capacity: number
  totalView: number
  leaderName: string
  leaderProfile: string
  likedByMe: boolean
  totalLike: number
}

type TCircleSchedule = {
  dayOfWeek: string // 요일 (예: "MONDAY")
  startTime: string // 시작 시간 (HH:mm 형식)
  endTime: string // 종료 시간 (HH:mm 형식)
}

type TCircleDetail = {
  id: string // UUID
  title: string // 서클 제목
  leaderProfile?: string // 리더 프로필 이미지 URL
  leaderName: string // 리더 이름
  englishLevel: string // 영어 레벨 (문자열)
  city: string // 도시 (문자열)
  thumbnail?: string // 썸네일 URL
  introduction: string // 서클 소개
  address?: string // 주소
  capacity: number // 정원
  circleStatus: string // 서클 상태 (문자열)
  attendMode: string // 참여 방식 (문자열)
  contactWay: string // 연락 방법 (문자열)
  onlineUrl?: string // 온라인 URL
  totalView: number // 총 조회수
  weekView: number // 주간 조회수
  circleSchedules: TCircleSchedule[] // 일정 정보 배열
}

type TCircleCreateRequest = {
  title: string
  englishLevel: string
  city: string
  thumbnail?: string
  introduction: string
  address?: string
  capacity: number
  circleStatus: string
  attendMode: string
  contactWay: string
  onlineUrl?: string
  circleSchedules: TCircleSchedule[]
}

export type {TCircle, TCircleDetail, TCircleSchedule, TCircleCreateRequest}
