# fnm (Fast Node Manager)
export FNM_DIR="/usr/local/share/fnm"
if [ -d "$FNM_DIR" ]; then
    export PATH="$FNM_DIR:$PATH"
    eval "$(fnm env --use-on-cd --shell zsh)"
fi

# fzf
[ -f /usr/share/doc/fzf/examples/key-bindings.zsh ] && \
    source /usr/share/doc/fzf/examples/key-bindings.zsh

# git aliases
alias gs="git status"
alias gl="git log --oneline --graph --decorate"
alias gd="git diff"

# Convenience aliases for this project
alias fe="cd /workspaces/Hackathon-Sleep-404-team/frontend"
alias be="cd /workspaces/Hackathon-Sleep-404-team/backend"
alias dev="cd /workspaces/Hackathon-Sleep-404-team/frontend && npm run dev"
alias api="cd /workspaces/Hackathon-Sleep-404-team/backend && dotnet run --project src/ViaRooms.Api"
