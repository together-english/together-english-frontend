'use client'
import EmailInput from '@/components/input/emailInput'
import {useAuth} from '@/contexts'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {ChangeEvent, useCallback, useState} from 'react'
import '../../../styles/globals.css'

type SignUpFormType = Record<
  'name' | 'nickname' | 'email' | 'password' | 'confirmPassword',
  string
>

export default function register() {
  const {signup} = useAuth()
  const router = useRouter()
  const [{name, nickname, email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>({
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
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

  const createAcount = useCallback(() => {
    console.log(name, email, password, confirmPassword)
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
    signup(
      {
        name: name,
        nickname: nickname,
        email: email,
        password: password
      },
      undefined
    )
  }, [email, password, confirmPassword, signup])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          회원가입
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="username">
              이름
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={name}
              onChange={changed('name')}
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="username">
              닉네임
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outlnie-none focus:shadow-outline"
              id="nickname"
              type="text"
              value={nickname}
              onChange={changed('nickname')}
              placeholder="Nickname"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email">
              이메일
            </label>
            <EmailInput onEmailChange={handleEmailChange} />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={changed('password')}
              placeholder="********"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword">
              비밀번호확인
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={changed('confirmPassword')}
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={createAcount}>
              등록하기
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login">
              이미 계정이 있으신가요?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
