import React from 'react'

interface ErrorModalProps {
  show: boolean // 모달을 보여줄지 여부
  onClose: () => void // 모달을 닫는 함수
  message: string // 에러 메시지
}

const ErrorModal: React.FC<ErrorModalProps> = ({show, onClose, message}) => {
  if (!show) return null // 모달을 표시하지 않으면 null 반환

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-lg w-full mx-auto relative">
        {/* 경고 아이콘 */}
        <div className="text-6xl text-red-500 mb-4">⚠️</div>

        {/* 메시지 */}
        <p className="text-lg text-gray-700 mb-6">{message}</p>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 w-full font-semibold text-lg">
          닫기
        </button>

        {/* 닫기 버튼 (오른쪽 상단) */}
        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-gray-600 transition duration-300 text-lg font-medium absolute -top-2 right-4">
          ✕
        </button>
      </div>
    </div>
  )
}

export default ErrorModal
