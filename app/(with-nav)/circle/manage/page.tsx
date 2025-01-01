'use client'
import {NextPage} from 'next'
import {useState} from 'react'
import {Transition} from '@headlessui/react'
import InputField from '@/components/input/InputField'
import Button from '@/components/button/Button'
import {useSearchParams} from 'next/navigation'
import ErrorModal from '@/components/modal/ErrorModal'
import InfoModal from '@/components/modal/InfoModal'
import {postWithJwt} from '@/server'
import {TCircleCreateRequest, TCircleSchedule} from '@/types/circle'
import {StatusEnum} from '@/types/status'

const CircleCreatePage: NextPage = () => {
  const searchParams = useSearchParams()
  const circleId = searchParams.get('circleId')
  const [formData, setFormData] = useState<TCircleCreateRequest>({
    title: '',
    englishLevel: '',
    city: '',
    introduction: '',
    capacity: 10,
    circleStatus: 'ACTIVE',
    attendMode: 'OFFLINE',
    contactWay: '',
    circleSchedules: [{dayOfWeek: '', startTime: '', endTime: ''}]
  })

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

  const addScheduleField = (index: number) => {
    setFormData(prev => {
      const updatedSchedules = [...prev.circleSchedules]
      updatedSchedules.splice(index + 1, 0, {dayOfWeek: '', startTime: '', endTime: ''})
      return {...prev, circleSchedules: updatedSchedules}
    })
  }

  const handleScheduleChange = (
    index: number,
    field: keyof TCircleSchedule,
    value: string
  ) => {
    setFormData(prev => {
      const updatedSchedules = [...prev.circleSchedules]
      updatedSchedules[index] = {
        ...updatedSchedules[index],
        [field]: value
      }
      return {...prev, circleSchedules: updatedSchedules}
    })
  }

  const removeScheduleField = (index: number) => {
    if (formData.circleSchedules.length === 1) {
      handleError('최소 하나의 일정은 필요합니다.')
      return
    }
    setFormData(prev => ({
      ...prev,
      circleSchedules: prev.circleSchedules.filter((_, i) => i !== index)
    }))
  }

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [InfoMessage, setInfoMessage] = useState<string>('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const handleError = (message: string) => {
    setErrorMessage(message)
    setShowErrorModal(true)
  }

  const handleInfoModal = (message: string) => {
    setInfoMessage(message)
    setShowInfoModal(true)
  }

  const handleInputChange =
    (name: string) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const {value} = e.target
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }

  const handleSubmit = () => {
    console.log('영어 모임 정보 제출됨:', formData)
    let hasError = false
    if (!formData.title) {
      handleError('영어 모임 제목을 입력해주세요')
      hasError = true
    }
    if (!formData.englishLevel) {
      handleError('영어 레벨을 선택해주세요')
      hasError = true
    }
    if (!formData.city) {
      handleError('도시를 선택해주세요')
      hasError = true
    }
    if (!formData.introduction) {
      handleError('영어 모임 소개를 입력해주세요')
      hasError = true
    }
    if (formData.capacity < 0) {
      handleError('정원은 1명 이상이어야 합니다.')
      hasError = true
    }
    if (!formData.contactWay) {
      handleError('연락 방법을 입력해주세요')
      hasError = true
    }
    formData.circleSchedules.forEach(schedule => {
      if (!schedule.dayOfWeek || !schedule.startTime || !schedule.endTime) {
        handleError('스케줄 정보를 입력해주세요')
        hasError = true
      }
    })
    if (!hasError) {
      console.log('FormData updated:', formData)
      const multipartData = new FormData()
      multipartData.append('request', JSON.stringify(formData))
      postWithJwt('/circle', multipartData)
        .then(res => res.json())
        .then((result: {status: string; data?: string; message: string}) => {
          if (result.status === StatusEnum.SUCCESS && result.data) {
            handleInfoModal('영어 모임 생성에 성공했습니다.')
          } else {
            handleError(result.message)
          }
        })
    }
  }

  const moveToCirclePage = () => {
    window.location.href = '/circle'
  }

  const handleDeleteCircle = () => {
    console.log('영어 모임 삭제됨')
    setIsDeleteModalOpen(false)
  }
  const commonLabelClasses = 'block text-sm font-semibold leading-6 text-gray-900'
  const commonInputClasses =
    'mt-1 w-full p-2 border rounded-md shadow-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600 ring-2 ring-gray-300'

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <ErrorModal
            show={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            message={errorMessage}
          />
          <InfoModal
            show={showInfoModal}
            onClose={() => setShowInfoModal(false)}
            onConfirm={moveToCirclePage}
            message={InfoMessage}
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            영어 모임 생성 및 관리
          </h1>

          <form onSubmit={handleSubmit}>
            {/* 영어 모임 이름 */}
            <div className="mb-4">
              <InputField
                id="title"
                label="영어 모임 이름"
                type="text"
                value={formData.title}
                onChange={handleInputChange('title')}
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
                value={formData.englishLevel}
                onChange={handleInputChange('englishLevel')}
                className={commonInputClasses}
                required>
                <option value="">레벨 선택</option>
                <option value="BEGINNER">초급</option>
                <option value="INTERMEDIATE">중급</option>
                <option value="ADVANCED">고급</option>
                <option value="PROFICIENT">숙련</option>
                <option value="NATIVE">원어민 수준</option>
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
                onChange={handleInputChange('city')}
                className={commonInputClasses}
                required>
                <option value="">도시 선택</option>
                {City.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
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
                onChange={handleInputChange('introduction')}
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
                onChange={handleInputChange('capacity')}
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
                value={formData.attendMode}
                onChange={handleInputChange('attendMode')}
                className={commonInputClasses}
                required>
                <option value="ONLINE">온라인</option>
                <option value="OFFLINE">오프라인</option>
              </select>
            </div>

            {/* 오프라인일 경우 주소 입력 */}
            {formData.attendMode === 'OFFLINE' && (
              <div className="mb-4">
                <InputField
                  id="address"
                  label="주소"
                  type="text"
                  value={formData.address || ''}
                  onChange={handleInputChange('address')}
                  required
                  placeholder="오프라인 모임 장소의 주소를 입력하세요"
                />
              </div>
            )}

            {/* 온라인일 경우 URL 입력 */}
            {formData.attendMode === 'ONLINE' && (
              <div className="mb-4">
                <InputField
                  id="online_url"
                  label="온라인 URL"
                  type="url"
                  value={formData.onlineUrl || ''}
                  onChange={handleInputChange('onlineUrl')}
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
                value={formData.contactWay}
                onChange={handleInputChange('contactWay')}
                required
                placeholder="카카오톡 오픈 채팅, 이메일 등"
              />
            </div>

            {/* 일정 필드 */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">일정</h3>
              {formData.circleSchedules.map((schedule, index) => (
                <div key={index} className="mb-4 flex items-center space-x-4">
                  <div className="w-1/3">
                    <label className={commonLabelClasses}>요일</label>
                    <select
                      value={schedule.dayOfWeek}
                      onChange={e =>
                        handleScheduleChange(index, 'dayOfWeek', e.target.value)
                      }
                      className={commonInputClasses}>
                      <option value="">요일 선택</option>
                      <option value="MONDAY">월요일</option>
                      <option value="TUESDAY">화요일</option>
                      <option value="WEDNESDAY">수요일</option>
                      <option value="THURSDAY">목요일</option>
                      <option value="FRIDAY">금요일</option>
                      <option value="SATURDAY">토요일</option>
                      <option value="SUNDAY">일요일</option>
                    </select>
                  </div>
                  <InputField
                    id={`startTime-${index}`}
                    label="시작 시간"
                    type="time"
                    value={schedule.startTime}
                    onChange={e =>
                      handleScheduleChange(index, 'startTime', e.target.value)
                    }
                  />
                  <InputField
                    id={`endTime-${index}`}
                    label="종료 시간"
                    type="time"
                    value={schedule.endTime}
                    onChange={e => handleScheduleChange(index, 'endTime', e.target.value)}
                  />
                  {/* 삭제 및 추가 버튼 */}
                  <div className="flex space-x-2 mt-5">
                    <button
                      type="button"
                      onClick={() => removeScheduleField(index)}
                      className="text-red-500 hover:text-red-700">
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => addScheduleField(index)}
                      className="text-cyan-500 hover:text-cyan-700">
                      + 추가
                    </button>
                  </div>
                </div>
              ))}
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
