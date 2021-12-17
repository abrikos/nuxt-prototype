#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
node -r esm "${DIR}/run.js" "${@}"
