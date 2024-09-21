import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const maxVisiblePages = 10 // 최대 표시할 페이지 수

  // 이전 페이지로 이동하는 함수
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  // 다음 페이지로 이동하는 함수
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // 페이지 번호 버튼을 클릭할 때 호출되는 함수
  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  // 페이지 번호 생성 (현재 페이지 기준으로 10개의 페이지를 표시)
  const renderPageNumbers = () => {
    const pageNumbers = []
    const half = Math.floor(maxVisiblePages / 2) // 현재 페이지를 중심으로 앞뒤로 페이지를 나눔
    let startPage = Math.max(currentPage - half, 1) // 시작 페이지 번호 계산
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages) // 마지막 페이지 번호 계산

    // 시작 페이지를 너무 앞으로 맞추면, 뒤쪽의 페이지가 10개를 넘지 않게 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === currentPage
              ? 'bg-cyan-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
          }`}>
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex justify-center mt-8">
      {' '}
      {/* 중앙 정렬 및 마진 추가 */}
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="sr-only">Next</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
