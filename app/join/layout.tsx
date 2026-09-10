export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-lg dark:bg-slate-800">
        {children}
      </div>
    </div>
  );
}
