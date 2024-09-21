import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Transition} from '@headlessui/react'

interface CircleModalProps {
  isOpen: boolean
  onClose: () => void
  targetUrl: string
}

// City Enum
const City = [
  {value: 'GANGNAM', label: '강남'},
  {value: 'SINCHON', label: '신촌'},
  {value: 'HONGDAE', label: '홍대'},
  {value: 'KONDAE', label: '건대'},
  {value: 'SINRIM', label: '신림'},
  {value: 'SUWON', label: '수원'},
  {value: 'PANGYO', label: '판교'},
  {value: 'INCHEON', label: '인천'},
  {value: 'DAEJEON', label: '대전'},
  {value: 'DAEGU', label: '대구'},
  {value: 'ULSAN', label: '울산'},
  {value: 'CHANGWON', label: '창원'},
  {value: 'BUSAN', label: '부산'},
  {value: 'ETC', label: '기타'},
  {value: 'ONLINE', label: '온라인'}
]

// EnglishLevel Enum
const EnglishLevel = [
  {value: 'BEGINNER', label: '기초적인 영어 실력'},
  {value: 'INTERMEDIATE', label: '중간 수준의 영어 실력'},
  {value: 'ADVANCED', label: '고급 영어 실력'},
  {value: 'PROFICIENT', label: '숙련된 영어 실력'},
  {value: 'NATIVE', label: '원어민 수준의 영어 실력'}
]

const CircleModal: React.FC<CircleModalProps> = ({isOpen, onClose, targetUrl}) => {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState<string>('') // 초기값 없음
  const [selectedLevel, setSelectedLevel] = useState<string>('') // 초기값 없음
  const [circleName, setCircleName] = useState<string>('') // 초기값 없음

  const handleApplyFilter = () => {
    const queryString = new URLSearchParams({
      city: selectedCity || '', // 선택되지 않으면 빈 값으로 처리
      level: selectedLevel || '',
      name: circleName || ''
    }).toString()
    router.push(`${targetUrl}?${queryString}`)
    onClose() // 모달 닫기
  }

  if (!isOpen) return null

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">필터 설정</h3>

          {/* 영어모임 검색 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">영어모임 검색</h4>
            <input
              type="text"
              value={circleName}
              onChange={e => setCircleName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="영어모임 이름을 입력하세요"
            />
          </div>

          {/* 도시 필터 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600">도시 선택</h4>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {City.map(city => (
                <label key={city.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={city.value}
                    checked={selectedCity === city.value}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="form-radio"
                  />
                  <span>{city.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 영어 레벨 필터 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600">영어 레벨 선택</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {EnglishLevel.map(level => (
                <label key={level.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={level.value}
                    checked={selectedLevel === level.value}
                    onChange={e => setSelectedLevel(e.target.value)}
                    className="form-radio"
                  />
                  <span>{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 필터 적용 및 닫기 버튼 */}
          <div className="mt-6 flex justify-between">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              닫기
            </button>
            <button
              onClick={handleApplyFilter}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
              필터 적용
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default CircleModal
