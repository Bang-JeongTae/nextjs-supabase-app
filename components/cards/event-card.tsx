import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types";
import { MapPin, Clock, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
  groupId: string;
}

export function EventCard({ event, groupId }: EventCardProps) {
  const isFull = event.attendingCount >= event.capacity;

  return (
    <Link href={`/groups/${groupId}/events/${event.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-base">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {event.description && (
              <p className="line-clamp-2 text-sm text-foreground/70">
                {event.description}
              </p>
            )}
            <div className="space-y-2 text-sm text-foreground/60">
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{formatDateTime(event.startAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {event.attendingCount}/{event.capacity}
                  </span>
                </div>
                {isFull && (
                  <span className="text-xs font-medium text-red-600">만석</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function formatDateTime(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
