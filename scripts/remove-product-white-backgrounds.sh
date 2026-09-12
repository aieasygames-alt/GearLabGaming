#!/usr/bin/env bash
set -euo pipefail

# Convert downloaded product PNGs to transparent PNGs while preserving the subject.
for input in /tmp/product-bg-fix/all/*.png; do
  output="/tmp/product-bg-fix/out/$(basename "$input")"
  magick "$input" -alpha on -fuzz 10% -transparent white -strip -define png:compression-level=9 "$output"
done
