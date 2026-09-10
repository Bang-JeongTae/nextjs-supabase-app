import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockGroups } from "@/lib/mock";

interface JoinPageProps {
  params: { inviteCode: string };
}

export default function JoinPage({ params }: JoinPageProps) {
  const { inviteCode } = params;
  const group = mockGroups.find((g) => g.inviteCode === inviteCode);

  if (!group) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">
              유효하지 않은 초대 링크
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/60">
              이 초대 링크는 유효하지 않거나 만료되었습니다.
            </p>
            <Button className="mt-4" variant="outline" disabled>
              모임 참여
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
          <CardDescription>{group.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium">카테고리</span>
            <p className="mt-1 text-sm text-foreground/60">
              {group.category === "running" && "러닝"}
              {group.category === "health" && "헬스"}
              {group.category === "swimming" && "수영"}
              {group.category === "other" && "기타"}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium">멤버 수</span>
            <p className="mt-1 text-sm text-foreground/60">
              {group.memberCount}명
            </p>
          </div>
          <div className="space-y-3 pt-4">
            <Button className="w-full">모임 참여하기</Button>
            <p className="text-center text-xs text-foreground/60">
              로그인 후 참여할 수 있습니다
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
