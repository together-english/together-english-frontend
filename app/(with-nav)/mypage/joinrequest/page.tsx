'use client'

import React, {useState, useEffect} from 'react'
import {getWithJwt, postWithJwt} from '@/server'
import Pagination from '@/components/Pagination'

// Define the CircleJoinRequest type based on the API response
interface CircleJoinRequest {
  circleJoinRequestId: string
  memberId: string
  circleId: string
  circleName: string
  status: string | null // Allow null for robustness
  createdAt: string
  updatedAt: string
  message: string | null
  nickname: string // Requester identification
  profile: string | null // Profile photo URL
}

// Enum for CircleJoinStatus matching the backend
enum CircleJoinStatus {
  REJECTED = 'reject',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  WAITING = 'waiting',
  LEAVED = 'leaved',
  BANISHED = 'banished'
}

// API response type
interface CircleJoinRequestsResponse {
  status: string
  message: string
  data: {
    content: CircleJoinRequest[]
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

const CircleJoinRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<CircleJoinRequest[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageSize = 10

  // Function to parse API date string (yyyy-MM-dd HH:mm:ss.SSSSSS) to Date object
  const parseApiDate = (dateString: string): Date | null => {
    try {
      // Expected format: "2025-05-23 22:42:35.926741"
      const [datePart, timePart] = dateString.split(' ')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hour, minute, secondAndMicro] = timePart.split(':')
      const [second, microsecond] = secondAndMicro.split('.').map(Number)
      // JavaScript Date uses 0-based months, so subtract 1 from month
      const date = new Date(
        year,
        month - 1,
        day,
        parseInt(hour),
        parseInt(minute),
        second,
        microsecond / 1000
      )
      return isNaN(date.getTime()) ? null : date
    } catch (e) {
      console.error(`Error parsing date "${dateString}":`, e)
      return null
    }
  }

  // Function to check if a request is expired (older than 7 days)
  const isRequestExpired = (createdAt: string): boolean => {
    try {
      const createdDate = parseApiDate(createdAt)
      if (!createdDate) return false
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds
      return createdDate < sevenDaysAgo
    } catch (e) {
      console.error(`Error checking expiration for date "${createdAt}":`, e)
      return false
    }
  }

  // Fetch join requests
  const fetchJoinRequests = async (page: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getWithJwt(
        `/circle/circle-join-requests?page=${page - 1}&size=${pageSize}`
      )
      const data: CircleJoinRequestsResponse = await response.json()
      if (data.status === 'success') {
        // Log raw status, nickname, and profile for debugging
        console.log(
          'Raw API data:',
          data.data.content.map(r => ({
            circleJoinRequestId: r.circleJoinRequestId,
            status: r.status,
            nickname: r.nickname,
            profile: r.profile
          }))
        )
        // Update status to EXPIRED if the request is older than 7 days and still WAITING
        const updatedRequests = data.data.content.map(request => {
          const normalizedStatus = (
            request.status || ''
          ).toLowerCase() as CircleJoinStatus
          return {
            ...request,
            status:
              normalizedStatus === CircleJoinStatus.WAITING &&
              isRequestExpired(request.createdAt)
                ? CircleJoinStatus.EXPIRED
                : normalizedStatus
          }
        })
        setRequests(updatedRequests)
        setCurrentPage(data.data.page + 1) // API is 0-based, UI is 1-based
        setTotalPages(data.data.totalPages)
        setTotalElements(data.data.totalElements)
      } else {
        setError(data.message || '가입 요청을 가져오는데 실패했습니다')
      }
    } catch (e) {
      setError('가입 요청을 가져오는데 실패했습니다')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Handle approve request
  const handleApprove = async (circleJoinRequestId: string) => {
    try {
      const response = await postWithJwt(
        `/circle/join-requests/${circleJoinRequestId}/approve`,
        {
          circleJoinRequestId
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        // Refresh the list
        fetchJoinRequests(currentPage)
      } else {
        setError(data.message || '요청 수락에 실패했습니다')
      }
    } catch (e) {
      setError('요청 수락에 실패했습니다')
      console.error(e)
    }
  }

  // Handle reject request
  const handleReject = async (circleJoinRequestId: string) => {
    try {
      const response = await postWithJwt(
        `/circle/join-requests/${circleJoinRequestId}/reject`,
        {
          circleJoinRequestId
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        // Refresh the list
        fetchJoinRequests(currentPage)
      } else {
        setError(data.message || '요청 거절에 실패했습니다')
      }
    } catch (e) {
      setError('요청 거절에 실패했습니다')
      console.error(e)
    }
  }

  // Fetch data on mount and when page changes
  useEffect(() => {
    fetchJoinRequests(currentPage)
  }, [currentPage])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Format date for display (yyyy년 MM월 dd일 HH시 mm분)
  const formatDate = (dateString: string): string => {
    try {
      const date = parseApiDate(dateString)
      if (!date) return dateString
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`
    } catch (e) {
      console.error(`Error formatting date "${dateString}":`, e)
      return dateString
    }
  }

  // Status display mapping (Korean)
  const statusDisplay: Record<string, string> = {
    [CircleJoinStatus.WAITING]: '대기중',
    [CircleJoinStatus.ACCEPTED]: '수락됨',
    [CircleJoinStatus.REJECTED]: '거절됨',
    [CircleJoinStatus.EXPIRED]: '만료됨',
    [CircleJoinStatus.LEAVED]: '탈퇴함',
    [CircleJoinStatus.BANISHED]: '추방됨',
    '': '알 수 없음' // Fallback for empty, null, or undefined status
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">모임 가입 요청</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {loading ? (
        <div className="text-center">로딩중...</div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-500">가입 요청이 없습니다</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  모임 이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  메시지
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(request => (
                <tr key={request.circleJoinRequestId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      {request.profile ? (
                        <img
                          src={request.profile}
                          alt={`${request.nickname}의 프로필 사진`}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={e => {
                            e.currentTarget.style.display = 'none' // Hide broken images
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                          {request.nickname.charAt(0)}
                        </div>
                      )}
                      <span>{request.nickname || '알 수 없는 사용자'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.circleName || '알 수 없는 모임'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {statusDisplay[(request.status || '').toLowerCase()] ||
                      `알 수 없음 (${request.status || '없음'})`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(request.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {request.message || '메시지 없음'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {(request.status || '').toLowerCase() ===
                      CircleJoinStatus.WAITING && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(request.circleJoinRequestId)}
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                          aria-label="가입 요청 수락">
                          수락하기
                        </button>
                        <button
                          onClick={() => handleReject(request.circleJoinRequestId)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                          aria-label="가입 요청 거절">
                          거절하기
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalElements > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default CircleJoinRequestsPage
