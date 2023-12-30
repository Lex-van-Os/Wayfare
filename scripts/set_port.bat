@echo off

setlocal enabledelayedexpansion

set PORT=8080

set "command=netstat -ano | findstr :%PORT%"
for /f "usebackq tokens=5" %%a in (`!command!`) do (
    set "pid=%%a"
)
if defined pid (
    echo Port %PORT% is already in use. Using port 8090 instead.
    set PORT=8090
)

rem 
set "NODE_OPTIONS=--require ts-node/register"
set "PORT=%PORT%" && call nodemon src/server.ts