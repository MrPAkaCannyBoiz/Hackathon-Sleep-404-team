#!/usr/bin/env bash
# Start the API only
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Starting ViaRooms API..."
cd "$ROOT/backend"
dotnet run --project src/ViaRooms.Api -c Release
