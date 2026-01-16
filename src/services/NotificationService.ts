import httpService from "./httpService"

export const NotificationService = {
    // 알림 목록 조회
    getNotifications: () => {
        return httpService.get('/notifications')
    },

    // 알림 읽음 처리
    markAsRead: (notificationId: number) => {
        return httpService.post(`/notifications/${notificationId}/read`)
    },

    // 알림 여부 조회
    checkNotification: () => {
        return httpService.get(`/notifications/check`)
    }
}