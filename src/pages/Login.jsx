import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { sendMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendMagicLink(email.trim());
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong sending your link. Please check the email and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 font-display font-semibold text-sm mb-10 justify-center">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-amber shadow-[0_0_12px_#FFB454]" />
          AI Automation &amp; Systems Design
        </div>

        <div className="bg-panel border border-line rounded-lg p-8">
          <h1 className="font-display text-xl font-semibold mb-2">Student sign in</h1>
          <p className="text-sm text-dim mb-6">
            Enter the email you used at checkout. We'll send a sign-in link — no password needed.
          </p>

          {status === "sent" ? (
            <div className="text-sm text-teal font-mono">
              Check your inbox — a sign-in link is on its way to <span className="text-text">{email}</span>.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-panel2 border border-line rounded px-4 py-3 text-sm outline-none focus:border-amber transition-colors"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-amber text-[#1a1204] font-semibold text-sm rounded py-3 hover:brightness-110 transition disabled:opacity-60"
              >
                {status === "sending" ? "Sending link…" : "Send sign-in link"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
            </form>
          )}
        </div>

        <p className="text-xs text-dim font-mono text-center mt-6">
          Haven't enrolled yet? The course is available on Selar.
        </p>
      </div>
    </div>
  );
}
