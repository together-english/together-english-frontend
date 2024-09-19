import React from 'react'
import {CircleInterface} from '@/types/circleInterface'

const Circle: React.FC<CircleInterface> = ({
  id,
  name,
  english_level,
  city,
  thumbnail,
  introduction,
  capacity,
  total_views,
  leader_nickname,
  leader_profile
}) => {
  return (
    <div
      key={id}
      className="bg-white shadow-2xl rounded-lg overflow-hidden hover:shadow-3xl transition-shadow duration-300 ease-in-out">
      <img className="h-48 w-full object-cover" src={thumbnail} alt={name} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{introduction}</p>
        <div className="mt-4 flex items-center">
          {/* 프로필 사진 크기를 키움 */}
          <img
            className="w-16 h-16 rounded-full"
            src={leader_profile}
            alt={leader_nickname}
          />
          <div className="ml-3">
            <p className="text-sm text-gray-700 font-medium">리더: {leader_nickname}</p>
            {/* 레벨과 지역을 한 줄로 배치 */}
            <p className="text-sm text-gray-500">
              레벨: {english_level} | 지역: {city}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-500">정원: {capacity}명</span>
          <span className="text-sm text-gray-500 ml-4">조회수: {total_views}</span>
        </div>
        <button className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
          모임 자세히보기
        </button>
      </div>
    </div>
  )
}

export default Circle
