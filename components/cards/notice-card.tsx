import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/types";
import { Pin, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NoticeCardProps {
  notice: Notice;
  groupId: string;
}

export function NoticeCard({ notice, groupId }: NoticeCardProps) {
  return (
    <Link href={`/groups/${groupId}/notices/${notice.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 text-base">
              {notice.title}
            </CardTitle>
            {notice.isPinned && (
              <Badge variant="secondary" className="flex-shrink-0">
                <Pin className="mr-1 h-3 w-3" />
                고정
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="line-clamp-2 text-sm text-foreground/70">
              {notice.content}
            </p>
            <div className="flex items-center justify-between text-xs text-foreground/60">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{notice.author.fullName || notice.author.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(notice.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
}
