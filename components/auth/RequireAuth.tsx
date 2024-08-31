import type {FC, PropsWithChildren} from 'react'
import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/contexts'

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const {signInResponse} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!signInResponse) router.back()
  }, [signInResponse, router])

  return <>{children}</>
}
export default RequireAuth
