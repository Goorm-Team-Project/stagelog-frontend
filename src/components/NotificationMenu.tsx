import { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu'
import { NotificationService } from '@/services/NotificationService'
import { useNavigate } from 'react-router-dom'

interface Notification {
  notification_id: number
  post_id?: number
  event_id?: number
  type: string
  message: string
  created_at: string
  is_read: boolean
}

interface Props {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  onAllRead: () => void
}

const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토']

export default function NotificationMenu({
  anchorEl,
  open,
  onClose,
  onAllRead,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const navigate = useNavigate()

  /** 📅 날짜 포맷 (12.30(화)) */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekday = WEEKDAY_KR[date.getDay()]

    return `${month}.${day}(${weekday})`
  }

  useEffect(() => {
    if (!open) return

    NotificationService.getNotifications().then(res => {
      setNotifications(res.data.data.notifications)
    })
  }, [open])

  const handleRead = async (id: number) => {
    await NotificationService.markAsRead(id)

    setNotifications(prev =>
      prev.map(n =>
        n.notification_id === id ? { ...n, is_read: true } : n
      )
    )

    if (notifications.every(n => n.notification_id === id || n.is_read)) {
      onAllRead()
    }
  }

  const handleClick = (notification_id: number, post_id?: number) => {
    // TODO: Implement click handling logic
    if (!notifications.find(n => n.notification_id === notification_id)?.is_read) {
      handleRead(notification_id)
    }
    if (post_id) {
      navigate(`/posts/${post_id}`)
    }
  }

  /** 📦 날짜별 그룹핑 */
  const grouped = notifications.reduce((acc, n) => {
    const dateKey = formatDate(n.created_at)
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(n)
    return acc
  }, {} as Record<string, Notification[]>)

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          width: 360,
          maxHeight: 420,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        },
      }}
    >
      <div className="max-h-[420px] overflow-y-auto">
        {Object.keys(grouped).length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            새로운 알림이 없어요
          </div>
        )}

        {Object.entries(grouped).map(([date, list]) => (
          <div key={date}>
            {/* 날짜 헤더 */}
            <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
              {date}
            </div>

            {list.map(notification => (
              <div
                key={notification.notification_id}
                onClick={() => handleClick(notification.notification_id, notification.post_id)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm text-gray-900">
                  {notification.message}
                </span>

                {!notification.is_read && (
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Menu>
  )
}
