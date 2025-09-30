---
name: 2-setup-foundation
description: Setup complete Next.js foundation automatically from your design system
---

# 🛠️ Foundation Setup

Automatically configures complete Next.js foundation from your `DESIGN_SYSTEM.md`.

**Prerequisites:** Run `/1-setup-design` first.

---

## 🤖 Claude Instructions

Single MCP call does everything:

```typescript
const result = await mcp_queen_mcp_setup_foundation(process.cwd());

if (result.success) {
  console.log("✅ Foundation setup complete with " + result.theme_name + "!");
  console.log("✅ Generated: " + result.files_created.join(", "));
} else {
  console.log("❌ " + result.error);
}
```

**What it generates:**
- `src/app/globals.css` (Complete HSL colors + dark mode + enhanced spacing utilities)
- `tailwind.config.js` (shadcn + design tokens + enhanced safelist)
- `src/app/layout.tsx` (Google Fonts + React imports + TypeScript types)
- `src/lib/utils.ts` (shadcn utilities)
- `components.json` (shadcn config)
- Runs `npx shadcn@latest init`