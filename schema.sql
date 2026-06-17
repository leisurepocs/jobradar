-- JobRadar — Supabase Schema
-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste → Run

-- App state (single persistent row)
CREATE TABLE IF NOT EXISTS app_state (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  data        JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
-- Seed the row so upserts always have something to merge into
INSERT INTO app_state (id, data) VALUES (1, '{}') ON CONFLICT (id) DO NOTHING;

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  event_type  TEXT NOT NULL,
  payload     JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_activity_log_created_at  ON activity_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_event_type  ON activity_log (event_type);

-- Event types logged:
--   scan_complete        — every /search call: query, location, results count, duration_ms
--   brief_generated      — every /brief call: title, company, score
--   brief_opened         — client-side: user opened a brief panel
--   status_changed       — client-side: job status updated (jobId, status)
--   weekly_report_generated — /logs/weekly called
--   error                — any server-side error: endpoint, message
