#!/usr/bin/env bash

BINDINGS_DIR=bindings/sqlite3/node-v72-darwin-x64
MACOS_BINARY=node_modules/sqlite3/lib/binding/node-v72-darwin-x64/node_sqlite3.node

mkdir -p ${BINDINGS_DIR}

if [[ ! -f ${MACOS_BINARY} ]]
then
  printf "Building MacOS binary...\n"
  npm install sqlite3 --build-from-source=sqlite3 --target_platform=darwin --target_arch=x64
  cp ${MACOS_BINARY} ${BINDINGS_DIR}
  mv "${BINDINGS_DIR}/node_sqlite3.node" "${BINDINGS_DIR}/node_sqlite3.tmp"
fi

npm run package
