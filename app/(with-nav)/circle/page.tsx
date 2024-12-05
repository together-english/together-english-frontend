'use client'
import {NextPage} from 'next'
import {useState, useEffect} from 'react'
import CircleModal from '@/components/modal/CircleModal'
import Circle from '@/components/Circle'
import {TCircle} from '@/types/circle'
import {TApiResponse, TPaginatedData} from '@/types/common'
import Pagination from '@/components/Pagination'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/contexts'
import LoginModal from '@/components/modal/LoginModal'
import {post} from '@/server'
import {StatusEnum} from '@/types/status'

const CircleListPage: NextPage = () => {
  const router = useRouter()
  const {signInResponse} = useAuth()
  const [circles, setCircles] = useState<TCircle[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    if (signInResponse) {
      // todo: 내가 좋아요 누른 정보도 포함한 API 호출 하도록 변경 필요
      post('/circle/list', {})
        .then(res => res.json())
        .then((result: TApiResponse<TPaginatedData<TCircle>>) => {
          if (result.status === StatusEnum.SUCCESS && result.data) {
            if (result.data.content) {
              setCircles(result.data.content)
              setTotalPages(result.data.totalPages)
            }
          } else {
            // todo: 에러 처리
          }
        })
    } else {
      post('/circle/list', {})
        .then(res => res.json())
        .then((result: TApiResponse<TPaginatedData<TCircle>>) => {
          if (result.status === StatusEnum.SUCCESS && result.data) {
            if (result.data.content) {
              setCircles(result.data.content)
              setTotalPages(result.data.totalPages)
            }
          } else {
            // todo: 에러 처리
          }
        })
    }
  }, [signInResponse])

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
              router.push('/circle/create')
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
        targetUrl="/filtered-meetings" // 필터 적용 후 라우팅할 URL
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
            introduction={circle.introduction}
            capacity={circle.capacity}
            totalView={circle.totalView || 0}
            leaderName={circle.leaderName}
            leaderProfile={circle.leaderProfile}
            likedByMe={circle.likedByMe}
            totalLike={circle.totalLike || 0}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage} // 현재 페이지
        totalPages={totalPages} // 전체 페이지 수
        onPageChange={page => setCurrentPage(page)} // 페이지 변경 핸들러
      />
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

export default CircleListPage
