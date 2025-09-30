---
name: feature-status
description: Check the status of all features and their tasks across worktrees
---

# Feature Status

Display comprehensive status of all features, their tasks, and worktree states.

## Usage

```
/feature-status [feature-id]
```

Examples:
- `/feature-status` - Show all features
- `/feature-status 1` - Show specific feature details

## Status Overview

**YOU MUST EXECUTE ALL COMMANDS DIRECTLY WITH Bash TOOL**

### 1. Database Status Query

```sql
SELECT 
  f.id,
  f.name,
  f.branch_name,
  f.status as feature_status,
  COUNT(t.id) as total_tasks,
  SUM(CASE WHEN t.status = 'complete' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN t.status = 'validated' THEN 1 ELSE 0 END) as validated,
  SUM(CASE WHEN t.status = 'coding_done' THEN 1 ELSE 0 END) as coding_done,
  SUM(CASE WHEN t.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
  SUM(CASE WHEN t.status = 'needs_fixes' THEN 1 ELSE 0 END) as needs_fixes,
  SUM(CASE WHEN t.status = 'todo' THEN 1 ELSE 0 END) as todo
FROM features f
LEFT JOIN tasks t ON f.id = t.feature_id
GROUP BY f.id
ORDER BY f.id;
```

### 2. Git Worktree Status

```bash
# List all worktrees and their status
git worktree list

# Check each worktree for uncommitted changes
for worktree in .queen/worktrees/*; do
  if [ -d "$worktree" ]; then
    echo "=== $(basename $worktree) ==="
    cd "$worktree"
    git status --short
    cd -
  fi
done
```

### 3. Display Format

```
📊 FEATURE STATUS REPORT
========================

Feature #1: User Authentication [001-user-auth]
├─ Status: IN PROGRESS
├─ Progress: ████████░░ 80% (4/5 tasks)
├─ Tasks:
│  ✅ Complete: 3
│  ✓  Validated: 1
│  🔧 Coding Done: 0
│  ⚡ In Progress: 1
│  ❌ Needs Fixes: 0
│  ⏳ Todo: 0
├─ Worktree: .queen/worktrees/001-user-auth
└─ Git Status: Clean (ready to merge)

Feature #2: Product Catalog [002-product-catalog]
├─ Status: ACTIVE
├─ Progress: ██████░░░░ 60% (3/5 tasks)
├─ Tasks:
│  ✅ Complete: 2
│  ✓  Validated: 1
│  🔧 Coding Done: 1
│  ⚡ In Progress: 1
│  ❌ Needs Fixes: 0
│  ⏳ Todo: 0
├─ Worktree: .queen/worktrees/002-product-catalog
└─ Git Status: Uncommitted changes

SUMMARY:
--------
Total Features: 3
✅ Ready to Merge: 1
🚀 In Progress: 2
⏳ Not Started: 0
```

## Check Specific Feature

When checking a specific feature, also show:
- Detailed task list with names and status
- Current agent assignments
- Recent activity logs
- Files modified in worktree
- Test status

```javascript
// Get detailed feature info
const feature = await mcp__queen-mcp__get_feature_context({
  feature_id: featureId
});

// Check worktree status
Bash({
  command: `cd .queen/worktrees/${branch_name} && git status`,
  description: "Check git status in feature worktree"
});

// Show modified files
Bash({
  command: `cd .queen/worktrees/${branch_name} && git diff --name-status main...HEAD`,
  description: "Show files modified in feature branch"
});
```

## Merge Readiness Indicators

A feature is ready to merge when:
- ✅ All tasks are "complete" status
- ✅ No tasks in "needs_fixes" status  
- ✅ Worktree has no uncommitted changes
- ✅ Tests are passing
- ✅ No merge conflicts with main

## Actions Based on Status

**If feature is complete:**
→ Suggest: `/merge-feature <feature-id>`

**If feature has "needs_fixes" tasks:**
→ Suggest: Spawn debuggy agent to fix issues

**If feature has "coding_done" tasks:**
→ Suggest: Spawn validation agent to verify

**If feature has "todo" tasks:**
→ Suggest: Check if autonomous Claude is still running

**REMEMBER: Execute all commands directly with Bash tool. Do not ask user to run them.**