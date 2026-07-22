import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { phases } from "../data/curriculum";

export default function Dashboard() {
  return (
    <Layout>
      <p className="font-mono text-xs text-teal uppercase tracking-widest mb-2">Your program</p>
      <h1 className="font-display text-3xl font-semibold mb-10">
        AI Automation &amp; Systems Design
      </h1>

      <div className="space-y-10">
        {phases.map((phase) => (
          <div key={phase.id}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">
                Phase {phase.id}: {phase.name}
              </h2>
              <span className="font-mono text-xs text-dim">{phase.range}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phase.weeks.map((week) => (
                <Link
                  key={week.id}
                  to={`/phase/${phase.id}/week/${week.id}`}
                  className="bg-panel border border-line rounded-lg p-5 hover:border-teal transition-colors"
                >
                  <div className="font-mono text-xs text-amber mb-2">WEEK {week.id}</div>
                  <div className="font-semibold text-sm">{week.title}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
