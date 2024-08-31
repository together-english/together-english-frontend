'use client'
import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback, useEffect} from 'react'
import * as U from '../utils'
import {post} from '../server'
import {JwtTokenType, SignInResponseType, SignUpDataType} from '@/types/auth'
import {useRouter} from 'next/navigation'
import {StatusEnum} from '@/types/status'

export type LoggedUser = {email: string; password: string}
type Callback = () => void

type ContextType = {
  signInResponse?: SignInResponseType
  signup: (signUpData: SignUpDataType, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (signUpData: SignUpDataType, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [signInResponse, setSignInResponse] = useState<SignInResponseType | undefined>(
    undefined
  )
  const router = useRouter()

  const signup = useCallback((signUpData: SignUpDataType, callback?: Callback) => {
    post('/auth/signup', signUpData)
      .then(res => res.json())
      .then((result: {status: string; data?: string; message: string}) => {
        const {status, data, message} = result
        if (result.status === StatusEnum.SUCCESS) {
          router.push('/')
        } else {
          alert(message)
        }
      })
    callback && callback()
  }, [])
  const login = useCallback((email: string, password: string, callback?: Callback) => {
    const user = {email, password}
    post('/auth/login', user)
      .then(res => res.json())
      .then((result: {status: string; data?: SignInResponseType; message: string}) => {
        if (result.status === StatusEnum.SUCCESS && result.data) {
          U.writeObjectP('signInResponse', result.data)
          setSignInResponse(result.data)
        } else {
          alert(result.message)
        }
      })
    callback && callback()
  }, [])
  const logout = useCallback((callback?: Callback) => {
    U.removeItemFromStorageP('signInResponse')
    setSignInResponse(undefined)
    callback && callback()
  }, [])

  useEffect(() => {
    U.readObjectP<SignInResponseType>('signInResponse').then(signInResponse => {
      if (signInResponse) {
        setSignInResponse(signInResponse)
      } else {
        setSignInResponse(undefined)
      }
    })
  }, [])

  const value = {
    signInResponse,
    signup,
    login,
    logout
  }
  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
