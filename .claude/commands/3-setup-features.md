---
name: 3-setup-features
description: Create feature specifications through interactive planning session
---

# Create New Features

Interactive feature planning that creates comprehensive specifications for autonomous development.

## Process

### 1. Discovery
Ask: "What features do you want to build?"
Follow up: "What type of app? Who are your users? What's the main goal?"

### 2. Feature Scoping Rules

**🎯 RULE: One User Goal = One Feature**

**Before creating multiple features, ask:**
1. **User Goal Test**: What is the user trying to accomplish?
   - If ONE goal → ONE feature
   - If multiple independent goals → Multiple features

2. **Session Test**: Would a user complete this in one workflow?
   - Landing page visit → ONE feature  
   - Authentication + Dashboard → TWO features (separate sessions)

3. **Business Value Test**: What distinct business value does each deliver?
   - If values are dependent → ONE feature
   - If values are independent → Multiple features

**✅ Proper Feature Examples:**
- "Landing page" = ONE feature (hero + nav + forms + footer)
- "E-commerce store" = ONE feature (browse + cart + checkout + orders)  
- "Blog platform" = ONE feature (posts + comments + admin + publishing)
- "User authentication" = ONE feature (login + signup + profile + sessions)

**❌ Over-Segmentation Examples:**
- "Navigation + Hero + Forms" = This is 1 landing page feature
- "Products + Cart + Checkout" = This is 1 e-commerce feature
- "Posts + Comments + Admin" = This is 1 blog feature

**Discovery Questions:**
1. "What does the user want to accomplish?" 
2. "Describe the complete user journey from start to finish"
3. "What would you call this functionality from a user perspective?"
4. "Would breaking this up confuse the user experience?"

### 3. Architecture Confirmation
**Frontend:** Show ASCII mockups for UI components and user flows
**Backend:** Show API endpoint structure and data relationships
**Integration:** Confirm how frontend and backend connect

### 4. Feature Validation Checkpoint

**Before creating FEATURES.md, validate feature scope:**

Ask yourself:
- Do any of these serve the same user goal? → Merge them
- Would a user use these together in one session? → Merge them  
- Are any of these just implementation details? → Make them tasks, not features
- Could this confuse the user experience if split? → Keep as one feature

**Aim for 1-3 features maximum for most requests.**

### 5. Create FEATURES.md
Only after explicit user confirmation and validation checkpoint.

### 5. Full-Stack Analysis & Setup
```typescript
// Analyze frontend components needed
const uiAnalysis = await mcp_queen_mcp_analyze_features_for_components({ features });

// Analyze backend patterns needed
const backendAnalysis = await mcp_queen_mcp_analyze_backend_patterns({ 
  features,
  has_database: true,  // Based on /2b-setup-backend choices
  has_auth: true       // Based on /2b-setup-backend choices
});

// Install required shadcn components
const install = await mcp_queen_mcp_install_shadcn_components({ 
  components: uiAnalysis.required_components 
});

// Generate UI templates
const uiTemplates = await mcp_queen_mcp_regenerate_templates_file({});
```

## FEATURES.md Structure
```markdown
# Feature [N]: [Name]
**Purpose**: [User/business value]
**User Flow**: [Step-by-step user interaction]

## Frontend Requirements
**UI Components**: [Forms, displays, interactions needed]
**Pages/Layout**: [New pages, navigation changes, layout updates]
**State Management**: [What data the UI needs to track locally]
**User Experience**: [Key interactions, loading states, error handling]

## Backend Requirements
**API Endpoints**: [GET/POST/PUT/DELETE endpoints with paths]
**Database Models**: [New tables/fields, relationships, indexes]
**Authentication**: [Permissions, roles, access control rules]
**Data Validation**: [Input validation, business rules, constraints]
**External APIs**: [Third-party integrations, webhooks, services]

## Integration & Flow
**Data Flow**: [How frontend requests data from backend]
**Real-time Updates**: [WebSockets, polling, live data needs]
**Error Handling**: [API error responses, UI error states]
**Success Indicators**: [End-to-end validation criteria]
```

## 🚨 Critical Final Step
```bash
git add .
git commit -m "Setup complete: design system + frontend + backend + features specification"
git push origin main
```

## 🤖 Claude Instructions

**Prerequisites:** Verify complete foundation exists:
```bash
[ -f "DESIGN_SYSTEM.md" ] && [ -f "src/app/globals.css" ] && [ -f "prisma/schema.prisma" ] && echo "✅ Ready" || echo "❌ Run setup commands first"
```

**Full-Stack Planning Process:**
1. **Discovery:** Features, app type, users, primary goals
2. **Data Planning:** What data to store, user permissions, external integrations
3. **Frontend Planning:** UI components, pages, user interactions  
4. **Backend Planning:** API endpoints, database models, auth requirements
5. **Architecture Confirmation:** Show both UI mockups AND API structure
6. **Full-Stack Analysis:** Use MCP tools for both frontend and backend pattern analysis
7. **Explicit Approval:** Get confirmation for complete feature specification
8. **Must commit and push** before /4-start-features
9. Keep FEATURES.md under 200 lines total (increased for backend sections)