'use client'
import {NextPage} from 'next'
import Image from 'next/image'
import {useParams, useRouter} from 'next/navigation'
import {useState, useEffect} from 'react'
import {get, postWithJwt, putWithJwt, delWithJwt, patchWithJwt} from '@/server' // 제공된 유틸리티
import {TComment, TCommentPage} from '@/types/comment'
import {TCircleDetail, TCircleSchedule} from '@/types/circle'
import {TApiResponse} from '@/types/common'
import {City, StatusEnum} from '@/types/status'
import Button from '@/components/button/Button'
import {useAuth} from '@/contexts'
import CommentEditor from '@/components/comment/CommentEditor'
import CommentList from '@/components/comment/CommentList'
import LoginModal from '@/components/modal/LoginModal'

const CircleDetailPage: NextPage = () => {
  const {id} = useParams()
  const [circleDetail, setCircleDetail] = useState<TCircleDetail | null>(null)
  const [commentPage, setCommentPage] = useState<TCommentPage | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {signInResponse} = useAuth()
  const [canEdit, setCanEdit] = useState(false)
  const router = useRouter()
  const getCityValue = (key: string): string | 'etc' => {
    return City[key as keyof typeof City]
  }
  const handleEditClick = () => {
    router.push(`/circle/manage?id=${id}`)
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
        setCurrentPage(page)
      } else {
        console.error('Failed to fetch comments:', result.message)
        setError('댓글을 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.error('댓글 조회 오류:', error)
      setError('댓글 조회 중 오류가 발생했습니다.')
    }
  }

  const handlePageChange = (page: number) => {
    fetchComments(page)
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
        fetchComments(currentPage) // 현재 페이지 유지하며 갱신
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
        fetchComments(currentPage) // 갱신
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
        fetchComments(currentPage) // 갱신
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
    get(`/circle/detail/${id}`)
      .then(res => res.json())
      .then((result: TApiResponse<TCircleDetail>) => {
        if (result.status === StatusEnum.SUCCESS && result.data) {
          result.data.city = getCityValue(result.data.city)
          setCircleDetail(result.data)
          setLoading(false)
        } else {
          console.error('Failed to fetch circle details:', result.message)
          setError('서클 정보를 불러오는 데 실패했습니다.')
        }
        return result
      })
      .then((result: TApiResponse<TCircleDetail>) => {
        if (signInResponse?.memberDto.nickname == result.data?.leaderName) {
          setCanEdit(true)
        }
        console.log(canEdit)
        console.log(signInResponse?.memberDto.nickname)
        console.log(result.data?.leaderName)
      })
    fetchComments(currentPage)
  }, [id, signInResponse])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  if (!circleDetail) {
    return <div>서클 정보를 찾을 수 없습니다.</div>
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
            {commentPage && (
              <CommentList
                comments={commentPage.content}
                pageData={commentPage}
                onPageChange={handlePageChange}
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
