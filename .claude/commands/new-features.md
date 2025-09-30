---
name: new-features
description: Create feature specifications through interactive planning session
---

# Create New Features

Interactive feature planning session that discovers requirements, shows visual mockups, and creates comprehensive feature specifications for autonomous development.

## Usage

```
/new-features
```

## Process Overview

### Phase 1: Discovery
- Identify what features to build
- Understand the user's business/product
- Explore user experience requirements

### Phase 2: Deep Dive (per feature)
- Ask feature-specific questions
- Generate visual mockups
- Confirm behaviors and rules

### Phase 3: Specification
- Create detailed FEATURES.md
- ONLY after explicit confirmation
- Ready for task extraction

## Phase 1: Feature Discovery

Start with understanding WHAT they want to build:

```
"What features would you like to build?"
> [User describes features]

"Let me understand your project better:
1. What type of application is this?
2. Who are your target users?
3. What's the main goal of these features?"
```

## Phase 2: Feature-Specific Exploration

For each feature, adapt questions based on type:

### Authentication Features
```
1. "Who will use this system?" (customers/admins/both)
2. "How should users create accounts?" (email/social/both)
3. "What happens after login?" (dashboard/profile/previous page)
4. "How long should sessions last?" (1hr/24hr/remember me)
5. "Security needs?" (2FA/lockout/password rules)
```

### E-commerce Features
```
1. "What are you selling?" (physical/digital/services)
2. "Payment methods?" (card/PayPal/crypto)
3. "Shipping needed?" (yes/no/mixed)
4. "Inventory tracking?" (yes/no)
5. "Guest checkout?" (yes/no)
```

### Content Features
```
1. "What type of content?" (blog/docs/media)
2. "Who can create content?" (admins/users/both)
3. "Needs approval?" (yes/no)
4. "Categories/tags?" (yes/no)
5. "Search needed?" (yes/no)
```

### Dashboard/Analytics
```
1. "What metrics matter?" (sales/users/performance)
2. "Real-time updates?" (yes/no/some)
3. "Time ranges?" (daily/weekly/monthly/custom)
4. "Export needed?" (CSV/PDF/API)
5. "Who has access?" (everyone/admins/specific roles)
```

### API/Integration
```
1. "Which service?" (Stripe/Twilio/custom)
2. "What operations?" (read/write/both)
3. "Authentication type?" (API key/OAuth/webhook)
4. "Rate limits?" (yes/no/specific)
5. "Error handling?" (retry/notify/log)
```

## Visual Mockup Generation

After understanding requirements, show ASCII mockups:

### For UI Features:
```
Here's what I'll build:

┌─────────────────────────────┐
│     Login Page (/login)     │
│                              │
│   ┌──────────────────┐      │
│   │ 📧 Email         │      │
│   └──────────────────┘      │
│   ┌──────────────────┐      │
│   │ 🔒 Password      │      │
│   └──────────────────┘      │
│   □ Remember me (30 days)   │
│                              │
│   [Sign In] [Google Login]  │
│   Forgot password?          │
└─────────────────────────────┘

Does this layout work for you?
```

### For Data Flows:
```
User Flow:
1. User enters email
   ↓ (validate format)
2. User enters password
   ↓ (check strength)
3. Clicks "Sign In"
   ↓ (show loading)
4. Success: → Dashboard
   Error: → Show message

Is this flow correct?
```

### For API/Backend:
```
Data Flow:
[Client] → POST /api/checkout
         ↓
      Validate cart
         ↓
      Create payment session
         ↓
      Return checkout URL
         ↓
[Client] → Stripe checkout
         ↓
[Webhook] → Update order status

Does this match your needs?
```

## Behavior Confirmation

List specific behaviors for confirmation:

```
Let me confirm the behaviors:

✓ Valid login → Redirect to dashboard
✓ Invalid login → Show "Invalid credentials"
✓ 3 failed attempts → Lock for 5 minutes
✓ Forgot password → Send reset email
✓ Session timeout → 1 hour inactive
✓ Remember me → 30 day session

Type 'confirm' if correct, or tell me what to change.
```

## Final Confirmation

Before creating FEATURES.md:

```
## Ready to Create Feature Specifications

I'll document these features:

1. **User Authentication**
   - Email/password login
   - Google OAuth option
   - Password reset flow
   - Account lockout security

2. **Shopping Cart**
   - Add/remove products
   - Quantity management
   - Coupon codes
   - Persistent storage

This will create a FEATURES.md file that autonomous agents
will use to build your features.

Ready to proceed? (yes/revise/cancel)
```

## FEATURES.md Template

ONLY create after confirmation. Use this structure:

```markdown
# Project Features

## Feature [Number]: [Feature Name]

**Purpose**: [Why this feature exists - user/business value]

**User Journey**:
1. [Step-by-step user flow]
2. [From entry to completion]
3. [Including decision points]

**Functional Scope**:
- [What the feature MUST do]
- [Core functionality included]
- [Explicitly list what's included]
- [Note what's NOT included if unclear]

**Interface Elements**:
```
[ASCII mockup or description]
[Show layout and components]
```

**User Interactions**:
- [Element]: [What happens when interacted with]
- [Button]: [Click behavior and feedback]
- [Form]: [Validation and submission behavior]

**Business Rules**:
- [Constraints and requirements]
- [Validation rules]
- [Limits and thresholds]
- [Security requirements]

**Success Indicators**:
- [How we know the feature works]
- [Specific, measurable outcomes]
- [User can do X successfully]
- [System prevents Y correctly]

**Data Handled**:
- [What information is collected]
- [What needs to be stored]
- [What needs to be calculated]

**Integration Points**:
- [External services needed]
- [Other features it connects to]
- [APIs or systems involved]

---
```

## Adaptive Question Examples

The system should detect keywords and adapt:

### Detected: "payment" → Ask:
- Payment provider? (Stripe/PayPal/Square)
- One-time or subscriptions?
- Which currencies?
- Refund handling?

### Detected: "chat" → Ask:
- Real-time needed?
- Group chats or 1-to-1?
- Message history?
- File sharing?

### Detected: "search" → Ask:
- Searching what? (products/users/content)
- Filters needed?
- How many items?
- Fuzzy matching?

### Detected: "dashboard" → Ask:
- What metrics?
- Update frequency?
- Export options?
- Access control?

## Guidelines

### DO:
- Ask about user experience, not implementation
- Show visual mockups for confirmation
- Get explicit approval before creating FEATURES.md
- Focus on WHAT, not HOW
- Adapt questions to feature type

### DON'T:
- Ask technical implementation questions
- Create FEATURES.md without confirmation
- Include API schemas or database designs
- Prescribe specific technologies
- Ask more than 5-7 questions per feature

### Package Guidance:
When relevant, suggest packages in the conversation:
- "For the form validation, we can use react-hook-form with zod"
- "The chart visualization can use recharts or chart.js"
- But don't put implementation details in FEATURES.md

## Success Metrics

A good feature specification:
- ✅ Any developer could build it the same way
- ✅ Clear success criteria
- ✅ No ambiguity about functionality
- ✅ Visual representation included
- ✅ User journey is complete
- ✅ Business rules are explicit

## Important Notes

1. **NEVER auto-generate FEATURES.md** - Always require explicit confirmation
2. **Adapt to feature type** - Don't ask about UI for backend features
3. **Keep it user-focused** - Technical details come during implementation
4. **Visual when possible** - ASCII mockups help prevent misunderstandings
5. **Comprehensive but readable** - Complete specs without being overwhelming