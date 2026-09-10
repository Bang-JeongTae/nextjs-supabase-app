"use client";

import Link from "next/link";
import { LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { logout } from "@/lib/auth-actions";
import { useTransition } from "react";

interface GlobalHeaderProps {
  userName?: string;
  unreadNotifications?: number;
}

export function GlobalHeader({
  userName = "사용자",
  unreadNotifications = 0,
}: GlobalHeaderProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* 로고 및 앱 타이틀 */}
        <Link href="/groups" className="flex items-center gap-2 font-bold">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600" />
          <span>모임 관리</span>
        </Link>

        {/* 중앙 네비게이션 */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/groups"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            내 모임
          </Link>
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-4">
          {/* 알림 벨 */}
          <Link href="/notifications" className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {unreadNotifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center p-0 text-xs"
              >
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </Badge>
            )}
          </Link>

          {/* 테마 전환 */}
          <ThemeSwitcher />

          {/* 사용자 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {userName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/settings">설정</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isPending}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
