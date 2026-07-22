export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex items-center gap-3 text-dim font-mono text-sm">
        <span className="w-2 h-2 rounded-sm bg-amber animate-pulse" />
        Loading your dashboard…
      </div>
    </div>
  );
}
