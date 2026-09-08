import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/protected";

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // 콜백 성공 - 지정된 경로로 리다이렉트
      redirect(next);
    } else {
      // 콜백 실패 - 에러 페이지로 리다이렉트
      redirect(`/auth/error?error=${encodeURIComponent(error?.message)}`);
    }
  }

  // code가 없는 경우 - 에러 페이지로 리다이렉트
  redirect(`/auth/error?error=${encodeURIComponent("인증 코드가 없습니다")}`);
}
