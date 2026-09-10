import { Notification } from "@/types";
import { FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const icon =
    notification.type === "notice" ? (
      <FileText className="h-5 w-5 text-blue-500" />
    ) : (
      <Calendar className="h-5 w-5 text-green-500" />
    );

  return (
    <div
      className={cn(
        "flex cursor-pointer gap-3 border-b p-4 transition-colors hover:bg-foreground/5",
        !notification.isRead && "bg-blue-50 dark:bg-blue-950/20",
      )}
    >
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-sm text-foreground/60">{notification.message}</p>
        <p className="mt-1 text-xs text-foreground/40">
          {formatDate(notification.createdAt)}
        </p>
      </div>
      {!notification.isRead && (
        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
      )}
    </div>
  );
}

function formatDate(date: Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return d.toLocaleDateString("ko-KR");
}
