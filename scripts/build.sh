#!/bin/bash

cd `dirname $0`
js_src=../src/js
js_dest=../apps/js

browserify $js_src/popup.js > $js_dest/popup.js || exit 1
browserify $js_src/options.js > $js_dest/options.js || exit 1
browserify $js_src/background.js > $js_dest/background.js || exit 1
