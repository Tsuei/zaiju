#!/usr/bin/env bash
# 本地手动部署到 gh-pages 分支
set -e

echo "==> 构建站点"
npm run build

echo "==> 推送到 gh-pages 分支"
npx gh-pages -d docs/.vuepress/dist -b gh-pages

echo "==> 部署完成"
echo "请到 GitHub 仓库 Settings -> Pages 确认 Source 指向 gh-pages 分支"