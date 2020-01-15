#!/usr/bin/env sh
# Starts jekyll dev server with live reloading
npx webpack --watch --color | awk -F'\\\\n' '{print "[webpack]\t"$1}' &
bundle exec jekyll serve -l
