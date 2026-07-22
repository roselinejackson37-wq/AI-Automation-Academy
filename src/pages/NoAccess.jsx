import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NoAccess() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-display text-xl font-semibold mb-3">No enrollment found</h1>
        <p className="text-sm text-dim mb-6">
          We couldn't find an enrollment for <span className="text-text">{currentUser?.email}</span>.
          If you just purchased the course, this can take a few minutes to sync — otherwise,
          make sure you signed in with the same email you used at checkout.
        </p>
        <button onClick={handleLogout} className="text-sm text-amber font-mono underline">
          Try a different email
        </button>
      </div>
    </div>
  );
}
