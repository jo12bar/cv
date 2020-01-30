#!/usr/bin/env bash

# Exit immediately if something in a pipeline returns a non-zero exit status
set -e

echo "🚀 Starting deployment action"

REMOTE_REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

cd $GITHUB_WORKSPACE
echo "Remotes:"
git remote -v

echo "💎 Installing ruby dependencies..."
bundle install

echo "🎩 Building with Jekyll..."
JEKYLL_ENV=production bundle exec jekyll build
echo "Jekyll build done"

# Publish site from generated _site folder
cd _site

echo "☁️ Publishing website..."

# We don't want README.md on this branch
rm -f README.md

# Init a new git repo inside _site so we can perform a commit
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"

git add .
git commit -m "[GitHub Actions] - $(date)"

# Force push to gh-pages branch on GitHub
git push --force $REMOTE_REPO master:gh-pages

echo "🎉 New version deployed! 🎊"
