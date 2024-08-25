'use client'
import type {ChangeEvent} from 'react'
import {useState, useCallback, useEffect} from 'react'
import Link from 'next/link'
import '../../../styles/globals.css'
import {useAuth} from '@/contexts'
import {useRouter} from 'next/navigation'
import * as U from '@/utils'

type LoginFormType = Record<'email' | 'password', string>
const initialFormState = {email: '', password: ''}

export default function login() {
  const [{email, password}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )
  const router = useRouter()
  const {login} = useAuth()
  const loginAccount = useCallback(() => {
    login(email, password, () => router.push('/'))
  }, [email, password, login, router])

  useEffect(() => {
    U.readObjectP<LoginFormType>('user')
      .then(user => {
        if (user) setForm(user)
      })
      .catch(e => {})
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              English Together
            </h2>
          </Link>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Login
          </h2>
        </div>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              value={email}
              onChange={changed('email')}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={changed('password')}
              value={password}
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={loginAccount}
              type="button"
            >
              Sign In
            </button>
            <Link
              href="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              회원가입
            </Link>
            <Link
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
