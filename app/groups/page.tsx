import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GroupCard } from "@/components/cards/group-card";
import { EmptyState } from "@/components/states";
import { mockGroups } from "@/lib/mock";
import { Plus } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">내 모임</h1>
          <p className="mt-2 text-foreground/60">
            가입한 모임을 한눈에 확인하세요
          </p>
        </div>
        <Link href="/groups/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />새 모임 만들기
          </Button>
        </Link>
      </div>

      {mockGroups.length === 0 ? (
        <EmptyState
          title="가입한 모임이 없습니다"
          description="새로운 모임을 만들거나 초대를 받아 모임에 참여해보세요"
          action={{ label: "모임 만들기", href: "/groups/new" }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
