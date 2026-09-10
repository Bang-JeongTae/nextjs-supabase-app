import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Group } from "@/types";
import { Users, Calendar } from "lucide-react";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="h-full cursor-pointer transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">{group.name}</CardTitle>
          <p className="line-clamp-2 text-sm text-foreground/60">
            {group.description || "설명이 없습니다"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-xs text-foreground/60">
              카테고리: {getCategoryLabel(group.category)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{group.memberCount}명</span>
              </div>
              {group.nextEvent && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">다음 일정</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    swimming: "수영",
    health: "헬스",
    running: "러닝",
    other: "기타",
  };
  return labels[category] || category;
}
