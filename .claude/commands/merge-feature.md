---
name: merge-feature
description: Merge completed feature from worktree back to main branch and clean up
---

# Merge Feature

Merge a completed feature from its worktree back to the main branch, validate completion, and clean up.

## Usage

```
/merge-feature <feature-id|branch-name>
```

Examples:
- `/merge-feature 1` - Merge feature with ID 1
- `/merge-feature 001-user-auth` - Merge by branch name

## Process

**YOU MUST EXECUTE ALL COMMANDS DIRECTLY WITH Bash TOOL**

1. **Validate Feature Completion**:
   - Query database to verify all tasks are "complete"
   - Check no tasks are in "needs_fixes" or "coding_done" status
   - Abort if feature isn't fully validated and complete

2. **Pre-Merge Checks**:
   - Switch to main branch: `git checkout main`
   - Pull latest changes: `git pull origin main`
   - Check for conflicts: `git merge --no-commit --no-ff <branch-name>`

3. **Merge the Feature**:
   ```bash
   # If no conflicts, proceed with merge
   git merge <branch-name> -m "Merge feature: <feature-name>"
   ```

4. **Handle Conflicts** (if any):
   - If conflicts exist, spawn a resolution agent
   - Or provide clear conflict resolution steps
   - Ensure tests pass after resolution

5. **Post-Merge Cleanup**:
   ```bash
   # Remove the worktree
   git worktree remove .queen/worktrees/<branch-name>
   
   # Delete the remote branch (optional, ask user)
   git push origin --delete <branch-name>
   
   # Update database to mark feature as "merged"
   ```

6. **Final Validation**:
   - Run tests to ensure nothing broke
   - Verify build succeeds
   - Update feature status in database

## Database Validation Query

```sql
-- Check if all tasks for a feature are complete
SELECT 
  f.id,
  f.name,
  f.branch_name,
  COUNT(t.id) as total_tasks,
  SUM(CASE WHEN t.status = 'complete' THEN 1 ELSE 0 END) as completed_tasks,
  SUM(CASE WHEN t.status IN ('needs_fixes', 'coding_done', 'in_progress', 'todo') THEN 1 ELSE 0 END) as incomplete_tasks
FROM features f
LEFT JOIN tasks t ON f.id = t.feature_id
WHERE f.id = ? OR f.branch_name = ?
GROUP BY f.id;
```

## Conflict Resolution

If merge conflicts occur:

1. **Automated Resolution** (for simple conflicts):
   ```bash
   # Try to auto-resolve with theirs/ours strategy
   git checkout --theirs <file>  # Accept feature branch version
   git checkout --ours <file>    # Keep main branch version
   ```

2. **Manual Resolution Required**:
   - List conflicted files: `git status`
   - Spawn specialized agent to resolve
   - Or provide detailed instructions for user

3. **Post-Resolution**:
   ```bash
   git add .
   git commit -m "Merge feature: <feature-name> (resolved conflicts)"
   ```

## Example Execution Flow

```javascript
// 1. Validate feature is complete
const result = await mcp__queen-mcp__query_database({
  sql: "SELECT ... FROM features WHERE id = ?",
  params: [featureId]
});

if (incomplete_tasks > 0) {
  throw "Feature not complete! " + incomplete_tasks + " tasks remaining";
}

// 2. Execute merge
Bash({
  command: "git checkout main && git pull origin main",
  description: "Switch to main and pull latest"
});

// 3. Check for conflicts
Bash({
  command: "git merge --no-commit --no-ff " + branch_name,
  description: "Test merge for conflicts"
});

// 4. If no conflicts, complete merge
Bash({
  command: "git merge " + branch_name + " -m 'Merge feature: " + feature_name + "'",
  description: "Complete the merge"
});

// 5. Clean up
Bash({
  command: "git worktree remove .queen/worktrees/" + branch_name,
  description: "Remove worktree"
});
```

## Safety Checks

- ✅ Feature must be marked "complete" in database
- ✅ All tasks must be "complete" status
- ✅ Tests must pass after merge
- ✅ Build must succeed
- ✅ No uncommitted changes in main branch

## Post-Merge Actions

After successful merge:
1. Update feature status to "merged" in database
2. Remove worktree directory
3. Optionally delete remote branch
4. Notify about successful integration
5. Suggest next feature to work on

**REMEMBER: Execute all commands directly with Bash tool. Do not ask user to run them.**