'use client'

import {useState} from 'react'
import {Dialog, DialogPanel, Listbox} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {useAuth} from '@/contexts'

const navigation = [
  {name: 'Home', href: '/'},
  {name: 'About Us', href: '/about-us'},
  {name: '영어모임 둘러보기', href: '/circle'}
]

const userOptions = [
  {name: '내가 찜한 모임', value: 'favoriteGroups'},
  {name: '내가 만든 모임', value: 'myGroups'},
  {name: '나의 페이지', value: 'mypage'},
  {name: '로그아웃', value: 'logout'}
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const path = usePathname()
  const router = useRouter()
  const {signInResponse, logout} = useAuth()

  const handleSelectChange = (option: any) => {
    setSelectedOption(option)
    if (option.value === 'logout') {
      logout(() => {
        router.push('/')
      })
    } else if (option.value) {
      router.push(`/${option.value}`)
    }
  }

  return (
    <header className="bg-white/30 border-b border-gray-200 z-10">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center">
            <span className="sr-only">English Together</span>
            <svg
              className="w-8 h-8 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v18l15-9L5 3z"></path>
            </svg>
            <span className="text-2xl font-semibold text-gray-900 ml-3">
              English Together
            </span>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold py-2 ${
                item.name === '영어모임 둘러보기'
                  ? 'text-white bg-cyan-600 px-4 rounded-lg font-bold hover:text-gray-900'
                  : 'text-gray-900 hover:text-cyan-600'
              }`}
              aria-current={path === item.href ? 'page' : undefined}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex lg:flex-1 lg:justify-end lg:items-center">
          {signInResponse ? (
            <Listbox value={selectedOption} onChange={handleSelectChange}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm">
                  <span className="flex items-center">
                    <img
                      src={
                        signInResponse.memberDto.profile ||
                        'https://via.placeholder.com/50'
                      }
                      alt="Profile"
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block truncate">
                      {signInResponse.memberDto.nickname}님 반갑습니다
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {userOptions.map((option, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({active}) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-cyan-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={option}>
                      {({selected, active}) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-semibold' : 'font-normal'
                            }`}>
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? 'text-white' : 'text-cyan-600'
                              }`}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2">
              시작하기
            </button>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden">
        <DialogPanel className="fixed inset-0 z-50 bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <span className="sr-only">English Together</span>
              <svg
                className="w-8 h-8 text-cyan-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v18l15-9L5 3z"
                />
              </svg>
              <span className="text-2xl font-semibold text-gray-900 ml-3">
                English Together
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700">
              <span className="sr-only">메뉴 닫기</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            {signInResponse ? (
              <>
                <span className="block text-center text-gray-900 mb-4">
                  {signInResponse.memberDto.nickname}님 환영합니다.
                </span>
                <button
                  type="button"
                  onClick={() => router.push('/logout')}
                  className="block w-full text-center bg-red-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-red-700">
                  로그아웃
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="block w-full text-center bg-cyan-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-cyan-700">
                시작하기
              </button>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
