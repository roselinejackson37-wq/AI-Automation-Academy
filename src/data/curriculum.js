// This file is the temporary source of the curriculum content. It exists so
// the dashboard and lesson pages have something real to render in this first
// build phase. In Phase 2 this same shape gets loaded from Firestore instead,
// so it can be edited without touching code — nothing that reads this data
// will need to change when that happens.

export const phases = [
  {
    id: 1,
    name: "Think Like an Automation Architect",
    range: "Weeks 1–4",
    weeks: [
      {
        id: 1,
        title: "Introduction to Automation",
        learn: [
          "Automation vs AI, workflow thinking",
          "Automation maturity & why businesses automate",
          "Case studies of manual-process losses",
        ],
        build: ["Workflow map: Inquiry → Sales → Payment → Onboarding → Support"],
        assignment: "Document one complete workflow from your current workplace.",
      },
      {
        id: 2,
        title: "Systems Thinking",
        learn: ["Process mapping, SOP design", "Bottlenecks & swimlane diagrams"],
        build: ["Redesign a messy business process end to end"],
      },
      {
        id: 3,
        title: "Digital Business Foundations",
        learn: ["CRMs, ERPs, PM tools, knowledge bases", "Comms systems, storage, scheduling"],
        build: ["Digital infrastructure for a startup"],
      },
      {
        id: 4,
        title: "Data Fundamentals",
        learn: ["Records, fields, relationships, keys", "Lookups, rollups, normalization, JSON/APIs"],
        build: ["Database design for a school, clinic, real estate co & agency"],
      },
    ],
  },
  {
    id: 2,
    name: "No-Code Databases & Business Systems",
    range: "Weeks 5–8",
    weeks: [
      {
        id: 5,
        title: "Airtable Masterclass",
        learn: ["Tables, interfaces, forms, views", "Automations, formulas, sync, extensions"],
        build: ["CRM, inventory, HR, finance, content planner"],
      },
      {
        id: 6,
        title: "ClickUp Masterclass",
        learn: ["Spaces, dashboards, custom fields, goals", "Automations, dependencies, whiteboards, AI"],
        build: ["Agency, marketing & ops workspaces, client portal, recruitment system"],
      },
      {
        id: 7,
        title: "Google Workspace Automation",
        learn: ["Forms, Sheets, Docs, Apps Script, Gmail"],
        build: ["Leave requests, invoices, approvals, attendance, recruitment"],
      },
      {
        id: 8,
        title: "Notion Systems",
        learn: ["Knowledge base, CRM, wiki, project tracker"],
        build: ["A full Operations Hub"],
      },
    ],
  },
  {
    id: 3,
    name: "Automation Platforms",
    range: "Weeks 9–12",
    weeks: [
      {
        id: 9,
        title: "Make.com Deep Dive",
        learn: ["Scenarios, routers, iterators, aggregators", "Error handling, scheduling, custom apps"],
        build: ["15 automations"],
      },
      {
        id: 10,
        title: "Zapier",
        learn: ["Filters, paths, loops, tables, storage, AI"],
        build: ["Projects across sales, marketing, HR, CS, finance"],
      },
      {
        id: 11,
        title: "n8n Masterclass",
        learn: ["Self-hosting, nodes, loops, expressions, AI agents"],
        build: ["Recreate all previous automations in n8n"],
      },
      {
        id: 12,
        title: "APIs & Integrations",
        learn: ["REST verbs, OAuth, pagination, Postman testing"],
        build: ["Connect Stripe, HubSpot, OpenAI, ClickUp, Airtable, Google"],
      },
    ],
  },
  {
    id: 4,
    name: "AI Automation",
    range: "Weeks 13–16",
    weeks: [
      {
        id: 13,
        title: "OpenAI API",
        learn: ["Prompt engineering, tokens, embeddings", "Function calling, vision, audio, image generation"],
        build: ["Email writer, meeting summarizer, proposal generator, support bot"],
      },
      {
        id: 14,
        title: "AI Agents",
        learn: ["Agents, tools, memory, planning, MCP, RAG"],
        build: ["Executive assistant, research agent, sales agent, recruiter agent"],
      },
      {
        id: 15,
        title: "Business Automation",
        learn: ["Real systems across 12+ industries"],
        build: ["30 real business automations"],
      },
      {
        id: 16,
        title: "Capstone Project",
        learn: ["Presenting a system, not just building one"],
        build: ["An AI-powered business operating system, designed and presented"],
      },
    ],
  },
];

export function findWeek(phaseId, weekId) {
  const phase = phases.find((p) => p.id === Number(phaseId));
  if (!phase) return null;
  const week = phase.weeks.find((w) => w.id === Number(weekId));
  if (!week) return null;
  return { phase, week };
}
