#!/bin/bash
echo "=== Build started ==="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"

echo "=== Running Next.js build ==="
next build

echo "=== Build complete, checking output ==="
if [ -d "out" ]; then
  echo "✓ 'out' directory exists"
  echo "Contents of 'out' directory:"
  ls -la out/
else
  echo "✗ 'out' directory NOT found"
  echo "Current directory contents:"
  ls -la
fi

if [ -d ".next" ]; then
  echo "✓ '.next' directory exists"
fi

echo "=== Build verification complete ==="
