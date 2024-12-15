'use client'
import {NextPage} from 'next'
import {useState} from 'react'
import {Transition} from '@headlessui/react'
import InputField from '@/components/input/InputField'
import Button from '@/components/button/Button'
import {useSearchParams} from 'next/navigation'
import ErrorModal from '@/components/modal/ErrorModal'

interface CircleForm {
  name: string
  english_level: string
  city: string
  introduction: string
  capacity: number
  attend_mode: string
  address?: string
  online_url?: string
  contact_way: string
}

const CircleCreatePage: NextPage = () => {
  const searchParams = useSearchParams()
  const circleId = searchParams.get('circleId')
  const [formData, setFormData] = useState<CircleForm>({
    name: '',
    english_level: '',
    city: '',
    introduction: '',
    capacity: 10,
    attend_mode: '오프라인',
    address: '',
    online_url: '',
    contact_way: ''
  })

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const handleError = (message: string) => {
    setErrorMessage(message)
    setShowErrorModal(true)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log('영어 모임 정보 제출됨:', formData)
    if (!formData.name) {
      handleError('영어 모임 이름을 입력해주세요')
    }
  }

  const handleDeleteCircle = () => {
    console.log('영어 모임 삭제됨')
    setIsDeleteModalOpen(false)
  }
  const commonLabelClasses = 'block text-sm font-semibold leading-6 text-gray-900'
  const commonInputClasses =
    'mt-1 w-full p-3 border rounded-md shadow-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600 ring-2 ring-gray-300'

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <ErrorModal
            show={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            message={errorMessage}
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            영어 모임 생성 및 관리
          </h1>

          <form onSubmit={handleSubmit}>
            {/* 영어 모임 이름 */}
            <div className="mb-4">
              <InputField
                id="name"
                label="영어 모임 이름"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="영어 모임 이름을 입력하세요"
              />
            </div>

            {/* 영어 레벨 */}
            <div className="mb-4">
              <label htmlFor="english_level" className={commonLabelClasses}>
                영어 레벨
              </label>
              <select
                id="english_level"
                name="english_level"
                value={formData.english_level}
                onChange={handleInputChange}
                className={commonInputClasses}
                required>
                <option value="">레벨 선택</option>
                <option value="Beginner">초급</option>
                <option value="Intermediate">중급</option>
                <option value="Advanced">고급</option>
                <option value="Proficient">숙련</option>
                <option value="Native">원어민 수준</option>
              </select>
            </div>

            {/* 도시 */}
            <div className="mb-4">
              <label htmlFor="city" className={commonLabelClasses}>
                도시
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={commonInputClasses}
                required>
                <option value="">도시 선택</option>
                <option value="서울">서울</option>
                <option value="부산">부산</option>
                <option value="인천">인천</option>
                <option value="대구">대구</option>
                <option value="대전">대전</option>
                <option value="울산">울산</option>
                <option value="창원">창원</option>
                <option value="기타">기타</option>
                <option value="온라인">온라인</option>
              </select>
            </div>

            {/* 영어 모임 소개 */}
            <div className="mb-4">
              <label htmlFor="introduction" className={commonLabelClasses}>
                영어 모임 소개
              </label>
              <textarea
                id="introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                className={`${commonInputClasses} resize-none`}
                placeholder="영어 모임을 소개해주세요"
                rows={4}
                required
              />
            </div>

            {/* 정원 */}
            <div className="mb-4">
              <InputField
                id="capacity"
                label="정원"
                type="number"
                value={formData.capacity.toString()}
                onChange={handleInputChange}
                required
                placeholder="정원을 입력하세요"
              />
            </div>

            {/* 참여 방식 */}
            <div className="mb-4">
              <label htmlFor="attend_mode" className={commonLabelClasses}>
                참여 방식
              </label>
              <select
                id="attend_mode"
                name="attend_mode"
                value={formData.attend_mode}
                onChange={handleInputChange}
                className={commonInputClasses}
                required>
                <option value="오프라인">오프라인</option>
                <option value="온라인">온라인</option>
              </select>
            </div>

            {/* 오프라인일 경우 주소 입력 */}
            {formData.attend_mode === '오프라인' && (
              <div className="mb-4">
                <InputField
                  id="address"
                  label="주소"
                  type="text"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  required
                  placeholder="오프라인 모임 장소의 주소를 입력하세요"
                />
              </div>
            )}

            {/* 온라인일 경우 URL 입력 */}
            {formData.attend_mode === '온라인' && (
              <div className="mb-4">
                <InputField
                  id="online_url"
                  label="온라인 URL"
                  type="url"
                  value={formData.online_url || ''}
                  onChange={handleInputChange}
                  required
                  placeholder="온라인 참여 링크를 입력하세요"
                />
              </div>
            )}

            {/* 연락 방법 */}
            <div className="mb-4">
              <InputField
                id="contact_way"
                label="연락 방법"
                type="text"
                value={formData.contact_way}
                onChange={handleInputChange}
                required
                placeholder="카카오톡 오픈 채팅, 이메일 등"
              />
            </div>

            {/* 제출 및 삭제 버튼 */}
            <div className="flex justify-between">
              <Button color="cyan" onClick={handleSubmit}>
                영어 모임 만들기
              </Button>
              {circleId && (
                <Button color="red" type="submit">
                  영어 모임 삭제하기
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 영어 모임 삭제 확인 모달 */}
      <Transition
        show={isDeleteModalOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800">
              정말 영어 모임을 삭제하시겠습니까?
            </h3>
            <p className="text-gray-600 mt-2">삭제한 영어 모임은 복구할 수 없습니다.</p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-700 hover:text-gray-900">
                취소
              </button>
              <button
                onClick={handleDeleteCircle}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default CircleCreatePage
