import { Button } from "@/components/ui/button";
import { NoticeCard } from "@/components/cards/notice-card";
import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/states";
import { mockNotices, mockEvents } from "@/lib/mock";
import { Plus, FileText, Calendar } from "lucide-react";
import Link from "next/link";

interface GroupPageProps {
  params: { groupId: string };
}

export default function GroupPage({ params }: GroupPageProps) {
  const { groupId } = params;
  const notices = mockNotices.filter((n) => n.groupId === groupId);
  const events = mockEvents.filter((e) => e.groupId === groupId);

  return (
    <div className="container mx-auto max-w-4xl space-y-12 px-4 py-8">
      {/* 공지 섹션 */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-2xl font-bold">공지사항</h2>
          </div>
          <Link href={`/groups/${groupId}/notices/new`}>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              작성
            </Button>
          </Link>
        </div>

        {notices.length === 0 ? (
          <EmptyState
            title="공지사항이 없습니다"
            action={{
              label: "첫 공지 작성하기",
              href: `/groups/${groupId}/notices/new`,
            }}
          />
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} groupId={groupId} />
            ))}
          </div>
        )}
      </section>

      {/* 일정 섹션 */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h2 className="text-2xl font-bold">다가오는 일정</h2>
          </div>
          <Link href={`/groups/${groupId}/events/new`}>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              생성
            </Button>
          </Link>
        </div>

        {events.length === 0 ? (
          <EmptyState
            title="예정된 일정이 없습니다"
            action={{
              label: "일정 만들기",
              href: `/groups/${groupId}/events/new`,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} groupId={groupId} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
