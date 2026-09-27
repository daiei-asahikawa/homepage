#!/usr/bin/env bash
# 公開用の箱（dist）を作る。載せるものだけをここに並べてから wrangler deploy する。
# 載せないもの: .git .claude .vscode .wrangler dist 設定ファイル類
set -euo pipefail
cd "$(dirname "$0")"
if [ -e dist ]; then
  echo "dist がもう在る。中身を確かめてから手で片付けること（自動では消さない）" >&2
  exit 1
fi
mkdir dist
find . -type f \
  -not -path './.git/*' -not -path './.claude/*' -not -path './.vscode/*' \
  -not -path './.wrangler/*' -not -path './dist/*' -not -path './src/*' \
  -not -name 'wrangler.jsonc' -not -name '.assetsignore' -not -name '.gitignore' -not -name 'build.sh' \
  -print0 | xargs -0 cp --parents -t dist
echo "dist に並べた: $(find dist -type f | wc -l) ファイル / $(du -sh dist | cut -f1)"
