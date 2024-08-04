import { Metadata } from "next";
import "../../../styles/globals.css";

export const metadata: Metadata = {
  title: "라이센스",
};

export default function license() {
  return (
    <div>
      {/* Licensing 섹션 */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12">
            라이센스 정책
          </h1>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">소개</h2>
            <p className="mb-6">
              English Together의 라이센스 정책은 소프트웨어와 콘텐츠의 사용
              조건을 정의하며, 사용자에게 제공되는 권리와 제한 사항을
              안내합니다. 이 페이지에서는 우리의 라이센스 정책에 대해
              설명합니다.
            </p>

            <h2 className="text-2xl font-semibold mb-6">소프트웨어 라이센스</h2>
            <p className="mb-6">
              - 사용자는 소프트웨어를 개인적인 용도로만 사용할 수 있습니다.
              <br />
              - 상업적 용도나 배포는 금지됩니다.
              <br />- 소프트웨어를 수정하거나 재배포하는 행위는 허용되지
              않습니다.
            </p>

            <h2 className="text-2xl font-semibold mb-6">콘텐츠 라이센스</h2>
            <p className="mb-6">
              - 제공된 콘텐츠는 비상업적 용도로만 사용해야 합니다.
              <br />
              - 콘텐츠를 복사, 수정 또는 배포하는 것은 금지됩니다.
              <br />- 출처를 명확히 표시해야 하며, 변경된 콘텐츠는 원본과
              구별되도록 해야 합니다.
            </p>

            <h2 className="text-2xl font-semibold mb-6">저작권</h2>
            <p className="mb-6">
              모든 소프트웨어와 콘텐츠는 저작권법에 의해 보호됩니다. 저작권
              침해는 법적 책임을 초래할 수 있습니다.
            </p>

            <h2 className="text-2xl font-semibold mb-6">연락처</h2>
            <p className="mb-6">
              라이센스 정책에 대해 질문이 있으시면, 다음 연락처로 문의해 주세요:
              <a
                href="mailto:support@englishtogether.com"
                className="text-blue-500 hover:underline"
              >
                support@englishtogether.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
