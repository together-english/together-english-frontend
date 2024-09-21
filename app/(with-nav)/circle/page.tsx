'use client'
import {NextPage} from 'next'
import {useState, useEffect} from 'react'
import CircleModal from '@/components/modal/CircleModal'
import Circle from '@/components/Circle'
import {CircleInterface} from '@/types/circleInterface'
import Pagination from '@/components/Pagination'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/contexts'
import LoginModal from '@/components/modal/LoginModal'

const CircleListPage: NextPage = () => {
  const router = useRouter()
  const {signInResponse} = useAuth()
  const [circles, setCircles] = useState<CircleInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const totalPages = 20

  useEffect(() => {
    // 테스트 데이터를 로컬에서 설정
    const testCircles: CircleInterface[] = [
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        englishLevel: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        totalViews: 1500,
        leaderNickname: 'Leader1',
        leaderProfile: 'https://via.placeholder.com/100',
        isLike: false,
        likeCount: 33
      }
    ]

    setCircles(testCircles)
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
            thumbnail={circle.thumbnail}
            introduction={circle.introduction}
            capacity={circle.capacity}
            totalViews={circle.totalViews}
            leaderNickname={circle.leaderNickname}
            leaderProfile={circle.leaderProfile}
            isLike={circle.isLike}
            likeCount={circle.likeCount}
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
