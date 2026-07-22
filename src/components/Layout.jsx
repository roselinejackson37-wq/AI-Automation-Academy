import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body">
      <nav className="sticky top-0 z-50 bg-bg/85 backdrop-blur border-b border-line">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-display font-semibold text-sm">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-amber shadow-[0_0_12px_#FFB454]" />
            AI Automation &amp; Systems Design
          </Link>
          <div className="flex items-center gap-4 text-sm text-dim font-mono">
            {currentUser && <span>{currentUser.email}</span>}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded border border-line hover:border-amber transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
