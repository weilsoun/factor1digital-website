#!/usr/bin/env bash
set -euo pipefail

# -------------------------------------------------------
# Factor1 Digital — BunnyCDN Deploy Script
# Requires: BUNNY_STORAGE_ZONE, BUNNY_API_KEY, BUNNY_PULL_ZONE
# -------------------------------------------------------

# Load .env if present
if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | xargs)
fi

: "${BUNNY_STORAGE_ZONE:?Need BUNNY_STORAGE_ZONE}"
: "${BUNNY_API_KEY:?Need BUNNY_API_KEY}"
: "${BUNNY_PULL_ZONE:?Need BUNNY_PULL_ZONE}"

DIST_DIR=".output/public"
BUNNY_ENDPOINT="https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}"

echo "→ Building static site..."
npm run generate

echo "→ Uploading to BunnyCDN storage zone: ${BUNNY_STORAGE_ZONE}"

find "$DIST_DIR" -type f | while read -r file; do
  remote_path="${file#$DIST_DIR/}"
  echo "  Uploading: $remote_path"
  curl -s -X PUT \
    -H "AccessKey: ${BUNNY_API_KEY}" \
    -H "Content-Type: application/octet-stream" \
    --data-binary "@$file" \
    "${BUNNY_ENDPOINT}/${remote_path}" > /dev/null
done

echo "→ Purging BunnyCDN pull zone cache..."
curl -s -X POST \
  -H "AccessKey: ${BUNNY_API_KEY}" \
  "https://api.bunny.net/pullzone/${BUNNY_PULL_ZONE}/purgeCache" > /dev/null

echo "✓ Deploy complete. Site live on BunnyCDN."
