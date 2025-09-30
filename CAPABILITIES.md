# 🚀 Available Capabilities

This project includes 31 pre-installed packages covering 90%+ of web app needs.

## 🔐 Authentication
- **next-auth** (v5) - GitHub, Google, email auth
- **@auth/prisma-adapter** - Database integration
- Example: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`

## 🗄️ Database & ORM  
- **@prisma/client** + **prisma** - Type-safe database queries
- **SQLite** ready (dev.db), easily switch to PostgreSQL/MySQL
- Example: `src/lib/prisma.ts`, `prisma/schema.prisma`

## 📝 Forms & Validation
- **react-hook-form** - Form state management
- **zod** - Schema validation (client + server)
- **@hookform/resolvers** - Connect zod to forms
- Example: `src/components/ExampleForm.tsx`

## 🎨 UI Components (shadcn/ui)
- **Complete component library** - 50+ production-ready components
- **Code distribution system** - Components copied to src/components/ui/ (not installed as dependencies)
- **Radix UI foundation** - Headless, accessible primitives
- **Design system integration** - Automatically themed with your colors/fonts
- **Full ownership** - Component source code copied to your project for customization

**Available Components:**
Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

- **tailwindcss** - Utility-first CSS with design system tokens
- **lucide-react** - 1000+ professional icons

## 🎨 Icons & Visual Elements
- **ALWAYS use lucide-react icons** - Never use emojis in UI components
- **Icon examples**: `<Search />`, `<User />`, `<Menu />`, `<ChevronDown />`
- **Import pattern**: `import { Search, User, Menu } from "lucide-react"`
- **Styling**: Icons inherit text color and can be sized with className
- **Professional appearance**: Lucide icons maintain design system consistency

## 🎯 State Management
- **zustand** - Client state (with persistence)
- **@tanstack/react-query** - Server state, caching, mutations
- **@tanstack/react-query-devtools** - Debug tools
- Examples: `src/stores/example-store.ts`, `src/lib/query-client.tsx`

## 🌟 Enhanced Features
- **next-themes** - Dark/light mode switching
- **react-dropzone** - File upload handling
- **framer-motion** - Smooth animations
- **date-fns** - Date manipulation
- **axios** - HTTP client
- **react-hot-toast** + **sonner** - Notifications
- **nanoid** - Unique ID generation

## ⚙️ Developer Experience
- **@t3-oss/env-nextjs** - Type-safe environment variables
- **next-seo** - SEO meta tags
- **vitest** + **@testing-library/react** - Testing
- **eslint** + **prettier** - Code quality
- **husky** + **lint-staged** - Git hooks

## 🚀 Quick Start Commands
```bash
# Database
npm run db:push        # Push schema to database
npm run db:generate    # Generate Prisma client
npm run db:studio      # Open database GUI

# Development  
npm run dev           # Start development server
npm run build         # Production build
npm run test          # Run tests
npm run type-check    # TypeScript validation
```

## 💡 What You DON'T Need to Install
- ❌ Form libraries (use react-hook-form + zod)
- ❌ UI component libs (use shadcn/ui - installed automatically)
- ❌ Individual Radix packages (shadcn/ui handles this)
- ❌ State management (use zustand + React Query)  
- ❌ Auth solutions (use NextAuth)
- ❌ HTTP clients (use axios)
- ❌ Icon libraries (use lucide-react)
- ❌ Animation libraries (use framer-motion)
- ❌ Date libraries (use date-fns)

## 🎯 shadcn/ui Component Usage (CRITICAL)

**How to Use shadcn Components:**
```tsx
// 1. Import from src/components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// 2. Import cn utility for styling
import { cn } from "@/lib/utils"

// 3. Use with design system CSS variables
<Button className={cn("bg-primary text-primary-foreground", className)}>
  Click me
</Button>

<Card className="bg-card text-card-foreground">
  <CardHeader>
    <CardTitle className="font-heading">Title</CardTitle>
  </CardHeader>
  <CardContent className="font-body">Content</CardContent>
</Card>
```

**Design System Integration:**
- ✅ **Always use CSS variables:** bg-primary, text-foreground, border-border
- ✅ **Always use cn() utility:** For conditional styling
- ✅ **USE INSTALLED COMPONENTS FIRST:** Check src/components/ui/ before building custom
- ✅ **Component Priority:** shadcn components → COMPONENT_TEMPLATES.md → Custom (last resort)
- ❌ **Never use hardcoded colors:** bg-blue-500, text-gray-900
- ❌ **Never build custom when shadcn exists:** Check src/components/ui/ first

## 🎯 Build Patterns
- **UI Components:** shadcn/ui components + your design system
- **Forms:** react-hook-form + zod + shadcn form components
- **Interactive Elements:** shadcn components (Dialog, Dropdown, etc.)
- **API calls:** axios + React Query
- **Auth:** NextAuth providers + middleware
- **Database:** Prisma queries + transactions  
- **Styling:** Tailwind utilities + CSS variables + shadcn theming
- **State:** zustand stores + React Query for server data