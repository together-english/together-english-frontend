'use client'
import {NextPage} from 'next'
import {useState, useEffect, useCallback} from 'react'
import CircleModal from '@/components/modal/CircleModal'
import Circle from '@/components/Circle'
import {TCircle, TCirclePageRequest} from '@/types/circle'
import {TApiResponse, TPaginatedData} from '@/types/common'
import Pagination from '@/components/Pagination'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/contexts'
import LoginModal from '@/components/modal/LoginModal'
import {post} from '@/server'
import {City, StatusEnum} from '@/types/status'
import * as U from '@/utils'
import {TSignInResponse} from '@/types/auth'

const CircleListPage: NextPage = () => {
  const router = useRouter()
  const {signInResponse} = useAuth()
  const [circles, setCircles] = useState<TCircle[]>([])
  const [circlePageRequest, setCirclePageRequest] = useState<TCirclePageRequest>({
    memberId: null,
    title: null,
    city: null,
    level: null,
    likeByMeOnly: false,
    writeByMeOnly: false
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [totalPages, setTotalPages] = useState<number>(1)

  const getCityValue = (key: string): string | undefined => {
    return City[key as keyof typeof City]
  }

  const fetchCircles = useCallback(
    async (page: number, newRequest: TCirclePageRequest) => {
      setCurrentPage(page)
      setCirclePageRequest(newRequest)
      const signInResponse = await U.readObjectP<TSignInResponse>('signInResponse')
      if (signInResponse) {
        setCirclePageRequest(prevState => ({
          ...prevState,
          memberId: signInResponse.memberDto.id
        }))
        newRequest.memberId = signInResponse.memberDto.id
      }

      post(`/circle/list?page=${page - 1}`, newRequest)
        .then(res => res.json())
        .then((result: TApiResponse<TPaginatedData<TCircle>>) => {
          if (result.status === StatusEnum.SUCCESS && result.data) {
            if (result.data.content) {
              const updatedContent = result.data.content.map(item => {
                const cityValue = City[item.city as keyof typeof City] || 'etc'
                return {
                  ...item,
                  city: cityValue
                }
              })
              setCircles(updatedContent)
              setTotalPages(result.data.totalPages)
            }
          } else {
            // todo: 에러 처리
          }
        })
    },
    [currentPage, circlePageRequest]
  )

  const handlePageChange = (page: number) => {
    fetchCircles(page, circlePageRequest)
  }

  useEffect(() => {
    fetchCircles(1, circlePageRequest)
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">영어모임 목록</h1>

      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
          필터 적용
        </button>
        <button
          onClick={() => {
            if (signInResponse) {
              router.push('/circle/manage')
            } else {
              setShowLoginModal(true)
            }
          }}
          className="ml-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-300">
          영어모임 생성하기
        </button>
      </div>

      <CircleModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        request={circlePageRequest}
        onApplyFilter={fetchCircles}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {circles.map(circle => (
          <Circle
            key={circle.id}
            id={circle.id}
            name={circle.name}
            englishLevel={circle.englishLevel}
            city={circle.city}
            thumbnailUrl={circle.thumbnailUrl}
            title={circle.title}
            capacity={circle.capacity}
            totalView={circle.totalView || 0}
            leaderName={circle.leaderName}
            leaderProfile={circle.leaderProfile || '/images/defaultProfile.png'}
            likedByMe={circle.likedByMe}
            totalLike={circle.totalLike || 0}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage} // 현재 페이지
        totalPages={totalPages} // 전체 페이지 수
        onPageChange={page => handlePageChange(page)} // 페이지 변경 핸들러
      />
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

export default CircleListPage
