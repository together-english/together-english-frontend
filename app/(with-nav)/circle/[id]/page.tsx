'use client'
import {NextPage} from 'next'
import Image from 'next/image'
import {useParams, useRouter} from 'next/navigation'
import {useState, useEffect} from 'react'
import {get, postWithJwt, putWithJwt, delWithJwt} from '@/server'
import {TCommentPage} from '@/types/comment'
import {TCircleDetail, TCircleSchedule} from '@/types/circle'
import {TApiResponse} from '@/types/common'
import {City, StatusEnum} from '@/types/status'
import Button from '@/components/button/Button'
import {useAuth} from '@/contexts'
import CommentEditor from '@/components/comment/CommentEditor'
import CommentList from '@/components/comment/CommentList'
import LoginModal from '@/components/modal/LoginModal'
import JoinCircleModal from '@/components/modal/JoinCircleModal'
import Pagination from '@/components/Pagination'

// Define CircleMember type based on API response
interface CircleMember {
  circleMemberId: string
  nickname: string
  profile: string | null
  role: string // e.g., "MEMBER", "LEADER"
}

// Define paginated CircleMember response
interface CircleMemberPage {
  content: CircleMember[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

const CircleDetailPage: NextPage = () => {
  const {id} = useParams()
  const [circleDetail, setCircleDetail] = useState<TCircleDetail | null>(null)
  const [commentPage, setCommentPage] = useState<TCommentPage | null>(null)
  const [memberPage, setMemberPage] = useState<CircleMemberPage | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentCommentPage, setCurrentCommentPage] = useState(0)
  const [currentMemberPage, setCurrentMemberPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {signInResponse} = useAuth()
  const [canEdit, setCanEdit] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const router = useRouter()
  const memberPageSize = 10

  const getCityValue = (key: string): string | 'etc' => {
    return City[key as keyof typeof City] || 'etc'
  }

  const handleEditClick = () => {
    router.push(`/circle/manage?id=${id}`)
  }

  const fetchCircleDetails = async () => {
    try {
      const response = await get(`/circle/detail/${id}`)
      const result: TApiResponse<TCircleDetail> = await response.json()
      if (result.status === StatusEnum.SUCCESS && result.data) {
        result.data.city = getCityValue(result.data.city)
        setCircleDetail(result.data)
        if (signInResponse?.memberDto.nickname === result.data.leaderName) {
          setCanEdit(true)
        }
      } else {
        console.error('Failed to fetch circle details:', result.message)
        setError('서클 정보를 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.error('서클 조회 오류:', error)
      setError('서클 조회 중 오류가 발생했습니다.')
    }
  }

  const fetchComments = async (page: number = 0) => {
    try {
      const query = new URLSearchParams({
        circleId: id as string,
        page: page.toString(),
        size: '10'
      }).toString()
      const response = await get(`/comment?${query}`)
      const result: TApiResponse<TCommentPage> = await response.json()
      if (result.status === 'success' && result.data) {
        setCommentPage(result.data)
        setCurrentCommentPage(page)
      } else {
        console.error('Failed to fetch comments:', result.message)
        setError('댓글을 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.error('댓글 조회 오류:', error)
      setError('댓글 조회 중 오류가 발생했습니다.')
    }
  }

  const fetchMembers = async (page: number = 0) => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        size: memberPageSize.toString()
      }).toString()
      const response = await get(`/circle/${id}/member?${query}`)
      const result: TApiResponse<CircleMemberPage> = await response.json()
      if (result.status === 'success' && result.data) {
        console.log(
          'Raw member data:',
          result.data.content.map(m => ({
            circleMemberId: m.circleMemberId,
            nickname: m.nickname,
            profile: m.profile,
            role: m.role
          }))
        )
        setMemberPage(result.data)
        setCurrentMemberPage(page)
      } else {
        console.error('Failed to fetch members:', result.message)
        setError('멤버 목록을 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.error('멤버 조회 오류:', error)
      setError('멤버 조회 중 오류가 발생했습니다.')
    }
  }

  const handleBanishMember = async (circleMemberId: string, nickname: string) => {
    if (!canEdit) {
      setError('리더 권한이 필요합니다.')
      return
    }
    if (!window.confirm(`"${nickname}"님을 모임에서 추방하시겠습니까?`)) {
      return
    }
    try {
      const response = await delWithJwt(`/circle/member/${circleMemberId}/banish`)
      const result = await response.json()
      if (result.status === 'success') {
        fetchMembers(currentMemberPage) // Refresh member list
        alert('멤버가 추방되었습니다.')
      } else {
        setError(result.message || '멤버 추방에 실패했습니다.')
      }
    } catch (error) {
      console.error('멤버 추방 오류:', error)
      setError('멤버 추방 중 오류가 발생했습니다.')
    }
  }

  const handleCommentPageChange = (page: number) => {
    fetchComments(page)
  }

  const handleMemberPageChange = (page: number) => {
    fetchMembers(page)
  }

  const handlePostComment = async (content: string) => {
    if (!signInResponse) {
      setShowLoginModal(true)
      return false
    }
    try {
      const response = await postWithJwt('/comment', {circleId: id, content})
      const result = await response.json()
      if (result.status === 'success') {
        fetchComments(currentCommentPage)
        return true
      } else {
        alert('댓글 작성에 실패했습니다: ' + result.message)
        return false
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error)
      alert('댓글 작성 중 오류가 발생했습니다.')
      return false
    }
  }

  const handleUpdateComment = async (commentId: string, content: string) => {
    if (!signInResponse) {
      setShowLoginModal(true)
      return false
    }
    try {
      const response = await putWithJwt('/comment', {commentId, content})
      const result = await response.json()
      if (result.status === 'success') {
        fetchComments(currentCommentPage)
        return true
      } else {
        alert('댓글 수정에 실패했습니다: ' + result.message)
        return false
      }
    } catch (error) {
      console.error('댓글 수정 오류:', error)
      alert('댓글 수정 중 오류가 발생했습니다.')
      return false
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!signInResponse) {
      setShowLoginModal(true)
      return false
    }
    try {
      const response = await delWithJwt(`/comment/${commentId}`)
      const result = await response.json()
      if (result.status === 'success') {
        fetchComments(currentCommentPage)
        return true
      } else {
        alert('댓글 삭제에 실패했습니다: ' + result.message)
        return false
      }
    } catch (error) {
      console.error('댓글 삭제 오류:', error)
      alert('댓글 삭제 중 오류가 발생했습니다.')
      return false
    }
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    Promise.all([fetchCircleDetails(), fetchComments(0), fetchMembers(0)]).finally(() =>
      setLoading(false)
    )
  }, [id, signInResponse])

  if (loading) {
    return <div className="text-center">로딩중...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  if (!circleDetail) {
    return <div className="text-center">서클 정보를 찾을 수 없습니다.</div>
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
              {canEdit && (
                <div className="ml-5 flex gap-2">
                  <Button color="green" onClick={handleEditClick}>
                    수정하기
                  </Button>
                </div>
              )}
              {!canEdit && signInResponse && (
                <div className="ml-5 flex gap-2">
                  <Button color="blue" onClick={() => setIsJoinModalOpen(true)}>
                    가입 신청하기
                  </Button>
                </div>
              )}
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

            {/* 모임 멤버 정보 */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">모임 멤버</h3>
              {memberPage && memberPage.content.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {memberPage.content.map(member => (
                      <div
                        key={member.circleMemberId}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {member.profile ? (
                          <img
                            src={member.profile}
                            alt={`${member.nickname}의 프로필 사진`}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={e => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                            {member.nickname.charAt(0)}
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-800">{member.nickname}</span>
                          {member.role === 'LEADER' && (
                            <span className="text-xs text-green-600 font-semibold">
                              [리더]
                            </span>
                          )}
                        </div>
                        {canEdit && member.role !== 'LEADER' && (
                          <button
                            onClick={() =>
                              handleBanishMember(member.circleMemberId, member.nickname)
                            }
                            className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700"
                            aria-label={`${member.nickname} 추방하기`}>
                            추방하기
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {memberPage.totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination
                        currentPage={currentMemberPage + 1}
                        totalPages={memberPage.totalPages}
                        onPageChange={page => handleMemberPageChange(page - 1)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">모임에 가입한 멤버가 없습니다.</p>
              )}
            </div>

            {/* 댓글 섹션 */}
            {commentPage && (
              <CommentList
                comments={commentPage.content}
                pageData={commentPage}
                onPageChange={handleCommentPageChange}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                currentNickname={signInResponse?.memberDto.nickname || ''}
              />
            )}
            <CommentEditor
              circleId={id as string}
              nickname={signInResponse?.memberDto.nickname || '익명'}
              onCommentPosted={handlePostComment}
            />
          </div>
        </div>
      </div>
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <JoinCircleModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        circleId={id as string}
        onSuccess={() => {
          alert('신청이 완료되었습니다.')
        }}
      />
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
