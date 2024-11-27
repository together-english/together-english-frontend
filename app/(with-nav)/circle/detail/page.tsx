'use client'
import {NextPage} from 'next'
import Image from 'next/image'
import {useState, useEffect} from 'react'

interface Circle {
  id: number
  name: string
  english_level: string
  city: string
  thumbnail: string
  introduction: string
  capacity: number
  total_views: number
  leader_nickname: string
  leader_profile: string
  address: string
  contact_way: string
  attend_mode: string
  online_url?: string
}

const CircleDetailPage: NextPage = () => {
  const [circle, setCircle] = useState<Circle | null>(null)

  useEffect(() => {
    // 서클의 상세 데이터를 불러오는 로직 (API 대체용 테스트 데이터)
    const fetchCircle = async () => {
      const testCircle: Circle = {
        id: 1,
        name: '고급 영어 학습 그룹',
        english_level: '고급',
        city: '서울',
        thumbnail: 'https://picsum.photos/seed/picsum/900/300',
        introduction: '고급 학습자를 위한 영어 플루언시 향상 그룹입니다.',
        capacity: 20,
        total_views: 1500,
        leader_nickname: 'Leader1',
        leader_profile: 'https://picsum.photos/id/237/200/300',
        address: '서울특별시 강남구 강남대로',
        contact_way: '카카오톡 오픈 채팅',
        attend_mode: '오프라인',
        online_url: ''
      }
      setCircle(testCircle)
    }

    fetchCircle()
  }, [])

  if (!circle) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* 서클 카드 */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Image
            className="w-full h-64 object-cover"
            src={circle.thumbnail}
            alt={circle.name}
          />
          <div className="p-6">
            {/* 서클 제목 및 리더 */}
            <div className="flex items-center">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                src={circle.leader_profile}
                alt={circle.leader_nickname}
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{circle.name}</h2>
                <p className="text-gray-600">리더: {circle.leader_nickname}</p>
              </div>
            </div>

            {/* 서클 소개 */}
            <p className="text-gray-700 mt-4">{circle.introduction}</p>

            {/* 서클 정보 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">도시</h4>
                <p className="text-gray-600">{circle.city}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">영어 레벨</h4>
                <p className="text-gray-600">{circle.english_level}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">정원</h4>
                <p className="text-gray-600">{circle.capacity}명</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">참여 방식</h4>
                <p className="text-gray-600">{circle.attend_mode}</p>
              </div>
              {circle.attend_mode === '온라인' && circle.online_url && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">온라인 URL</h4>
                  <p className="text-blue-500">
                    <a href={circle.online_url} target="_blank" rel="noopener noreferrer">
                      온라인 스터디 참여하기
                    </a>
                  </p>
                </div>
              )}
              <div>
                <h4 className="text-lg font-semibold text-gray-700">주소</h4>
                <p className="text-gray-600">{circle.address}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">연락 방법</h4>
                <p className="text-gray-600">{circle.contact_way}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">조회수</h4>
                <p className="text-gray-600">{circle.total_views}회</p>
              </div>
            </div>

            {/* 가입 버튼 */}
            <div className="mt-6">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                서클 가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleDetailPage
