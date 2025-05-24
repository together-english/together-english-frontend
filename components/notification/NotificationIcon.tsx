import React from 'react'
import {Bell} from 'lucide-react'

interface NotificationIconProps {
  onClick: () => void
  hasUnread: boolean
}

const NotificationIcon: React.FC<NotificationIconProps> = ({onClick, hasUnread}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      aria-label="Notifications">
      <Bell size={24} />
      {hasUnread && (
        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500" />
      )}
    </button>
  )
}

export default NotificationIcon
