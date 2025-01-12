'use client'
import {NextPage} from 'next'
import Image from 'next/image'
import {useParams} from 'next/navigation'
import {useState, useEffect} from 'react'
import {get} from '@/server'
import {TCircleDetail, TCircleSchedule} from '@/types/circle'
import {TApiResponse} from '@/types/common'
import {City, StatusEnum} from '@/types/status'

const CircleDetailPage: NextPage = () => {
  const {id} = useParams()
  const [circleDetail, setCircleDetail] = useState<TCircleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getCityValue = (key: string): string | 'etc' => {
    return City[key as keyof typeof City]
  }

  useEffect(() => {
    if (!id) return
    get(`/circle/detail/${id}`)
      .then(res => res.json())
      .then((result: TApiResponse<TCircleDetail>) => {
        if (result.status === StatusEnum.SUCCESS && result.data) {
          result.data.city = getCityValue(result.data.city)
          setCircleDetail(result.data)
          setLoading(false)
        } else {
          console.error('Failed to fetch circle details:', result.message)
          setError('서클 정보를 불러오는 데 실패했습니다.')
        }
      })
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  if (!circleDetail) {
    return <div>서클 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* 서클 카드 */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Image
            className="w-full h-64 object-cover"
            src={circleDetail.thumbnail || '/images/defaultImage.png'}
            alt={circleDetail.title}
            width={900}
            height={400}
          />
          <div className="p-6">
            {/* 서클 제목 및 리더 */}
            <div className="flex items-center">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                width={64}
                height={64}
                src={circleDetail.leaderProfile || '/images/defaultProfile.png'}
                alt={circleDetail.leaderName}
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{circleDetail.title}</h2>
                <p className="text-gray-600">리더: {circleDetail.leaderName}</p>
              </div>
            </div>

            {/* 서클 소개 */}
            <p className="text-gray-700 mt-4">{circleDetail.introduction}</p>

            {/* 서클 정보 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="도시" value={circleDetail.city} />
              <InfoItem label="영어 레벨" value={circleDetail.englishLevel} />
              <InfoItem label="정원" value={`${circleDetail.capacity}명`} />
              <InfoItem label="참여 방식" value={circleDetail.attendMode} />
              {circleDetail.attendMode === 'ONLINE' && circleDetail.onlineUrl && (
                <InfoItem
                  label="온라인 URL"
                  value={
                    <a
                      href={circleDetail.onlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500">
                      온라인 스터디 참여하기
                    </a>
                  }
                />
              )}
              <InfoItem label="주소" value={circleDetail.address || '없음'} />
              <InfoItem label="연락 방법" value={circleDetail.contactWay} />
              <InfoItem label="조회수" value={`${circleDetail.totalView}회`} />
            </div>

            {/* 서클 일정 정보 */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">서클 일정</h3>
              <div className="space-y-4">
                {circleDetail.circleSchedules.length > 0 ? (
                  circleDetail.circleSchedules.map((schedule, index) => (
                    <ScheduleItem key={index} schedule={schedule} />
                  ))
                ) : (
                  <p className="text-gray-600">등록된 일정이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 개별 정보 항목 컴포넌트
const InfoItem = ({label, value}: {label: string; value: React.ReactNode}) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-700">{label}</h4>
    <p className="text-gray-600">{value}</p>
  </div>
)

// 개별 일정 항목 컴포넌트
const ScheduleItem = ({schedule}: {schedule: TCircleSchedule}) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <p className="text-gray-800">
      <span className="font-bold">요일:</span> {schedule.dayOfWeek}
    </p>
    <p className="text-gray-800">
      <span className="font-bold">시간:</span> {schedule.startTime} - {schedule.endTime}
    </p>
  </div>
)

export default CircleDetailPage
