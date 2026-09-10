import { Member } from "@/types";
import { Badge } from "@/components/ui/badge";

interface MemberRowProps {
  member: Member;
  onRemove?: (memberId: string) => void;
}

export function MemberRow({ member, onRemove }: MemberRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-foreground/5">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-medium text-white">
          {(member.user.fullName || member.user.email)[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {member.user.fullName || member.user.email}
          </p>
          <p className="text-xs text-foreground/60">
            가입일: {new Date(member.joinedAt).toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={member.role === "owner" ? "default" : "secondary"}>
          {member.role === "owner" ? "주최자" : "멤버"}
        </Badge>
        {onRemove && member.role !== "owner" && (
          <button
            onClick={() => onRemove(member.id)}
            className="text-xs font-medium text-red-600 hover:text-red-700"
          >
            제거
          </button>
        )}
      </div>
    </div>
  );
}
