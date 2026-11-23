#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Execute com sudo: sudo ./install-fcc.sh" >&2
  exit 1
fi

if [[ "$(uname -m)" != "aarch64" && "$(uname -m)" != "arm64" ]]; then
  echo "Este instalador foi preparado para Ubuntu ARM64 (Ampere A1). Arquitetura detectada: $(uname -m)" >&2
  exit 1
fi

if ! grep -qi "Ubuntu" /etc/os-release; then
  echo "Use Ubuntu 24.04 LTS ARM64." >&2
  exit 1
fi

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y git curl ca-certificates build-essential

if ! id fcc >/dev/null 2>&1; then
  useradd --system --create-home --home-dir /opt/fcc-data --shell /usr/sbin/nologin fcc
fi
mkdir -p /opt/fcc-data
chown -R fcc:fcc /opt/fcc-data

if ! command -v uv >/dev/null 2>&1; then
  curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR=/usr/local/bin sh
fi

if [[ ! -d /opt/fcc-app/.git ]]; then
  git clone https://github.com/Alishahryar1/free-claude-code.git /opt/fcc-app
else
  git -C /opt/fcc-app pull --ff-only
fi
chown -R fcc:fcc /opt/fcc-app

sudo -u fcc -H bash -lc 'cd /opt/fcc-app && /usr/local/bin/uv sync --no-dev'

cat >/etc/systemd/system/fcc.service <<'UNIT'
[Unit]
Description=Free Claude Code API server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=fcc
Group=fcc
WorkingDirectory=/opt/fcc-app
Environment=HOME=/opt/fcc-data
Environment=PYTHONUNBUFFERED=1
ExecStart=/usr/local/bin/uv run --no-sync uvicorn server:app --host 127.0.0.1 --port 8082
Restart=always
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/opt/fcc-data /opt/fcc-app

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable --now fcc
sleep 3
if ! systemctl is-active --quiet fcc; then
  systemctl --no-pager --full status fcc || true
  journalctl -u fcc -n 80 --no-pager || true
  exit 1
fi

echo "FCC instalado e ativo em 127.0.0.1:8082."
echo "Admin privado: crie um túnel SSH com: ssh -L 8082:127.0.0.1:8082 ubuntu@IP_DA_VPS"
echo "Depois abra http://127.0.0.1:8082/admin no seu navegador."
echo "IMPORTANTE: não exponha a porta 8082; habilite Proxy Authentication antes de configurar o proxy HTTPS público."
