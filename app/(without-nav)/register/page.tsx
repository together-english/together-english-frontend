'use client'
import EmailInput from '@/components/input/emailInput'
import {useAuth} from '@/contexts'
import Link from 'next/link'
import {ChangeEvent, useCallback, useState} from 'react'
import '../../../styles/globals.css'
import InputField from '@/components/input/InputField'

type SignUpFormType = {
  name: string
  nickname: string
  email: string
  password: string
  confirmPassword: string
  isTermsAgreed: boolean
  isPrivacyAgreed: boolean
  isMarketingAgreed: boolean
}

export default function Register() {
  const {signup} = useAuth()
  const [
    {
      name,
      nickname,
      email,
      password,
      confirmPassword,
      isTermsAgreed,
      isPrivacyAgreed,
      isMarketingAgreed
    },
    setForm
  ] = useState<SignUpFormType>({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isTermsAgreed: false,
    isPrivacyAgreed: false,
    isMarketingAgreed: false
  })
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  const handleEmailChange = (newEmail: string, isValid: boolean) => {
    setForm(prevForm => ({
      ...prevForm,
      email: newEmail
    }))
    setIsEmailValid(isValid)
    console.log('Email changed to:', newEmail, 'Is valid:', isValid)
  }
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const handleAgreementChange =
    (key: keyof SignUpFormType) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(prevForm => ({
        ...prevForm,
        [key]: e.target.checked
      }))
    }

  const createAcount = useCallback(() => {
    console.log(name, email, password, confirmPassword, isTermsAgreed, isPrivacyAgreed)
    if (name == '') {
      alert('이름을 입력해주세요')
      return
    }
    if (nickname == '') {
      alert('닉네임을 입력해주세요')
      return
    }
    if (email == '') {
      alert('이메일을 입력해주세요')
      return
    }
    if (!isEmailValid) {
      alert('이메일 형식이 잘못 되었습니다.')
      return
    }
    if (password !== confirmPassword) {
      alert('비밀번호와 확인비밀번호가 틀립니다.')
      return
    }
    if (!isTermsAgreed || !isPrivacyAgreed) {
      alert('필수 동의 항목을 모두 체크해주세요.')
      return
    }
    signup(
      {
        name: name,
        nickname: nickname,
        email: email,
        password: password,
        isTermsAgreed: isTermsAgreed,
        isPrivacyAgreed: isPrivacyAgreed,
        isMarketingAgreed: isMarketingAgreed
      },
      undefined
    )
  }, [
    name,
    email,
    password,
    isEmailValid,
    nickname,
    confirmPassword,
    isTermsAgreed,
    isPrivacyAgreed,
    isMarketingAgreed,
    signup
  ])
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a
          href="/"
          className="flex justify-center items-center mx-auto mb-2 h-6 w-auto text-slate-900">
          <span className="sr-only">English Together</span>
          <svg
            className="w-8 h-8 text-cyan-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v18l15-9L5 3z"></path>
          </svg>
          <span className="text-2xl font-semibold text-gray-900 ml-3">
            English Together
          </span>
        </a>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <InputField
            id="name"
            label="이름"
            type="text"
            value={name}
            onChange={changed('name')}
          />
          <InputField
            id="nickname"
            label="닉네임"
            type="text"
            value={nickname}
            onChange={changed('nickname')}
          />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900">
              이메일
            </label>
            <div className="mt-1">
              <EmailInput onEmailChange={handleEmailChange} />
            </div>
          </div>
          <InputField
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={changed('password')}
            required
          />
          <InputField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={changed('confirmPassword')}
            required
          />
          <div className="mt-4">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              <input
                type="checkbox"
                checked={isTermsAgreed}
                onChange={handleAgreementChange('isTermsAgreed')}
                className="mr-2"
              />
              [필수] 이용약관에 동의합니다.
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              <input
                type="checkbox"
                checked={isPrivacyAgreed}
                onChange={handleAgreementChange('isPrivacyAgreed')}
                className="mr-2"
              />
              [필수] 개인정보 처리방침에 동의합니다.
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              <input
                type="checkbox"
                checked={isMarketingAgreed}
                onChange={handleAgreementChange('isMarketingAgreed')}
                className="mr-2"
              />
              [선택] 마케팅 정보 수신에 동의합니다.
            </label>
          </div>

          <div>
            <button
              type="button"
              className="block w-full text-center bg-cyan-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-cyan-700"
              onClick={createAcount}>
              회원가입
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?
          <Link
            href="/login"
            className="pl-2 font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  )
}
