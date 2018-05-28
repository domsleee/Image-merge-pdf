#!/bin/bash
set -e
sed -i.bak "s/dist\/js\///" ".gitignore"
git add dist
git commit -m "add dist"
git subtree push --prefix dist origin gh-pages
git reset --hard HEAD~