import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { findWeek } from "../data/curriculum";

export default function Lesson() {
  const { phaseId, weekId } = useParams();
  const result = findWeek(phaseId, weekId);

  if (!result) {
    return (
      <Layout>
        <p className="text-dim">That week couldn't be found.</p>
        <Link to="/dashboard" className="text-amber font-mono text-sm underline">
          Back to dashboard
        </Link>
      </Layout>
    );
  }

  const { phase, week } = result;

  return (
    <Layout>
      <Link to="/dashboard" className="text-xs font-mono text-dim hover:text-teal">
        ← Back to dashboard
      </Link>

      <p className="font-mono text-xs text-teal uppercase tracking-widest mt-6 mb-2">
        Phase {phase.id} · Week {week.id}
      </p>
      <h1 className="font-display text-2xl font-semibold mb-8">{week.title}</h1>

      <div className="bg-panel border border-line rounded-lg p-6 mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wide text-dim mb-3">Learn</h3>
        <ul className="space-y-2">
          {week.learn.map((item, i) => (
            <li key={i} className="text-sm pl-4 relative">
              <span className="absolute left-0 text-amber">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-panel border border-line rounded-lg p-6 mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wide text-dim mb-3">Build</h3>
        <ul className="space-y-2">
          {week.build.map((item, i) => (
            <li key={i} className="text-sm pl-4 relative">
              <span className="absolute left-0 text-amber">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {week.assignment && (
        <div className="bg-panel2 border border-line rounded-lg p-6">
          <h3 className="font-mono text-xs uppercase tracking-wide text-dim mb-3">Assignment</h3>
          <p className="text-sm">{week.assignment}</p>
        </div>
      )}
    </Layout>
  );
}
