import Link from "next/link";

export default function About() {
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
              우리의 이야기
            </h1>
            <p className="mt-6 text-lg leading-8">
              English Together는 영어 학습을 새로운 차원으로 끌어올리고자
              탄생했습니다. 우리는 당신이 혼자가 아닌, 함께 학습할 수 있는
              파트너를 찾도록 돕습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            우리의 사명
          </h2>
          <div className="text-center max-w-3xl mx-auto text-lg leading-8 text-black">
            <p>
              우리의 목표는 모든 학습자가 영어를 쉽고 재미있게 배울 수 있도록
              돕는 것입니다. 이를 위해, 우리는 학습자들을 연결하고, 그들이 함께
              공부하며 서로를 지원할 수 있는 플랫폼을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            우리 팀
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                className="mx-auto w-32 h-32 rounded-full mb-4"
                src="/team-member-1.jpg"
                alt="팀원 1"
              />
              <h3 className="text-xl font-semibold text-black">홍길동</h3>
              <p className="text-black">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                className="mx-auto w-32 h-32 rounded-full mb-4"
                src="/team-member-2.jpg"
                alt="팀원 2"
              />
              <h3 className="text-xl font-semibold text-black">김영희</h3>
              <p className="text-black">CTO</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                className="mx-auto w-32 h-32 rounded-full mb-4"
                src="/team-member-3.jpg"
                alt="팀원 3"
              />
              <h3 className="text-xl font-semibold text-black">박철수</h3>
              <p className="text-black">COO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">
            우리와 함께하세요
          </h2>
          <p className="text-lg leading-8 text-black mb-8">
            English Together와 함께 영어 학습의 여정을 시작하세요. 혼자가 아닌,
            같은 목표를 가진 사람들과 함께 배우세요.
          </p>
          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-black bg-blue-500 px-6 py-3 rounded-full"
          >
            지금 가입하기
          </Link>
        </div>
      </section>
    </div>
  );
}
