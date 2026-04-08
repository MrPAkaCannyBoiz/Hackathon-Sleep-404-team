#!/usr/bin/env python3
"""Post-creation setup script for the ViaRooms devcontainer."""

import subprocess
import sys
import os


def run(cmd: list[str], check: bool = True, **kwargs) -> subprocess.CompletedProcess:
    print(f"  → {' '.join(cmd)}")
    return subprocess.run(cmd, check=check, **kwargs)


def install_claude_code() -> None:
    print("\n[1/3] Installing Claude Code...")
    # Ensure Node/npm is available via fnm
    env = os.environ.copy()
    fnm_dir = env.get("FNM_DIR", "/usr/local/share/fnm")
    env["PATH"] = f"{fnm_dir}:{env['PATH']}"

    result = run(
        ["npm", "install", "-g", "@anthropic-ai/claude-code"],
        check=False,
        env=env,
    )
    if result.returncode != 0:
        print("  ⚠ Claude Code install failed — skipping")


def install_claude_plugins() -> None:
    print("\n[2/3] Installing Claude Code marketplace plugins...")
    plugins = [
        "anthropics/skills",
        "trailofbits/skills",
        "trailofbits/skills-curated",
    ]
    for plugin in plugins:
        run(["claude", "plugin", "install", plugin], check=False)


def setup_git_delta() -> None:
    print("\n[3/3] Configuring git-delta...")
    run(["git", "config", "--global", "core.pager", "delta"], check=False)
    run(["git", "config", "--global", "interactive.diffFilter", "delta --color-only"], check=False)
    run(["git", "config", "--global", "delta.navigate", "true"], check=False)
    run(["git", "config", "--global", "delta.side-by-side", "true"], check=False)


def merge_zshrc() -> None:
    zshrc_src = "/home/vscode/.zshrc.devcontainer"
    zshrc_dst = os.path.expanduser("~/.zshrc")

    if not os.path.exists(zshrc_src):
        return

    marker = "# === devcontainer ==="
    with open(zshrc_dst, "a") as dst:
        dst.write(f"\n{marker}\n")
        with open(zshrc_src) as src:
            dst.write(src.read())


if __name__ == "__main__":
    print("=== ViaRooms devcontainer post-create setup ===")
    install_claude_code()
    install_claude_plugins()
    setup_git_delta()
    merge_zshrc()
    print("\nDone.")
