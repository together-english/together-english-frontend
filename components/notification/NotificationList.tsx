'use client'

import React, {useEffect, useRef} from 'react'
import useSWRInfinite from 'swr/infinite'
import {getWithJwt} from '@/server'

interface Notification {
  id: string
  message: string
  viewed: boolean
  createdAt: string
}

interface NotificationPageResponse {
  notifications: Notification[]
  lastCreatedAt: string | null
  hasNext: boolean
}

interface MainResponse<T> {
  data: T
  message: string
  status: number
}

// Throttle utility function
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }
}

const fetcher = async (url: string): Promise<NotificationPageResponse> => {
  const response = await getWithJwt(url)
  const data: MainResponse<NotificationPageResponse> = await response.json()
  console.log('API Response:', {
    url,
    hasNext: data.data.hasNext,
    lastCreatedAt: data.data.lastCreatedAt,
    notificationCount: data.data.notifications.length,
    timestamp: new Date().toISOString()
  })
  return data.data
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

const NotificationList: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const isFetchingRef = useRef(false)

  const getKey = (
    pageIndex: number,
    previousPageData: NotificationPageResponse | null
  ) => {
    if (previousPageData && !previousPageData.hasNext) {
      console.log('No more pages, hasNext is false')
      return null
    }
    const lastCreatedAt =
      previousPageData?.lastCreatedAt ||
      (previousPageData?.notifications.length
        ? previousPageData.notifications[previousPageData.notifications.length - 1]
            .createdAt
        : null)
    const params = new URLSearchParams({
      size: '10',
      ...(lastCreatedAt && {lastCreatedAt})
    })
    const key = `/notification?${params.toString()}`
    console.log('getKey:', {
      pageIndex,
      lastCreatedAt,
      key,
      timestamp: new Date().toISOString()
    })
    return key
  }

  const {data, error, size, setSize, isLoading, isValidating} =
    useSWRInfinite<NotificationPageResponse>(getKey, fetcher, {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      dedupingInterval: 2000 // Prevent duplicate requests for the same key within 2 seconds
    })

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Throttled setSize function
    const throttledSetSize = throttle((newSize: number) => {
      if (isFetchingRef.current || isLoading || isValidating) {
        console.log('Skipping setSize: request in progress', {
          isFetching: isFetchingRef.current,
          isLoading,
          isValidating,
          newSize
        })
        return
      }
      console.log('Throttled setSize called, new size:', newSize, {
        timestamp: new Date().toISOString()
      })
      isFetchingRef.current = true
      setSize(newSize)
        .then(() => {
          isFetchingRef.current = false
        })
        .catch(err => {
          console.error('setSize error:', err)
          isFetchingRef.current = false
        })
      observerRef.current?.disconnect()
    }, 500)

    observerRef.current = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          !isValidating &&
          !isFetchingRef.current &&
          data?.[data.length - 1]?.hasNext
        ) {
          console.log('IntersectionObserver triggered, calling throttled setSize', {
            timestamp: new Date().toISOString()
          })
          throttledSetSize(size + 1)
        } else {
          console.log('IntersectionObserver skipped:', {
            isIntersecting: entries[0].isIntersecting,
            isLoading,
            isValidating,
            isFetching: isFetchingRef.current,
            hasNext: data?.[data.length - 1]?.hasNext,
            timestamp: new Date().toISOString()
          })
        }
      },
      {threshold: 0.1}
    )

    if (loadMoreRef.current && !isFetchingRef.current && !isLoading && !isValidating) {
      observerRef.current.observe(loadMoreRef.current)
      console.log('Observing loadMoreRef', {timestamp: new Date().toISOString()})
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        console.log('Disconnected observer', {timestamp: new Date().toISOString()})
      }
    }
  }, [isLoading, isValidating, size, setSize, data])

  const notifications = data ? data.flatMap(page => page.notifications) : []
  const hasUnread = notifications.some(notification => !notification.viewed)

  if (error)
    return <div className="p-4 text-red-500">알림을 불러오는데 실패했습니다.</div>
  if (!data && isLoading) return <div className="p-4">로딩 중...</div>

  return (
    <div className="w-80 max-h-[400px] overflow-y-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">알림</h3>
      </div>
      {notifications.length === 0 ? (
        <div className="p-4 text-gray-500">새로운 알림이 없습니다.</div>
      ) : (
        <ul className="divide-y">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className={`p-4 ${notification.viewed ? 'bg-white' : 'bg-blue-50'}`}>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(new Date(notification.createdAt))}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div ref={loadMoreRef} className="h-10" />
      {(isLoading || isValidating) && (
        <div className="p-4 text-center">추가 알림 로딩 중...</div>
      )}
    </div>
  )
}

export default NotificationList
