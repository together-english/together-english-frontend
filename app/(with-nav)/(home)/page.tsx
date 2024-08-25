import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate px-6 lg:px-8 bg-white text-black">
        <div className="inset-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 absolute">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              함께하는 영어 학습, 새로운 차원으로
            </h1>
            <p className="mt-6 text-lg leading-8">
              영어 학습 동료와 함께 지역 카페에서 공부하며 영어 실력을 키우세요. 비슷한
              수준의 학습자들과 만나 재미있고 효과적인 학습을 경험해보세요!
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                href="/about-us"
                className="text-sm font-semibold leading-6 text-black"
              >
                더 알아보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">우리의 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">학습 파트너 찾기</h3>
              <p>
                영어 수준에 맞는 학습 파트너를 찾아 가까운 카페에서 학습 세션을
                예약하세요.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">수준 기반 매칭</h3>
              <p>
                영어 능력 수준에 맞는 다른 학습자들과 매칭되어 효과적이고 흥미로운 학습을
                경험하세요.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">연습 문제 제공</h3>
              <p>
                맞춤형 영어 문제와 연습 자료를 제공받아 학습을 안내하고 기술을
                향상시키세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">사용자 리뷰</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-black mb-4">
                "English Together는 제 영어 학습에 큰 도움이 되었습니다. 지역 카페에서
                새로운 친구들과 공부하는 것은 정말 재미있어요!"
              </p>
              <p className="font-semibold text-black">- 김지민</p>
            </div>
            {/* Review 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-black mb-4">
                "다양한 수준의 학습자와 연결되어 영어 실력을 빠르게 향상시킬 수 있었어요.
                추천합니다!"
              </p>
              <p className="font-semibold text-black">- 이수영</p>
            </div>
            {/* Review 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-black mb-4">
                "사용하기 쉬운 플랫폼으로, 영어 학습에 필요한 모든 것이 다 있어요. 특히
                카페에서 만나는 것이 좋습니다."
              </p>
              <p className="font-semibold text-black">- 박민수</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
