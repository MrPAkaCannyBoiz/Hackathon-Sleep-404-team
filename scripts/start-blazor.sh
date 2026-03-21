#!/usr/bin/env bash
# Start the API + Blazor web app in parallel
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cleanup() {
  echo ""
  echo "Stopping all processes..."
  kill "$API_PID" "$BLAZOR_PID" 2>/dev/null
  wait "$API_PID" "$BLAZOR_PID" 2>/dev/null
  echo "Done."
}
trap cleanup INT TERM

echo "Starting ViaRooms API..."
cd "$ROOT/backend"
dotnet run --project src/ViaRooms.Api -c Release &
API_PID=$!

echo "Starting ViaRooms Blazor web..."
cd "$ROOT/backend"
dotnet run --project src/ViaRooms.Web -c Release &
BLAZOR_PID=$!

echo ""
echo "Both processes running. Press Ctrl+C to stop."
echo "  API PID:    $API_PID"
echo "  Blazor PID: $BLAZOR_PID"

wait "$API_PID" "$BLAZOR_PID"
