#!/usr/bin/env bash
# Diagnostic script to verify halalmatches.com deployment

set -e

echo "======================================"
echo "HALALMATCHES.COM DIAGNOSTIC REPORT"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass() {
  echo -e "${GREEN}✓ PASS${NC}: $1"
}

fail() {
  echo -e "${RED}✗ FAIL${NC}: $1"
}

warn() {
  echo -e "${YELLOW}⚠ WARN${NC}: $1"
}

echo "1. DNS RESOLUTION"
echo "---"

# Check apex domain A records
echo "Checking halalmatches.com A records..."
if dig +short halalmatches.com A | grep -q .; then
  IPS=$(dig +short halalmatches.com A | tr '\n' ' ')
  # GitHub Pages IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  if echo "$IPS" | grep -qE "185\.199\.1(08|09|10|11)\.153"; then
    pass "halalmatches.com resolves to GitHub Pages IP(s): $IPS"
  else
    fail "halalmatches.com resolves to non-GitHub IPs: $IPS"
  fi
else
  fail "halalmatches.com has no A records"
fi

# Check www subdomain CNAME
echo "Checking www.halalmatches.com CNAME..."
if dig +short www.halalmatches.com CNAME | grep -q .; then
  CNAME=$(dig +short www.halalmatches.com CNAME)
  if echo "$CNAME" | grep -qE "\.github\.io\.?$"; then
    pass "www.halalmatches.com CNAME points to GitHub Pages: $CNAME"
  else
    warn "www.halalmatches.com CNAME is: $CNAME (expected *.github.io)"
  fi
else
  warn "www.halalmatches.com has no CNAME record"
fi

echo ""
echo "2. HTTPS / REDIRECT CHECK"
echo "---"

# Test apex domain HTTPS
echo "Testing https://halalmatches.com (HEAD)..."
if curl -s -I -m 5 https://halalmatches.com | head -1; then
  STATUS=$(curl -s -I -m 5 https://halalmatches.com | head -1 | awk '{print $2}')
  if [ "$STATUS" = "200" ]; then
    pass "https://halalmatches.com returns 200 OK"
  elif [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
    LOCATION=$(curl -s -I -m 5 https://halalmatches.com | grep -i "^location:" | cut -d' ' -f2- | tr -d '\r\n')
    warn "https://halalmatches.com returns $STATUS redirect to: $LOCATION"
  else
    fail "https://halalmatches.com returns status $STATUS"
  fi
else
  fail "https://halalmatches.com connection failed or timed out"
fi

# Test HTTP redirect to HTTPS
echo "Testing http://halalmatches.com (HEAD)..."
if curl -s -I -m 5 -L http://halalmatches.com 2>&1 | head -1; then
  STATUS=$(curl -s -I -m 5 http://halalmatches.com | head -1 | awk '{print $2}')
  if [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
    LOCATION=$(curl -s -I -m 5 http://halalmatches.com | grep -i "^location:" | cut -d' ' -f2- | tr -d '\r\n')
    if echo "$LOCATION" | grep -q "^https://"; then
      pass "http://halalmatches.com redirects to HTTPS: $LOCATION"
    else
      warn "http redirect is: $LOCATION"
    fi
  else
    warn "http://halalmatches.com returns status $STATUS (expected redirect)"
  fi
else
  fail "http://halalmatches.com connection failed"
fi

# Test www subdomain
echo "Testing https://www.halalmatches.com (HEAD)..."
if curl -s -I -m 5 https://www.halalmatches.com 2>&1 | head -1; then
  STATUS=$(curl -s -I -m 5 https://www.halalmatches.com | head -1 | awk '{print $2}')
  if [ "$STATUS" = "200" ]; then
    pass "https://www.halalmatches.com returns 200 OK"
  elif [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
    LOCATION=$(curl -s -I -m 5 https://www.halalmatches.com | grep -i "^location:" | cut -d' ' -f2- | tr -d '\r\n')
    pass "https://www.halalmatches.com returns $STATUS (redirect to $LOCATION)"
  else
    warn "https://www.halalmatches.com returns status $STATUS"
  fi
else
  fail "https://www.halalmatches.com connection failed"
fi

echo ""
echo "3. SITE CONTENT & ASSETS"
echo "---"

# Check if index.html exists and is accessible
echo "Testing index.html availability..."
if curl -s -I -m 5 https://halalmatches.com/ | grep -q "Content-Type:.*text/html"; then
  pass "https://halalmatches.com/ serves HTML content"
else
  fail "https://halalmatches.com/ does not serve valid HTML (check Content-Type)"
fi

# Quick check for JS assets (basic)
echo "Testing asset loading..."
if curl -s -m 5 https://halalmatches.com/ | grep -q "_next/"; then
  pass "Next.js asset references detected in HTML"
else
  warn "No Next.js assets found in HTML (may indicate build issue)"
fi

echo ""
echo "4. GITHUB PAGES CONFIGURATION"
echo "---"

# Try to fetch robots.txt (helps diagnose if site is being served)
echo "Testing robots.txt..."
if curl -s -m 5 https://halalmatches.com/robots.txt | grep -q "User-agent"; then
  pass "robots.txt exists and is served"
else
  warn "robots.txt not found or is empty (may be expected)"
fi

# Check for 404.html
echo "Testing 404.html handling..."
if curl -s -m 5 -o /dev/null -w "%{http_code}" https://halalmatches.com/nonexistent-page-xyz-test | grep -q "404\|200"; then
  CODE=$(curl -s -m 5 -o /dev/null -w "%{http_code}" https://halalmatches.com/nonexistent-page-xyz-test)
  if [ "$CODE" = "404" ]; then
    pass "404 errors return HTTP 404 status"
  else
    warn "Nonexistent pages return status $CODE (expected 404)"
  fi
else
  fail "Could not check 404 handling"
fi

echo ""
echo "======================================"
echo "DIAGNOSTIC COMPLETE"
echo "======================================"
echo ""
echo "NEXT STEPS:"
echo "1. If DNS failed: Update domain registrar with GitHub Pages A records and CNAME"
echo "2. If HTTPS/redirect failed: Check GitHub Pages settings for custom domain and HTTPS enforcement"
echo "3. If content failed: Check GitHub Actions workflow for build errors"
echo "4. Run 'npm run build' locally and verify './out' directory contains index.html"
