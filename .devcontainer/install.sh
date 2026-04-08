#!/usr/bin/env bash
# CLI helper for the ViaRooms devcontainer — installs the `devc` command.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEVC_BIN="/usr/local/bin/devc"

devc_up() {
    devcontainer up --workspace-folder "$(dirname "$SCRIPT_DIR")"
}

devc_exec() {
    devcontainer exec --workspace-folder "$(dirname "$SCRIPT_DIR")" "$@"
}

devc_rebuild() {
    devcontainer up --workspace-folder "$(dirname "$SCRIPT_DIR")" --remove-existing-container
}

self_install() {
    cat > "$DEVC_BIN" <<'DEVC'
#!/usr/bin/env bash
WORKSPACE_ROOT="$(git -C "$(pwd)" rev-parse --show-toplevel 2>/dev/null || pwd)"
case "${1:-}" in
    up)      devcontainer up --workspace-folder "$WORKSPACE_ROOT" ;;
    rebuild) devcontainer up --workspace-folder "$WORKSPACE_ROOT" --remove-existing-container ;;
    exec)    shift; devcontainer exec --workspace-folder "$WORKSPACE_ROOT" "$@" ;;
    shell)   devcontainer exec --workspace-folder "$WORKSPACE_ROOT" zsh ;;
    *)       echo "Usage: devc {up|rebuild|exec|shell}"; exit 1 ;;
esac
DEVC
    chmod +x "$DEVC_BIN"
    echo "devc installed to $DEVC_BIN"
}

case "${1:-}" in
    up)           devc_up ;;
    exec)         shift; devc_exec "$@" ;;
    rebuild)      devc_rebuild ;;
    self-install) self_install ;;
    *)
        echo "Usage: $(basename "$0") {up|rebuild|exec <cmd>|self-install}"
        exit 1
        ;;
esac
