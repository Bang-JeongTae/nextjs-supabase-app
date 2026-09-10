"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockEvents } from "@/lib/mock";

interface PublicRsvpPageProps {
  params: { publicToken: string };
}

export default function PublicRsvpPage({ params }: PublicRsvpPageProps) {
  const { publicToken } = params;
  const event = mockEvents.find((e) => e.publicToken === publicToken);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "attending",
  });

  if (!event) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">
            유효하지 않은 RSVP 링크
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/60">
            이 RSVP 링크는 유효하지 않거나 만료되었습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">감사합니다!</CardTitle>
          <CardDescription>RSVP가 등록되었습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/60">
            {event.title}에 대한 응답이 저장되었습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {new Date(event.startAt).toLocaleDateString("ko-KR", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitted(true);
          }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              이름 *
            </Label>
            <Input
              id="name"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              연락처 (선택)
            </Label>
            <Input
              id="phone"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              참석 여부 *
            </Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="mt-2 w-full rounded-lg border bg-background px-3 py-2"
            >
              <option value="attending">참석</option>
              <option value="not_attending">불참</option>
            </select>
          </div>

          <Button type="submit" className="w-full">
            응답 제출
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
