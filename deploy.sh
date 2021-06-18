#!/bin/bash
set -e
# TODO add assertions that the git status is empty
# (otherwise lose work in progress)
sed -i.bak "s/dist\/js\///" ".gitignore"
git add dist
git commit -m "add dist"
git subtree push --prefix dist origin gh-pages
git reset --hard HEAD~