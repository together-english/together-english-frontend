'use client'
import {NextPage} from 'next'
import {useRouter} from 'next/navigation'

const TossStyleCongratulationsPage: NextPage = () => {
  const router = useRouter()

  const handleGoToLogin = () => {
    router.push('/login')
  }

  const handleCreateCircle = () => {
    router.push('/circle/create')
  }

  const handleShareWithFriends = () => {
    const shareUrl = window.location.origin
    navigator.clipboard.writeText(shareUrl)
    alert('링크가 복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* 회원가입 축하 카드 */}
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg text-center">
        {/* 축하 이모티콘 */}
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">가입을 축하합니다!</h1>
        <p className="text-gray-600 text-lg mb-6">
          이제 English Together의 멤버가 되셨습니다.
        </p>

        {/* 동작 버튼 */}
        <div className="space-y-4">
          <button
            onClick={handleGoToLogin}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition duration-300 font-semibold">
            로그인 하기
          </button>

          <button
            onClick={handleShareWithFriends}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold">
            친구에게 공유하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default TossStyleCongratulationsPage
