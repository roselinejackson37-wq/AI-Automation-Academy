import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyAccess() {
  const { completeSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    completeSignIn(window.location.href)
      .then(() => navigate("/dashboard", { replace: true }))
      .catch((err) => {
        console.error(err);
        setError("This sign-in link is invalid or has expired. Please request a new one.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text font-body flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        {error ? (
          <>
            <p className="text-sm text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-amber font-mono underline"
            >
              Back to sign in
            </button>
          </>
        ) : (
          <p className="text-sm text-dim font-mono">Signing you in…</p>
        )}
      </div>
    </div>
  );
}
