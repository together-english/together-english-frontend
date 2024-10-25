'use client'
import type {ChangeEvent} from 'react'
import {useState, useCallback, useEffect} from 'react'
import Link from 'next/link'
import '../../../styles/globals.css'
import {useAuth} from '@/contexts'
import {useRouter} from 'next/navigation'
import * as U from '@/utils'
import {TSignUpData} from '@/types/auth'

type LoginFormType = Record<'email' | 'password', string>
const initialFormState = {email: '', password: ''}

export default function Login() {
  const [{email, password}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )
  const router = useRouter()
  const {login, logout} = useAuth()
  const loginAccount = useCallback(() => {
    login(email, password, () => router.push('/'))
  }, [email, password, login, router])

  useEffect(() => {
    U.readObjectP<TSignUpData>('signInResponse')
      .then(signInResponse => {
        if (signInResponse)
          setForm({email: signInResponse.email, password: signInResponse.password})
      })
      .catch(e => {
        console.log(e)
      })
    logout()
  }, [])
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a
          href="/"
          className="flex justify-center items-center mx-auto mb-16 h-6 w-auto text-slate-900 mt-10">
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
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900">
              이메일
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={changed('email')}
                autoComplete="email"
                required
                className="ring-2 mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900">
                비밀번호
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="pl-2 font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={changed('password')}
                value={password}
                autoComplete="current-password"
                required
                className="mt-2 ring-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-slate-300"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={loginAccount}
              className="block w-full text-center bg-cyan-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-cyan-700">
              로그인
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          처음이신가요?
          <Link
            href="/register"
            className="pl-2 font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
