import { Badge } from "@/components/ui/badge";
import { RsvpStatus, MemberRole } from "@/types";
import { Pin, Check, X, Clock, Shield, Users } from "lucide-react";

export function PinnedBadge() {
  return (
    <Badge variant="secondary" className="gap-1">
      <Pin className="h-3 w-3" />
      고정
    </Badge>
  );
}

interface RsvpStatusBadgeProps {
  status: RsvpStatus;
}

type BadgeVariant = "default" | "secondary" | "outline";

export function RsvpStatusBadge({ status }: RsvpStatusBadgeProps) {
  const variants: Record<
    RsvpStatus,
    {
      label: string;
      variant: BadgeVariant;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    [RsvpStatus.ATTENDING]: {
      label: "참석",
      variant: "default",
      icon: Check,
    },
    [RsvpStatus.NOT_ATTENDING]: {
      label: "불참",
      variant: "secondary",
      icon: X,
    },
    [RsvpStatus.WAITLIST]: {
      label: "대기",
      variant: "outline",
      icon: Clock,
    },
  };

  const { label, variant, icon: Icon } = variants[status];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}

interface CapacityIndicatorProps {
  current: number;
  capacity: number;
  waitlist?: number;
}

export function CapacityIndicator({
  current,
  capacity,
  waitlist = 0,
}: CapacityIndicatorProps) {
  const isFull = current >= capacity;
  const percentage = Math.min((current / capacity) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">정원 현황</span>
        <span className="text-foreground/60">
          {current}/{capacity}
          {waitlist > 0 && ` (대기 ${waitlist})`}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface RoleBadgeProps {
  role: MemberRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge
      variant={role === MemberRole.OWNER ? "default" : "secondary"}
      className="gap-1"
    >
      {role === MemberRole.OWNER ? (
        <>
          <Shield className="h-3 w-3" />
          주최자
        </>
      ) : (
        <>
          <Users className="h-3 w-3" />
          멤버
        </>
      )}
    </Badge>
  );
}
