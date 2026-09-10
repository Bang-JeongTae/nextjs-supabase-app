import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/cards/notification-item";
import { EmptyState } from "@/components/states";
import { mockNotifications } from "@/lib/mock";
import { CheckCheck } from "lucide-react";

export default function NotificationsPage() {
  const sortedNotifications = [...mockNotifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">알림함</h1>
          {unreadCount > 0 && (
            <p className="mt-2 text-sm text-foreground/60">
              미읽은 알림 {unreadCount}개
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm">
            <CheckCheck className="mr-2 h-4 w-4" />
            모두 읽음
          </Button>
        )}
      </div>

      {sortedNotifications.length === 0 ? (
        <EmptyState
          title="알림이 없습니다"
          description="활동이 있으면 알림을 받습니다"
        />
      ) : (
        <div className="overflow-hidden rounded-lg border">
          {sortedNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
