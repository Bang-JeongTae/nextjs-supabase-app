import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Calendar } from "lucide-react";

export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  const { groupId } = params;

  return (
    <div className="space-y-6">
      {/* 모임 정보 헤더 */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-foreground">모임 이름</h1>
          <p className="mt-2 text-sm text-foreground/60">
            카테고리: 헬스 • 멤버: 15명
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="container mx-auto max-w-6xl px-4">
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notices" asChild>
              <Link
                href={`/groups/${groupId}`}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">공지</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="events" asChild>
              <Link
                href={`/groups/${groupId}/events`}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">일정</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="members" asChild>
              <Link
                href={`/groups/${groupId}/members`}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">멤버</span>
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notices" className="mt-6">
            {children}
          </TabsContent>
          <TabsContent value="events" className="mt-6">
            {children}
          </TabsContent>
          <TabsContent value="members" className="mt-6">
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
