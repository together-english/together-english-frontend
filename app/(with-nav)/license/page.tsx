export default function License() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8 bg-white text-black">
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
              사용 약관 및 라이선스 정보
            </h1>
            <p className="mt-6 text-lg leading-8">
              저희 웹사이트의 사용 조건 및 오픈 소스 라이선스 정보를 확인하세요. 이 정보를
              통해 사용 약관을 명확히 이해할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* License Information Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            라이선스 정보
          </h2>
          <div className="space-y-6 text-black leading-8">
            <p>
              저희 웹사이트에서 제공하는 모든 콘텐츠(이미지, 텍스트, 코드 등)는 저작권법에
              의해 보호됩니다. 이 콘텐츠를 무단으로 사용, 복제, 배포하는 것은 금지되어
              있습니다.
            </p>
            <p>
              저희는 웹사이트 개발에 오픈 소스 소프트웨어를 사용하고 있으며, 각
              소프트웨어의 라이선스 조건에 따라 사용하고 있습니다. 아래는 주요 오픈 소스
              라이선스 정보입니다:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>React.js:</strong> MIT License
              </li>
              <li>
                <strong>Next.js:</strong> MIT License
              </li>
              <li>
                <strong>Tailwind CSS:</strong> MIT License
              </li>
              <li>
                <strong>Heroicons:</strong> MIT License
              </li>
            </ul>
            <p>
              각 오픈 소스 프로젝트의 라이선스 전문은 해당 프로젝트의 공식 저장소에서
              확인할 수 있습니다.
            </p>
            <p>
              이 웹사이트를 사용함으로써 사용자는 본 사용 약관 및 라이선스 정보에 동의하게
              됩니다. 문의 사항이 있으시면{' '}
              <a href="/contact" className="text-cyan-600 hover:text-cyan-800">
                연락처 페이지
              </a>
              를 통해 저희에게 연락해 주세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
