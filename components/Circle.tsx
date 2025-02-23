import React, {useState} from 'react'
import {TCircle} from '@/types/circle'
import {useAuth} from '@/contexts'
import LoginModal from './modal/LoginModal'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {postWithJwt, delWithJwt} from '@/server'

const Circle: React.FC<TCircle> = ({
  id,
  name,
  englishLevel,
  city,
  thumbnailUrl: thumbnail,
  title,
  capacity,
  totalView: totalViews,
  leaderName: leaderNickname,
  leaderProfile,
  likedByMe: isLike,
  totalLike: likeCount
}) => {
  const [isLiked, setIsLiked] = useState(isLike)
  const {signInResponse} = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  const handleLikeClick = () => {
    if (signInResponse) {
      if (isLiked) {
        delWithJwt(`/circle/${id}/favorites`)
      } else {
        postWithJwt(`/circle/${id}/favorites`, {})
      }
      setIsLiked(!isLiked)
    } else {
      setShowLoginModal(true)
    }
  }

  const handleViewDetails = () => {
    router.push(`/circle/${id}`)
  }

  return (
    <div
      key={id}
      className="bg-white shadow-2xl rounded-lg overflow-hidden hover:shadow-3xl transition-shadow duration-300 ease-in-out">
      {/* Thumbnail */}
      <div className="relative w-full h-[250px]">
        <Image
          src={thumbnail || '/images/defaultImage.png'}
          alt={name}
          fill
          style={{objectFit: 'cover'}}
        />
      </div>
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{title}</p>
        <div className="mt-4 flex items-center">
          <Image
            src={leaderProfile}
            alt={leaderNickname}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm text-gray-700 font-medium">리더: {leaderNickname}</p>
            <p className="text-sm text-gray-500">
              레벨: {englishLevel} | 지역: {city}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">정원: {capacity}명</span>
            <span className="text-sm text-gray-500 ml-4">조회수: {totalViews}</span>
            <span className="text-sm text-gray-500 ml-4">좋아요: {likeCount}</span>
          </div>
          <button onClick={handleLikeClick}>
            {isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={handleViewDetails}
          className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
          모임 자세히보기
        </button>
      </div>
      {/* 로그인 모달 */}
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

export default Circle
