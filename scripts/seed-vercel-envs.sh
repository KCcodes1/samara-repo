#!/usr/bin/env bash
set -euo pipefail

# Usage:
# 1) cp .env.production.example .env.production
# 2) Fill values in .env.production (locally, not committed)
# 3) vercel login && vercel link
# 4) bash scripts/seed-vercel-envs.sh

ENV_FILE=".env.production"
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Create it and fill your production values."
  exit 1
fi

# Ensure Vercel CLI is present
if ! command -v vercel >/dev/null 2>&1; then
  echo "ERROR: vercel CLI not found. Install with: npm i -g vercel"
  exit 1
fi

echo "Seeding Vercel Production envs from $ENV_FILE ..."
while IFS='=' read -r key value; do
  # skip blanks and comments
  [[ -z "$key" || "$key" =~ ^# ]] && continue
  name="$(echo "$key" | xargs)"
  val="$(echo "$value" | sed 's/^ *//;s/ *$//' )"
  if [ -z "$val" ]; then
    echo "⚠️  Skipping $name (empty value). Fill it in $ENV_FILE and re-run."
    continue
  fi
  # pipe the value to vercel env add (avoids echoing value in history)
  printf "%s" "$val" | vercel env add "$name" production || true
done < "$ENV_FILE"

echo "✅ Done. Verify in Vercel → Project → Settings → Environment Variables (Production)."
