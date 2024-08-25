export default function PrivacyPolicy() {
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
              개인정보 보호정책
            </h1>
            <p className="mt-6 text-lg leading-8">
              저희 웹사이트에서 수집하는 개인정보와 그 정보를 사용하는 방법에 대해
              알아보세요. 우리는 사용자의 개인정보 보호를 최우선으로 생각합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Information Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            개인정보 보호정책
          </h2>
          <div className="space-y-6 text-black leading-8">
            <p>
              저희 웹사이트는 사용자의 개인정보 보호를 매우 중요하게 생각합니다. 이
              개인정보 보호정책은 저희가 어떻게 정보를 수집하고 사용하며 보호하는지를
              설명합니다.
            </p>
            <h3 className="text-2xl font-semibold">1. 수집하는 정보</h3>
            <p>
              저희는 사용자가 웹사이트를 사용할 때 제공하는 개인정보(예: 이름, 이메일
              주소)와 자동으로 수집되는 정보(예: IP 주소, 브라우저 유형)를 수집할 수
              있습니다.
            </p>
            <h3 className="text-2xl font-semibold">2. 정보의 사용</h3>
            <p>
              수집된 정보는 사용자 경험을 향상시키고, 서비스 개선 및 커뮤니케이션을 위해
              사용됩니다. 또한 법적 요구 사항을 준수하기 위해 사용할 수도 있습니다.
            </p>
            <h3 className="text-2xl font-semibold">3. 정보의 공유</h3>
            <p>
              저희는 사용자의 동의 없이 제3자와 개인정보를 공유하지 않습니다. 단, 법적
              요구 사항에 따라 필요한 경우 또는 서비스 제공을 위해 신뢰할 수 있는 파트너와
              정보를 공유할 수 있습니다.
            </p>
            <h3 className="text-2xl font-semibold">4. 정보의 보안</h3>
            <p>
              저희는 사용자의 개인정보를 보호하기 위해 적절한 보안 조치를 시행하고
              있습니다. 그러나 인터넷을 통한 정보 전송은 완전히 안전하지 않다는 점을
              유의해 주세요.
            </p>
            <h3 className="text-2xl font-semibold">5. 쿠키 사용</h3>
            <p>
              저희 웹사이트는 사용자 경험을 개선하기 위해 쿠키를 사용할 수 있습니다.
              쿠키는 사용자의 브라우저에 저장되는 작은 텍스트 파일로, 웹사이트 기능을
              향상시키는 데 도움을 줍니다.
            </p>
            <h3 className="text-2xl font-semibold">6. 사용자 권리</h3>
            <p>
              사용자는 자신의 개인정보에 접근하고 수정하며 삭제할 권리를 가집니다. 이와
              관련된 요청은 언제든지 저희에게 연락해 주시기 바랍니다.
            </p>
            <h3 className="text-2xl font-semibold">7. 정책의 변경</h3>
            <p>
              저희는 필요에 따라 이 개인정보 보호정책을 변경할 수 있으며, 변경 사항은
              웹사이트에 게시됩니다. 사용자는 변경된 정책을 주기적으로 확인해 주시기
              바랍니다.
            </p>
            <p>
              이 개인정보 보호정책에 대한 질문이나 우려 사항이 있으시면{' '}
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
