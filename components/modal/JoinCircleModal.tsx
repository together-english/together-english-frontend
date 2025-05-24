'use client'

import {postWithJwt} from '@/server'
import React, {useState, useCallback} from 'react'

interface JoinCircleModalProps {
  circleId: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

/**
 * 영어 모임 신청 모달 컴포넌트
 * @param circleId 모임 ID
 * @param isOpen 모달 열림/닫힘 상태
 * @param onClose 모달 닫기 함수
 * @param onSuccess 신청 성공 시 실행될 콜백 (선택)
 */
const JoinCircleModal: React.FC<JoinCircleModalProps> = ({
  circleId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (!message.trim()) {
      alert('모임 신청 사유를 입력해 주세요.')
      return
    }
    if (message.length > 400) {
      alert('모임 신청 사유는 400자 이내로 입력해 주세요.')
      return
    }

    setIsLoading(true)
    try {
      const response = await postWithJwt('/circle/join-requests', {
        circleId,
        message
      })

      if (response.ok) {
        alert('모임 신청이 성공적으로 제출되었습니다!')
        onSuccess?.()
        onClose()
        setMessage('')
      } else {
        const errorData = await response.json()
        alert(errorData.message || '모임 신청에 실패했습니다.')
      }
    } catch (error) {
      console.error('모임 신청 중 오류 발생:', error)
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }, [circleId, message, onClose, onSuccess])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">영어 모임 신청</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}>
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1">
            신청 사유
          </label>
          <textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md resize-none"
            rows={4}
            placeholder="모임에 참여하고 싶은 이유를 입력해 주세요..."
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            disabled={isLoading}>
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}>
            {isLoading ? '제출 중...' : '신청'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinCircleModal
