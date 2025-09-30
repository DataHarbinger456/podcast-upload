# Queen Claude Development Guidelines

AI development guidelines for autonomous feature development with perfect code quality and zero clutter.

## 📦 Package-First Philosophy

### Core Rule: Check CAPABILITIES.md First
- **Step 1**: Read CAPABILITIES.md for available packages (31 included)
- **Step 2**: Use existing tools (NextAuth, Prisma, react-hook-form, Radix UI, zustand, React Query, axios, etc.)
- **Step 3**: Only install new packages if user confirms necessity
- **Decision flow**: Need functionality? → Check CAPABILITIES.md → Use existing → Ask user before installing new

### Our Foundation Includes
- **Authentication**: NextAuth v5 with GitHub/Google providers
- **Database**: Prisma ORM with SQLite ready
- **Forms**: react-hook-form + zod validation
- **UI**: 8 Radix primitives + Tailwind CSS
- **State**: zustand + React Query for server/client state
- **Utilities**: axios, date-fns, framer-motion, react-dropzone, and more

## 🎨 Design System Compliance

### Mandatory References
- **Read CAPABILITIES.md**: Available packages and tools (31 total)
- **Read DESIGN_SYSTEM.md**: Colors, fonts, spacing specifications
- **Read COMPONENT_TEMPLATES.md**: Ready-to-use component patterns
- **Check tailwind.config.js**: Design tokens configured by /setup-foundation
- **Follow exact specifications**: No color/font deviations without user approval

### Design Consistency Rules
- **Colors**: Use Tailwind design tokens (bg-primary, text-primary) from tailwind.config.js
- **Typography**: Use configured font classes (font-heading, font-body)
- **Spacing**: Use design system spacing classes (ds-1, ds-2, etc.)
- **Components**: Copy exactly from COMPONENT_TEMPLATES.md (no modifications)
- **Accessibility**: Ensure 4.5:1 contrast ratio minimum

### Critical UI Rules (Prevent Common LLM Mistakes)
- ✅ **ALWAYS**: White text on dark backgrounds, dark text on light backgrounds
- ✅ **ALWAYS**: Check contrast before applying colors
- ❌ **NEVER**: Light gray text on white backgrounds
- ❌ **NEVER**: Mix fonts beyond the specified heading/body pair
- ❌ **NEVER**: Use colors outside the defined palette

## 🎯 Self-Documenting Code

### Comment Rules
- **Code comments**: NEVER add unless absolutely necessary
- **Design system comments**: ALLOWED in CSS/styling for clarity
- **Example comments**: ALLOWED in DESIGN_SYSTEM.md for agent guidance

### Function Naming
- Function names explain purpose: `validateUserEmailForAuthentication()` not `validate()`
- Variable names are obvious: `userAuthToken` not `token`
- Small, focused functions (max 20 lines)
- Clear imports/exports at file top
- Type definitions explain data relationships

### File Organization
```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts    # NextAuth API routes
│   ├── login/page.tsx                     # Login page
│   └── dashboard/page.tsx                 # Feature pages
├── components/
│   ├── LoginForm.tsx                      # UI components
│   └── providers/                         # Context providers
├── lib/
│   ├── auth.ts                           # Auth configuration
│   ├── prisma.ts                         # Database client
│   └── utils.ts                          # Utility functions
└── stores/
    └── auth-store.ts                     # State management
```

## 🧹 Zero Clutter Rules

### File Hygiene
- Every file has single, obvious purpose
- No "misc" or "utils" folders - name what it actually does
- Delete unused imports immediately
- Delete unused files immediately
- No commented-out code ever

### Code Cleanup
- Fix TypeScript errors before continuing
- Remove unused variables before moving on
- Run formatter after every change
- Consolidate duplicate code when spotted
- Update tests when changing behavior

## ⚡ YAGNI Enforcement

### Build Only What's Needed
- No "flexible" architecture until needed twice
- No configuration options until requested
- No optimization until performance problem exists
- No abstraction until pattern repeats 3+ times
- Delete features that aren't being used

### Complexity Prevention
- Max 3 levels of nesting in functions
- Direct solutions over clever ones
- Copy-paste over premature abstraction
- Simple solutions first, optimize later

## 🧪 Test-Driven Development

### TDD Rules
- Write failing test first (immediate feedback)
- Make test pass with minimal code
- Refactor while keeping tests green
- Test names explain behavior: `should_reject_invalid_email_format()`
- Integration tests over unit tests (prove it works)

### Frequent Validation
- Test after every 5-10 lines of code
- Run build after major changes
- Validate in browser/CLI immediately
- Fix broken functionality before adding new features

## 📱 Response Guidelines

### Status-First Communication
```
✅ LoginForm component complete. Testing now...
⚠️ Type error in auth.ts line 23. Fixing...
🔄 Progress: [██████░░░░] 60% - API routes done, testing components
```

### Visual Over Verbal
- Status symbols: ✅ ⚠️ 🔄 ❌
- Progress bars: [████████░░] 80%
- Bullet points over paragraphs
- Code examples over explanations
- Always end with clear NEXT STEP

### Response Format Rules
❌ Never: Long explanations of what you did
❌ Never: Verbose status updates
❌ Never: Theoretical discussions
✅ Always: Lead with status, show progress, state next action

## 🔄 Quality Gates

### Before Marking coding_done
- Code actually runs without errors
- Tests pass (run them, don't assume)
- **ESLint passes:** Run `npm run lint:fix` to catch quote escaping and JSX issues
- Feature works as expected in browser/CLI
- No TypeScript errors or warnings
- Simple integration test demonstrates core functionality

### Technical Debt Prevention
- Similar files in same directory
- Consistent naming patterns across project
- Dependencies flow in one direction
- Types defined close to usage
- Remove duplication when spotted

## 🗄️ Queen Database Integration

### When to Store Memory
```
ALWAYS store when you:
- Solve a tricky problem (store the solution approach)
- Make an architectural decision (store the reasoning)
- Find a useful pattern (store the code template)
- Discover a team preference (store the rule)

EXAMPLES:
- "Next.js API Response Format" → store standard response structure
- "Error Handling Pattern" → store try-catch template
- "Component File Organization" → store directory structure rule
```

### When to Report Problems
```
ALWAYS report when you encounter:
- Build/compile errors
- TypeScript issues
- Dependency conflicts
- Test failures
- Runtime errors
- Integration problems

IMMEDIATELY mark as solved when fixed:
- Include exact solution steps
- Note which files were changed
- Record what approach worked
```

### Database Tool Usage
```
Before starting work: mcp__queen-mcp__get_project_context (get full context)
During development: mcp__queen-mcp__update_agent_activity (show progress)
When stuck: mcp__queen-mcp__get_similar_problems (check past solutions)
When solved: mcp__queen-mcp__store_memory (save the approach)
Task updates: mcp__queen-mcp__update_task_progress (track completion)
Feature context: mcp__queen-mcp__get_feature_context (get feature details)
Task dependencies: mcp__queen-mcp__check_task_dependencies (can I start this?)
```

### Foundation File References
**Always read these files created by setup commands:**
- **DESIGN_SYSTEM.md**: Color palette, fonts, spacing (from /1-setup-design)
- **COMPONENT_TEMPLATES.md**: Ready-to-use component patterns (from /3-setup-features)
- **tailwind.config.js**: Design tokens and theme configuration (from /2-setup-foundation)
- **src/app/globals.css**: HSL colors and design system CSS (from /2-setup-foundation)
- **prisma/schema.prisma**: Database models and relationships (from /2b-setup-backend)
- **src/lib/auth.ts**: NextAuth configuration (from /2b-setup-backend)
- **src/lib/prisma.ts**: Database client setup (from /2b-setup-backend)

### Memory Categories
- **important_pattern**: Code templates and structures
- **key_decision**: Why we chose X over Y
- **critical_knowledge**: Must-know project rules
- **team_preference**: How this team likes to work
- **project_rule**: Non-negotiable project standards

## 🎪 Agent Workflow Integration

### Status Transitions
```
Building agents (nextking/nextfront/thebackend/typegod): todo → in_progress → coding_done
Frontend validation (cheeky_frontend): coding_done → validated OR needs_fixes (for UI/design tasks)
Backend validation (cheeky_backend): coding_done → validated OR needs_fixes (for API/database tasks)
Debug agent (debuggy): needs_fixes → coding_done (loop back)
Final: validated → complete
```

### Validation Agent Selection
- **Frontend tasks** (UI, components, styling) → Use `cheeky_frontend`
- **Backend tasks** (APIs, database, auth) → Use `cheeky_backend`
- **Full-stack features** → Use both agents for respective parts

### Memory-First Development
- Check Queen memory before building anything new
- Store successful approaches immediately
- Update agent status frequently for dashboard visibility
- Report problems immediately for team learning

**Philosophy**: Build clean, working code while continuously feeding the Queen database with knowledge that helps future LLMs work more effectively.
