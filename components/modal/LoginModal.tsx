import React from 'react'
import {useRouter} from 'next/navigation'

interface LoginModalProps {
  show: boolean // 모달을 보여줄지 여부
  onClose: () => void // 모달을 닫는 함수
}

const LoginModal: React.FC<LoginModalProps> = ({show, onClose}) => {
  const router = useRouter()

  // 로그인 페이지로 이동하는 함수
  const handleLoginRedirect = () => {
    onClose() // 모달 닫기
    router.push('/login') // 로그인 페이지로 이동
  }

  if (!show) return null // 모달을 표시하지 않으면 null 반환

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-lg w-full mx-auto relative">
        {/* 토스 스타일 이모티콘 추가 */}
        <div className="text-6xl mb-4">😊</div>

        <h2 className="text-3xl font-bold mb-4 text-gray-900">로그인이 필요합니다</h2>
        <p className="text-gray-600 mb-6">이 기능을 이용하려면 로그인이 필요합니다.</p>

        <button
          onClick={handleLoginRedirect}
          className="bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition duration-300 w-full font-semibold text-lg">
          로그인 페이지로 이동
        </button>

        {/* 닫기 버튼을 좀 더 깔끔한 스타일로 변경 */}
        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-gray-600 transition duration-300 text-lg font-medium absolute -top-2 right-4">
          ✕
        </button>
      </div>
    </div>
  )
}

export default LoginModal
