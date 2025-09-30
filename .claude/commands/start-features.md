---
name: start-features
description: Launch autonomous development of all features with parallel Claude instances
---

# Start Feature Development

Launch autonomous development by reading FEATURES.md, creating database entries, setting up git worktrees, and spawning parallel Claude instances for each feature.

## ⚠️ CRITICAL EXECUTION REQUIREMENTS

**YOU MUST:**
1. **EXECUTE all commands directly using Bash tool** - DO NOT ask user to run them
2. **USE run_in_background: true** when launching Claude instances
3. **RUN the claude commands yourself** - DO NOT tell user to run them
4. **LAUNCH Claude instances in background** so you don't wait for them to complete
5. **USE --dangerously-skip-permissions flag** when spawning worktree Claude instances for Queen MCP access

## Usage

```
/start-features
```

## Prerequisites

- FEATURES.md file must exist (created by /new-features)
- Queen Claude database initialized
- Git repository in clean state

## Process

**IMPORTANT: You MUST execute all commands directly using Bash with run_in_background: true**

0. **Start the Monitor Dashboard** (if not already running):
   ```bash
   # Check if monitor is running
   lsof -i:3456 || (
     npm install && 
     npm run dev &
     echo "🎯 Monitor started at http://localhost:3456"
   )
   ```

1. **Read FEATURES.md**: Parse all feature specifications
2. **Create Database Entries**: 
   - Insert features into database with unique IDs
   - Break each feature into tasks with proper feature_id links
   - Set up agent assignments
3. **Setup Git Worktrees**: 
   - Create numbered branches (001-user-auth, 002-dashboard, etc.)
   - Create isolated worktree directories
4. **Launch Parallel Claude Instances**:
   - **USE Bash with run_in_background: true to launch Claude instances**
   - Launch dedicated Claude instance per feature in background
   - Each Claude gets feature-specific context and task IDs
   - Each works independently in their worktree
5. **Quality Verification**:
   - After each feature completion, spawn validation agent
   - Verify implementation matches expected results
   - Set status to "complete" or "needs_fixes"

## Git Worktree Commands

**Create worktree for each feature:**
```bash
# For Feature 1: User Authentication
git worktree add .queen/worktrees/001-user-auth -b 001-user-auth

# For Feature 2: Product Catalog
git worktree add .queen/worktrees/002-product-catalog -b 002-product-catalog

# For Feature 3: Shopping Cart
git worktree add .queen/worktrees/003-shopping-cart -b 003-shopping-cart
```

**Launch Autonomous Claude in worktree (YOU MUST RUN THIS WITH Bash tool):**
```bash
# EXECUTE THIS DIRECTLY with run_in_background: true
# Create logs directory if needed
mkdir -p .queen/logs

# Set QUEEN_PROJECT_ROOT and create log file for monitoring
LOGFILE=".queen/logs/claude-001-$(date +%Y%m%d-%H%M%S).log"
QUEEN_PROJECT_ROOT=$(pwd) cd .queen/worktrees/001-user-auth && claude --dangerously-skip-permissions -p "Build User Authentication feature (feature_id=1).

Use Queen MCP to get context and tasks. Spawn appropriate agents and work in parallel for faster progress.

Follow the complete agent workflow:
- Building agents (nextking/typegod): todo → in_progress → coding_done
- Validation agents (cheeky_frontend/cheeky_backend): coding_done → validated OR needs_fixes  
- Debug agent (debuggy): needs_fixes → coding_done (loop back)
- Final: validated → complete

Work autonomously until feature fully validated and complete." 2>&1 | tee "$LOGFILE"
```

**CRITICAL: Use Bash tool with run_in_background: true to execute the above command**

## Autonomous Development Flow

**YOU MUST EXECUTE ALL COMMANDS DIRECTLY - DO NOT ASK USER TO RUN THEM**

```
For each feature:
1. Use mcp__queen-mcp__create_feature to create database record and get branch_name
2. Use mcp__queen-mcp__create_task for each task in the feature  
3. Execute with Bash: git worktree add .queen/worktrees/${branch_name} -b ${branch_name}
4. Launch autonomous Claude instance WITH run_in_background: true:
   
   Use Bash tool with run_in_background: true:
   mkdir -p .queen/logs
   LOGFILE=".queen/logs/claude-${feature_id}-$(date +%Y%m%d-%H%M%S).log"
   QUEEN_PROJECT_ROOT=$(pwd) cd .queen/worktrees/${branch_name} && claude --dangerously-skip-permissions -p "Build ${feature_name} (feature_id=${feature_id}).
   
   Use Queen MCP to get context and tasks. Spawn appropriate agents in parallel.
   
   Follow agent workflow: Building → Validation → Debug (if needed) → Complete.
   Work autonomously until feature fully validated." 2>&1 | tee "$LOGFILE"

5. Spawned Claude automatically:
   - Gets feature context via Queen MCP
   - Spawns building agents (nextking/typegod) as appropriate
   - Follows todo → in_progress → coding_done → validated → complete workflow
   - Spawns validation/debug agents as needed
   - Reports all progress to Queen database

6. Repeat for next feature
```

## TDD Requirements

All spawned agents must follow:
- Write tests first
- Keep implementation simple  
- No over-engineering
- Focus on working functionality
- Pass all tests before marking complete

## Autonomous Claude Instructions Template

Each spawned Claude instance receives:
```bash
claude --dangerously-skip-permissions -p "Build ${feature_name} (feature_id=${feature_id}).

Use Queen MCP for all coordination:
- Get requirements: mcp__queen-mcp__get_feature_context(${feature_id})
- Get tasks: mcp__queen-mcp__get_available_tasks(${feature_id})
- Report progress: mcp__queen-mcp__update_task_progress

Spawn appropriate agents in parallel for faster progress. 
Follow complete agent workflow from CLAUDE.md.
Work autonomously until feature fully validated and complete."
```

## Key Benefits
- Each Claude instance works completely autonomously
- Natural agent spawning based on feature requirements  
- Complete workflow adherence without micromanagement
- Database coordination via Queen MCP tools
- Parallel development with perfect feature isolation

## EXAMPLE OF CORRECT EXECUTION

**WRONG (asking user):**
```
"Please run the following command to launch Claude:
claude -p 'Build feature...'"
```

**CORRECT (executing directly):**
```javascript
// YOU execute this with Bash tool:
Bash({
  command: `
    mkdir -p .queen/logs
    LOGFILE=".queen/logs/claude-001-$(date +%Y%m%d-%H%M%S).log"
    QUEEN_PROJECT_ROOT=$(pwd) cd .queen/worktrees/001-user-auth && \
    claude --dangerously-skip-permissions -p 'Build User Authentication feature...' 2>&1 | tee "$LOGFILE"
  `,
  run_in_background: true,
  description: "Launch autonomous Claude with logging for monitoring"
})
```

**REMEMBER: You are the one who executes ALL commands. Never ask the user to run them.**