'use client'
import {useAuth} from '@/contexts'
import {useState, useCallback, useEffect, useRef} from 'react'
import {useRouter} from 'next/navigation'
import '../../../styles/globals.css'

type UserProfileType = {
  name: string
  nickname: string
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
  profileImage?: string // 프로필 이미지 필드 추가
  isMarketingAgreed: boolean // 마케팅 수신 동의 상태 추가
}

export default function MyPage() {
  const {signInResponse} = useAuth()
  const router = useRouter()

  const [profile, setProfile] = useState<UserProfileType>({
    name: signInResponse?.memberDto?.name || '',
    nickname: signInResponse?.memberDto?.nickname || '',
    email: signInResponse?.memberDto?.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    profileImage: signInResponse?.memberDto?.profile || '', // 프로필 이미지 초기화
    isMarketingAgreed: false // 마케팅 수신 동의 초기화
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // 파일 입력 요소의 ref 설정
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!profile) {
      setProfile({
        name: '',
        nickname: '',
        email: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        profileImage: '', // 빈 문자열로 초기화
        isMarketingAgreed: false // 기본값 false
      })
    }
  }, [])

  const changed = useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile(prevProfile => ({...prevProfile, [key]: e.target.value || ''}))
    },
    []
  )

  // 파일 선택 후 이미지 미리보기 및 프로필 이미지 업데이트
  const handleProfileImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreviewImage(reader.result as string) // 미리보기 이미지 설정
        }
        reader.readAsDataURL(file)

        setProfile(prevProfile => ({
          ...prevProfile,
          profileImage: file.name // 파일명을 저장, 서버에 전송할 수 있습니다
        }))
      }
    },
    []
  )

  // 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  // 마케팅 수신 동의 변경 처리
  const handleMarketingAgreedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile(prevProfile => ({
        ...prevProfile,
        isMarketingAgreed: e.target.checked
      }))
    },
    []
  )

  const handleUpdateProfile = useCallback(() => {
    const {name, nickname, password, newPassword, confirmNewPassword, isMarketingAgreed} =
      profile

    if (!name || !nickname) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    // 여기에 프로필 이미지와 함께 서버로 업데이트 요청을 보내는 로직 추가
    // 예시: updateUserProfile(profile)

    alert(`프로필이 성공적으로 업데이트되었습니다. 마케팅 동의: ${isMarketingAgreed}`)
  }, [profile])

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          마이 페이지
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-semibold leading-6 text-gray-900">
              프로필 사진
            </label>
            <div className="mt-2 flex justify-center">
              <div className="mt-2 flex justify-center">
                <img
                  src={
                    previewImage || profile.profileImage || '/images/defaultProfile.png'
                  }
                  alt="프로필 미리보기"
                  onClick={handleImageClick} // 이미지 클릭 시 파일 선택 창 열기
                  className="w-48 h-48 rounded-full border-2 border-cyan-600 cursor-pointer"
                />
              </div>
            </div>
            {/* 숨겨진 파일 입력 필드 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // ref를 이용해 파일 입력 요소 제어
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900">
              이름
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                value={profile.name || ''} // 빈 문자열 기본값
                onChange={changed('name')}
                required
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-semibold leading-6 text-gray-900">
              닉네임
            </label>
            <div className="mt-1">
              <input
                id="nickname"
                type="text"
                value={profile.nickname || ''} // 빈 문자열 기본값
                onChange={changed('nickname')}
                required
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900">
              이메일 (수정 불가)
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                value={profile.email || ''} // 빈 문자열 기본값
                disabled
                className="mt-1 appearance-none text-slate-900 bg-gray-100 rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900">
              현재 비밀번호
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                value={profile.password || ''} // 빈 문자열 기본값
                onChange={changed('password')}
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold leading-6 text-gray-900">
              새 비밀번호
            </label>
            <div className="mt-1">
              <input
                id="newPassword"
                type="password"
                value={profile.newPassword || ''} // 빈 문자열 기본값
                onChange={changed('newPassword')}
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-semibold leading-6 text-gray-900">
              새 비밀번호 확인
            </label>
            <div className="mt-1">
              <input
                id="confirmNewPassword"
                type="password"
                value={profile.confirmNewPassword || ''} // 빈 문자열 기본값
                onChange={changed('confirmNewPassword')}
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="marketingAgreed"
              type="checkbox"
              checked={profile.isMarketingAgreed}
              onChange={handleMarketingAgreedChange}
              className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
            />
            <label
              htmlFor="marketingAgreed"
              className="ml-2 block text-sm leading-6 text-gray-900">
              마케팅 수신 동의
            </label>
          </div>

          <div>
            <button
              type="button"
              className="block w-full text-center bg-cyan-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-cyan-700"
              onClick={handleUpdateProfile}>
              프로필 업데이트
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
