---
name: monitor
description: Open the visual monitoring dashboard in your browser
---

# Monitor Dashboard

Open the real-time visual monitoring dashboard for all autonomous Claude instances.

## Usage

```
/monitor
```

## What This Does

**YOU MUST EXECUTE THESE COMMANDS WITH Bash TOOL**

1. **Start the monitor server** (if not running):
```bash
# Check if monitor is already running
if lsof -i:3456 > /dev/null 2>&1; then
  echo "✅ Monitor already running at http://localhost:3456"
else
  echo "Starting Queen Monitor..."
  cd .queen/monitor
  npm install --silent
  node server.js > /dev/null 2>&1 &
  sleep 3
  echo "🎯 Monitor started at http://localhost:3456"
  echo "🔗 WebSocket server on port 3457"
fi
```

2. **Open in browser**:
```bash
# Open the dashboard in default browser
if command -v xdg-open > /dev/null; then
  xdg-open http://localhost:3456
elif command -v open > /dev/null; then
  open http://localhost:3456
else
  echo "Please open http://localhost:3456 in your browser"
fi
```

## Visual Dashboard Shows:

- **📦 Active Claude Instances**
  - Process IDs, CPU usage, memory, runtime
  - Which feature each Claude is working on

- **📊 Task Progress** 
  - Real-time task status updates from database
  - Progress bars for each task
  - Color-coded status indicators

- **📝 File Changes**
  - Live updates as files are modified in worktrees
  - Shows which branch and files are changing

- **📜 Live Logs**
  - Streams output from Claude instances
  - Captures errors and important events

- **📈 Summary Statistics**
  - Total completed, in progress, needs fixes
  - Number of active Claude instances

## Stop Monitor

To stop the monitor server:
```bash
# Find and kill the monitor process
lsof -ti:3456 | xargs kill -9 2>/dev/null
echo "Monitor stopped"
```

**REMEMBER: Execute all commands with Bash tool, don't ask user to run them.**