"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h1 className="text-lg font-bold text-red-900">오류가 발생했습니다</h1>
        <p className="mt-2 text-sm text-red-700">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
