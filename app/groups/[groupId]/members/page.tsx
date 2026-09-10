import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberRow } from "@/components/cards/member-row";
import { mockMembers } from "@/lib/mock";
import { Copy, RotateCw } from "lucide-react";

interface MembersPageProps {
  params: { groupId: string };
}

export default function MembersPage({ params }: MembersPageProps) {
  const { groupId } = params;
  const members = mockMembers.filter((m) => m.groupId === groupId);

  const inviteCode = "run-wed-001";
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/join/${inviteCode}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteUrl);
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* 초대 링크 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>멤버 초대</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">초대 링크</label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={inviteUrl}
                readOnly
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
              />
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-foreground/60">
            이 링크를 공유하면 누구나 모임에 참여할 수 있습니다
          </p>
        </CardContent>
      </Card>

      {/* 멤버 목록 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>멤버 목록 ({members.length}명)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
