'use client'
import {NextPage} from 'next'
import {useState} from 'react'
import {Transition} from '@headlessui/react'

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 서클 생성 로직 (API 호출)
    console.log('서클 정보 제출됨:', formData)
  }

  const handleDeleteCircle = () => {
    // 서클 삭제 로직 (API 호출)
    console.log('서클 삭제됨')
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* 서클 생성 카드 */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">서클 생성 및 관리</h1>

          {/* 서클 생성 폼 */}
          <form onSubmit={handleSubmit}>
            {/* 서클 이름 */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                서클 이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                placeholder="서클 이름을 입력하세요"
                required
              />
            </div>

            {/* 영어 레벨 */}
            <div className="mb-4">
              <label
                htmlFor="english_level"
                className="block text-lg font-medium text-gray-700">
                영어 레벨
              </label>
              <select
                id="english_level"
                name="english_level"
                value={formData.english_level}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
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
              <label htmlFor="city" className="block text-lg font-medium text-gray-700">
                도시
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
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

            {/* 서클 소개 */}
            <div className="mb-4">
              <label
                htmlFor="introduction"
                className="block text-lg font-medium text-gray-700">
                서클 소개
              </label>
              <textarea
                id="introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                placeholder="서클을 소개해주세요"
                rows={4}
                required
              />
            </div>

            {/* 정원 */}
            <div className="mb-4">
              <label
                htmlFor="capacity"
                className="block text-lg font-medium text-gray-700">
                정원
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                min={1}
                required
              />
            </div>

            {/* 참여 방식 */}
            <div className="mb-4">
              <label
                htmlFor="attend_mode"
                className="block text-lg font-medium text-gray-700">
                참여 방식
              </label>
              <select
                id="attend_mode"
                name="attend_mode"
                value={formData.attend_mode}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                required>
                <option value="오프라인">오프라인</option>
                <option value="온라인">온라인</option>
              </select>
            </div>

            {/* 오프라인일 경우 주소 입력 */}
            {formData.attend_mode === '오프라인' && (
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-lg font-medium text-gray-700">
                  주소
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="오프라인 모임 장소의 주소를 입력하세요"
                  required={formData.attend_mode === '오프라인'}
                />
              </div>
            )}

            {/* 온라인일 경우 URL 입력 */}
            {formData.attend_mode === '온라인' && (
              <div className="mb-4">
                <label
                  htmlFor="online_url"
                  className="block text-lg font-medium text-gray-700">
                  온라인 URL
                </label>
                <input
                  type="url"
                  id="online_url"
                  name="online_url"
                  value={formData.online_url}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="온라인 참여 링크를 입력하세요"
                  required={formData.attend_mode === '온라인'}
                />
              </div>
            )}

            {/* 연락 방법 */}
            <div className="mb-4">
              <label
                htmlFor="contact_way"
                className="block text-lg font-medium text-gray-700">
                연락 방법
              </label>
              <input
                type="text"
                id="contact_way"
                name="contact_way"
                value={formData.contact_way}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                placeholder="카카오톡 오픈 채팅, 이메일 등"
                required
              />
            </div>

            {/* 제출 및 삭제 버튼 */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                서클 생성하기
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300">
                서클 삭제하기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 서클 삭제 확인 모달 */}
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
              정말 서클을 삭제하시겠습니까?
            </h3>
            <p className="text-gray-600 mt-2">삭제한 서클은 복구할 수 없습니다.</p>
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
