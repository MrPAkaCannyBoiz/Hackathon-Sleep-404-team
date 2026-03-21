#!/usr/bin/env bash
# Start the API (backend) + React dev server (frontend) in parallel
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cleanup() {
  echo ""
  echo "Stopping all processes..."
  kill "$API_PID" "$REACT_PID" 2>/dev/null
  wait "$API_PID" "$REACT_PID" 2>/dev/null
  echo "Done."
}
trap cleanup INT TERM

echo "Starting ViaRooms API..."
cd "$ROOT/backend"
dotnet run --project src/ViaRooms.Api -c Release &
API_PID=$!

echo "Starting React dev server..."
cd "$ROOT/frontend"
npm run dev &
REACT_PID=$!

echo ""
echo "Both processes running. Press Ctrl+C to stop."
echo "  API PID:   $API_PID"
echo "  React PID: $REACT_PID"

wait "$API_PID" "$REACT_PID"
