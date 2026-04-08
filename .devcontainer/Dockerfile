FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# System dependencies + network isolation tools + C/IoT toolchain
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    ripgrep \
    fd-find \
    fzf \
    tmux \
    iptables \
    ipset \
    gcc \
    g++ \
    make \
    cmake \
    ninja-build \
    pkg-config \
    gdb \
    gcc-arm-none-eabi \
    binutils-arm-none-eabi \
    libnewlib-arm-none-eabi \
    libnewlib-dev \
    libstdc++-arm-none-eabi-newlib \
    openocd \
    minicom \
    usbutils \
    && rm -rf /var/lib/apt/lists/*

# git-delta
RUN DELTA_VERSION=0.18.2 && \
    curl -fsSL "https://github.com/dandavison/delta/releases/download/${DELTA_VERSION}/git-delta_${DELTA_VERSION}_amd64.deb" -o /tmp/delta.deb && \
    dpkg -i /tmp/delta.deb && rm /tmp/delta.deb

# uv (Python package manager + Python 3.13)
RUN curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR=/usr/local sh && \
    uv python install 3.13 --default

# PlatformIO CLI (latest LTS)
RUN uv tool install platformio
ENV PATH="/root/.local/bin:${PATH}"

# fnm (Fast Node Manager) + Node 22
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir /usr/local/share/fnm --skip-shell && \
    /usr/local/share/fnm/fnm install 22 && \
    /usr/local/share/fnm/fnm default 22

ENV FNM_DIR=/usr/local/share/fnm
ENV PATH="${FNM_DIR}:${PATH}"

# ast-grep (via npm — official distribution method)
RUN /usr/local/share/fnm/fnm exec --using 22 npm install -g @ast-grep/cli

# Post-install script
COPY post_install.py /opt/post_install.py
RUN chmod +x /opt/post_install.py

# Copy shell config
COPY .zshrc /home/vscode/.zshrc.devcontainer

USER vscode
