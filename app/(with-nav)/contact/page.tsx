export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8 bg-white text-black">
        <div className="inset-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 absolute">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              문의하기
            </h1>
            <p className="mt-6 text-lg leading-8">
              궁금한 점이나 제안 사항이 있다면 언제든지 연락주세요. 우리의 팀이
              신속하게 응답해드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            연락하기
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-black"
              >
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                placeholder="여기에 메시지를 작성하세요."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                메시지 보내기
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-md mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">연락처 정보</h2>
          <p className="text-lg leading-8 text-black mb-6">
            직접 연락하고 싶다면 아래 정보를 참고해주세요:
          </p>
          <div className="space-y-4 text-lg leading-7 text-black">
            <p>이메일: support@englishtogether.com</p>
            <p>전화: +82 10-1234-5678</p>
            <p>주소: 서울특별시 강남구 테헤란로 123, 5층</p>
          </div>
        </div>
      </section>
    </div>
  );
}
