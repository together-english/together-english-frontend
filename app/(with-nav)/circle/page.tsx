'use client'
import {NextPage} from 'next'
import {useState, useEffect} from 'react'
import CircleModal from '@/components/modal/CircleModal'
import Circle from '@/components/Circle'
import {CircleInterface} from '@/types/circleInterface'

const CircleListPage: NextPage = () => {
  const [circles, setCircles] = useState<CircleInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const itemsPerPage = 12

  useEffect(() => {
    // 테스트 데이터를 로컬에서 설정
    const testCircles: CircleInterface[] = [
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      },
      {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://via.placeholder.com/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://via.placeholder.com/100'
      }
      // ... (다른 그룹들 추가)
    ]

    setCircles(testCircles)
  }, [])

  // 필터링된 서클 목록 계산
  const filteredCircles = circles.filter(circle => {
    const matchesCity = selectedCity ? circle.city === selectedCity : true
    const matchesLevel = selectedLevel ? circle.english_level === selectedLevel : true
    return matchesCity && matchesLevel
  })

  // 페이지네이션 계산
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const currentItems = filteredCircles.slice(startIdx, endIdx)
  const totalPages = Math.ceil(filteredCircles.length / itemsPerPage)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">서클 목록</h1>

      {/* 필터 버튼 */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
          필터 적용
        </button>
      </div>

      {/* 필터 모달 */}
      {/* CircleModal 컴포넌트 */}
      <CircleModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        targetUrl="/filtered-meetings" // 필터 적용 후 라우팅할 URL
      />

      {/* 서클 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map(circle => (
          <Circle
            key={circle.id}
            id={circle.id}
            name={circle.name}
            english_level={circle.english_level}
            city={circle.city}
            thumbnail={circle.thumbnail}
            introduction={circle.introduction}
            capacity={circle.capacity}
            total_views={circle.total_views}
            leader_nickname={circle.leader_nickname}
            leader_profile={circle.leader_profile}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
          이전
        </button>
        <span className="text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
          다음
        </button>
      </div>
    </div>
  )
}

export default CircleListPage
