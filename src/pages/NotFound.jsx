import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text font-body flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs text-dim mb-3">404</p>
        <h1 className="font-display text-xl font-semibold mb-6">Page not found</h1>
        <Link to="/dashboard" className="text-amber font-mono text-sm underline">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
