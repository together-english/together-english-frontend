'use client'
import {Provider as ReduxProvider} from 'react-redux'
import {useStore} from '@/store'
import {AuthProvider} from '@/contexts'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const store = useStore()
  return (
    <html lang="kr">
      <AuthProvider>
        <ReduxProvider store={store}>
          <body>{children}</body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  )
}
