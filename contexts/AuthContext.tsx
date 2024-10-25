'use client'
import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback, useEffect} from 'react'
import * as U from '../utils'
import {post} from '../server'
import {TJwtToken, TSignInResponse, TSignUpData} from '@/types/auth'
import {useRouter} from 'next/navigation'
import {StatusEnum} from '@/types/status'

export type LoggedUser = {email: string; password: string}
type Callback = () => void

type ContextType = {
  signInResponse?: TSignInResponse
  signup: (signUpData: TSignUpData, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
  updateProfileImage: (newProfileImageUrl: string) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (signUpData: TSignUpData, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {},
  updateProfileImage: (newProfileImageUrl: string) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [signInResponse, setSignInResponse] = useState<TSignInResponse | undefined>(
    undefined
  )
  const router = useRouter()

  const signup = useCallback((signUpData: TSignUpData, callback?: Callback) => {
    post('/auth/signup', signUpData)
      .then(res => res.json())
      .then((result: {status: string; data?: string; message: string}) => {
        const {status, data, message} = result
        if (result.status === StatusEnum.SUCCESS) {
          router.push('/congratulation')
          callback && callback()
        } else {
          alert(message)
        }
        U.removeItemFromStorageP('signInResponse')
        setSignInResponse(undefined)
      })
  }, [])
  const login = useCallback((email: string, password: string, callback?: Callback) => {
    const user = {email, password}
    post('/auth/login', user)
      .then(res => res.json())
      .then((result: {status: string; data?: TSignInResponse; message: string}) => {
        if (result.status === StatusEnum.SUCCESS && result.data) {
          U.writeObjectP('signInResponse', result.data)
          setSignInResponse(result.data)
          callback && callback()
        } else {
          alert(result.message)
        }
      })
  }, [])
  const logout = useCallback((callback?: Callback) => {
    U.removeItemFromStorageP('signInResponse')
    setSignInResponse(undefined)
    callback && callback()
  }, [])

  const updateProfileImage = useCallback(
    (newProfileImageUrl: string) => {
      if (signInResponse) {
        const updatedSignInResponse = {
          ...signInResponse,
          memberDto: {
            ...signInResponse.memberDto,
            profile: newProfileImageUrl // 프로필 이미지 URL 업데이트
          }
        }

        setSignInResponse(updatedSignInResponse)
        U.writeObjectP('signInResponse', updatedSignInResponse)
      }
    },
    [signInResponse]
  )

  useEffect(() => {
    U.readObjectP<TSignInResponse>('signInResponse').then(signInResponse => {
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
    logout,
    updateProfileImage
  }
  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
