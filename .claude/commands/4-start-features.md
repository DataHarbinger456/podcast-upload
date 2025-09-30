---
name: 4-start-features
description: Launch autonomous development of all features with parallel Claude instances
---

# Start Feature Development

Launch autonomous development by reading FEATURES.md and spawning parallel Claude instances.

## Prerequisites
- FEATURES.md exists (from /3-setup-features)
- Complete foundation setup (from /1-setup-design, /2-setup-frontend, /2b-setup-backend)
- Clean git workspace (committed and pushed)

## 🤖 Claude Instructions

### 1. Verify Prerequisites
```bash
[ -f "FEATURES.md" ] && [ -f "src/app/globals.css" ] && [ -f "prisma/schema.prisma" ] && [ -f "src/lib/prisma.ts" ] && echo "✅ Complete foundation ready" || echo "❌ Run all setup commands first"
git status --porcelain | wc -l  # Should return 0
```

### 2. Launch Autonomous Development
**For each feature in FEATURES.md:**

```typescript
// Create feature in database and get worktree
const feature = await mcp_queen_mcp_create_feature({
  name: "User Authentication", 
  description: "Complete auth system",
  scope_details: { /* feature requirements */ }
});

// Create tasks for the feature
const tasks = await mcp_queen_mcp_create_task({
  feature_id: feature.id,
  name: "Login Form Component",
  requirements: "Build login form with email/password",
  files: ["src/components/LoginForm.tsx"],
  expected_results: { /* validation criteria */ }
});

// Spawn autonomous Claude for this feature
const claude = await mcp_queen_mcp_spawn_fullstack_claude({
  feature_id: feature.id,
  timeout_minutes: 15
});
```

### 3. Spawned Claude Instructions
**Autonomous Claude uses MCP tools for agent spawning:**
```
Work on feature_id=${feature_id} using the MCP agent spawning system.

AGENT SPAWNING - USE MCP TOOL:
For development tasks:
mcp__queen-mcp__spawn_agent({
  agent_type: "nextking",      // Full-stack Next.js expert
  task_id: task_id,
  custom_instructions: "Focus on specific requirements"
})

For frontend validation:
mcp__queen-mcp__spawn_agent({
  agent_type: "cheeky_frontend",   // Frontend/UI validation specialist
  task_id: task_id
})

For backend validation:
mcp__queen-mcp__spawn_agent({
  agent_type: "cheeky_backend",    // Backend/API validation specialist
  task_id: task_id
})

AVAILABLE AGENT TYPES:
- nextking: Complete full-stack development (frontend + backend + database)
- thebackend: Backend API and database specialist
- cheeky_frontend: Frontend design system and UI validation
- cheeky_backend: Backend API, database, and security validation

Process: Get tasks → Spawn agents with MCP tool → Coordinate → Complete
The MCP tool automatically provides complete foundation context to all agents.
```

**That's it!** MCP tools handle worktrees, coordination, and validation automatically.