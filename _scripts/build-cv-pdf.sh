#!/bin/sh
# Regenerates resume/cv.pdf from resume/index.html using its print stylesheet.
# Needs a Chromium-based browser; set BROWSER to override the default (Brave).
set -eu
cd "$(dirname "$0")/.."
BROWSER="${BROWSER:-/Applications/Brave Browser.app/Contents/MacOS/Brave Browser}"
"$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/resume/cv.pdf" "file://$PWD/resume/index.html"
pdfinfo resume/cv.pdf | grep Pages
