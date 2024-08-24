"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts"; // 사용자 인증 상태를 관리하는 훅

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { loggedUser, logout } = useAuth();

  const getLinkClassName = (linkPath: string) => {
    const isActive = path === linkPath;
    return `text-gray-900 hover:text-cyan-600 ${
      isActive ? "text-cyan-600" : ""
    }`;
  };

  const handleGetStartedClick = () => {
    router.push("/login");
  };

  const onClickLogOut = () => {
    logout(() => {
      router.push("/");
    });
  };

  return (
    <header className=" bg-white/30 border-b border-gray-200 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center">
            <span className="sr-only">English Together</span>
            <svg
              className="w-8 h-8 text-cyan-600"
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
            <span className="text-2xl font-semibold text-gray-900 ml-3">
              English Together
            </span>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold ${getLinkClassName(item.href)}`} // font-semibold로 변경
              aria-current={path === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!loggedUser ? (
            <button
              type="button"
              onClick={handleGetStartedClick}
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              시작하기
            </button>
          ) : (
            <button
              type="button"
              onClick={onClickLogOut}
              className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              로그아웃
            </button>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
          >
            <span className="sr-only">메뉴 열기</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-0 z-50 bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <span className="sr-only">English Together</span>
              <svg
                className="w-8 h-8 text-cyan-600"
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
              <span className="text-2xl font-semibold text-gray-900 ml-3">
                English Together
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700"
            >
              <span className="sr-only">메뉴 닫기</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 ${
                    path === item.href ? "bg-gray-100" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              {!loggedUser ? (
                <button
                  type="button"
                  onClick={handleGetStartedClick}
                  className="block w-full text-center bg-cyan-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-cyan-700"
                >
                  시작하기
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClickLogOut}
                  className="block w-full text-center bg-red-600 text-white rounded-lg px-3 py-2 text-base font-semibold hover:bg-red-700"
                >
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
