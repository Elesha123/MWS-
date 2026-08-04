# Ads Analyst

A private, self-contained tool for making Google Ads decisions from your own account
data — no API keys, no server, no external consultant. Everything runs client-side in
your browser; nothing you upload ever leaves your machine.

## How it works

1. **Export CSV reports from Google Ads** (see below for exactly which ones and how).
2. **Drop them into the tool.** It auto-detects the report type from the column
   headers.
3. **State a goal or pick one of the preset chips** — "find wasted spend," "why did
   performance drop," etc. The tool checks whether it has the data it needs; if not,
   it tells you exactly which report to export.
4. Read the findings, each with the specific rows behind the number and concrete
   recommended actions. Click **Full account audit** to run every playbook your
   current uploads support at once.

## Which reports to export, and how

Google Ads UI, left nav, then:

- **Search Terms** — Campaigns → Search keywords → **Search terms** tab → download
  icon → CSV.
- **Keywords (for Quality Score)** — Campaigns → **Search keywords**. Click
  **Columns → Modify columns → Quality Score** and add Quality Score, Expected CTR,
  Ad relevance, Landing page experience (not shown by default) → CSV.
- **Campaigns (for budget / impression share / ROAS)** — **Campaigns** table. Click
  **Columns → Modify columns → Competitive metrics** and add Search impr. share,
  Search lost IS (budget), Search lost IS (rank). Add Conv. value under Attribution
  for ROAS → CSV.
- **Ads** — Ads & assets → Ads. Ad strength is a default column → CSV.
- **Trend / day-by-day** — same as Campaigns, but click **Segment → Time → Day**
  first.

The in-tool help panel ("Which reports do I export, and how?") has the same
instructions for quick reference while you work.

## Deploying

This is a single static file with no build step, same as the rest of this repo.
Deploy it anywhere that serves static files — Netlify, Vercel, Cloudflare Pages,
or just open `index.html` directly in a browser. Point the host at this
`ads-analyzer/` folder (or its `index.html`) rather than the repo root, so it
doesn't collide with the Putt to Win game at `/`.

## Privacy

All parsing and analysis happens in JavaScript in your browser tab. No network
requests are made, no data is stored beyond the current page session, and
refreshing the page clears everything.
