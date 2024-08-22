"use client";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* 좌측: 사이트 이름 */}
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <svg
              className="w-8 h-8 text-cyan-600 dark:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v18l15-9L5 3z"
              ></path>
            </svg>
            <span className="self-center text-2xl font-semibold text-gray-900 dark:text-white">
              English Together
            </span>
          </a>

          {/* 중앙: 링크들 */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="/about-us"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/policy"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/license"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 me-4 md:me-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 구분선 */}
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />

        {/* 저작권 정보 */}
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400">
            English Together™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
