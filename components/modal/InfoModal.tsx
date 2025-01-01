import React from 'react'

interface InfoModalProps {
  show: boolean // 모달을 보여줄지 여부
  onClose: () => void // 모달을 닫는 함수
  onConfirm?: () => void // 확인 버튼 클릭 시 실행할 함수 (optional)
  message: string // 전달할 메시지
}

const InfoModal: React.FC<InfoModalProps> = ({show, onClose, onConfirm, message}) => {
  if (!show) return null // 모달을 표시하지 않으면 null 반환

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-lg w-full mx-auto relative">
        {/* 확인 아이콘 */}
        <div className="text-6xl text-green-500 mb-4">✔️</div>

        {/* 메시지 */}
        <p className="text-lg text-gray-700 mb-6">{message}</p>

        {/* 확인 버튼 */}
        <button
          onClick={handleConfirm}
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 w-full font-semibold text-lg">
          확인
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

export default InfoModal
