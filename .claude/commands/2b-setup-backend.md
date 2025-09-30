---
name: 2b-setup-backend
description: Setup complete backend infrastructure with database and authentication
---

# 🛠️ Backend Foundation Setup

Automatically configures complete backend infrastructure for any Next.js project.

**Prerequisites:** Run `/2-setup-frontend` first.

## Database Options
1. **SQLite** - Local development, simple setup
2. **PostgreSQL** - Production ready, full features

## User System Options  
1. **No Users** - Tools, dashboards, static sites
2. **User Authentication** - Apps with login/signup/sessions

**Your choices: Database(1-2), Users(1-2)**

---

## 🤖 Claude Instructions

Single MCP call configures everything:

```typescript
const result = await mcp_queen_mcp_setup_backend(process.cwd(), userDbChoice, userAuthChoice);

if (result.success) {
  console.log("✅ Backend setup complete with " + result.database_type + "!");
  console.log("✅ Files created: " + result.files_created.join(", "));
  console.log("✅ Prisma client generated and database initialized");
  if (result.auth_enabled) {
    console.log("✅ Authentication: " + result.auth_type + " configured");
  }
  console.log("✅ " + result.message);
  console.log("\n📋 Next steps:");
  result.next_steps.forEach(step => console.log("  • " + step));
} else {
  console.log("❌ Setup failed: " + result.error);
}
```

**Tell the user exactly what happened:**
- All files were created in the correct locations
- Prisma client was automatically generated  
- Database tables were created/updated
- No manual commands needed - everything is ready to use
- Only next step is restarting dev server to clear module cache

**What it automatically generates and configures:**
- `prisma/schema.prisma` (Database schema with models)
- `src/lib/prisma.ts` (Database connection singleton)
- `src/lib/auth.ts` (NextAuth configuration if users enabled)
- `src/lib/api-utils.ts` (Response helpers, error handling)
- `.env.local` (Database URL, auth secrets)
- `app/api/auth/[...nextauth]/route.ts` (Auth endpoints if users enabled)
- `app/api/health/route.ts` (Health check endpoint)

**Fully automated steps completed:**
- ✅ Runs `npx prisma generate` (creates Prisma client)
- ✅ Runs `npx prisma db push` (creates database tables)
- ✅ Always includes at least one model (Setting) for client generation
- ✅ Files created in correct `src/lib/` directory for Next.js App Router
- ✅ All imports configured with proper `@/lib/` paths

**No manual steps required!** Backend is immediately ready to use.