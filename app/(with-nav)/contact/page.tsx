import { Metadata } from "next";
import "../../../styles/globals.css";

export const metadata: Metadata = {
  title: "연락",
};

export default function Contact() {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12">문의하기</h1>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">연락처</h2>
            <p className="mb-6">
              English Together에 문의하시려면 다음의 연락처를 이용해 주세요:
            </p>
            <ul className="list-disc list-inside mb-6">
              <li>
                <strong>이메일:</strong>{" "}
                <a
                  href="mailto:support@englishtogether.com"
                  className="text-blue-500 hover:underline"
                >
                  support@englishtogether.com
                </a>
              </li>
              <li>
                <strong>전화:</strong> +82 10-1234-5678
              </li>
              <li>
                <strong>주소:</strong> 서울특별시 강남구 역삼동 123-45
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-6">
              자주 묻는 질문 (FAQ)
            </h2>
            <ul className="list-disc list-inside mb-6">
              <li>
                <strong>
                  회원 가입에 문제가 있습니다. 어떻게 해야 하나요?
                </strong>{" "}
                <br />
                회원 가입 문제에 대한 지원은{" "}
                <a
                  href="mailto:support@englishtogether.com"
                  className="text-blue-500 hover:underline"
                >
                  이메일
                </a>
                을 통해 문의해 주세요.
              </li>
              <li>
                <strong>
                  서비스 이용 중 기술적인 문제가 발생했습니다. 어떻게
                  해결하나요?
                </strong>{" "}
                <br />
                기술적 문제에 대해서는{" "}
                <a
                  href="mailto:support@englishtogether.com"
                  className="text-blue-500 hover:underline"
                >
                  이메일
                </a>
                을 통해 지원을 요청해 주세요.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-6">피드백</h2>
            <p className="mb-6">
              사용 경험이나 개선 사항에 대한 피드백은 언제든지 환영합니다.{" "}
              <a
                href="mailto:feedback@englishtogether.com"
                className="text-blue-500 hover:underline"
              >
                feedback@englishtogether.com
              </a>
              으로 보내 주세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
