#!/bin/bash

PORT=8080

if ss -tln | grep -q ":$PORT\b"; then
    echo "Port $PORT is already in use. Using port 8090 instead."
    PORT=8090
fi

export PORT

NODE_OPTIONS="--require ts-node/register" nodemon src/server.ts

chmod +x "$0"