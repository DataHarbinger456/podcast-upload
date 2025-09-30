# tvr-upload

A modern Next.js application built with Queen Claude foundation.

## 🚀 What's Included (31 Packages)

### Core Stack
- ⚡ **Next.js 15** with App Router
- 🔒 **TypeScript** in strict mode  
- 🎨 **Tailwind CSS** with dark mode support

### Authentication & Database
- 🔐 **NextAuth.js v5** - GitHub, Google, email auth
- 🗄️ **Prisma** - Type-safe database ORM
- ⚙️ **Type-safe env vars** - Runtime validation

### Forms & UI
- 📝 **React Hook Form + Zod** - Forms with validation
- 🎯 **Radix UI** - 8 primitive components (modals, dropdowns, etc.)
- 🌟 **Framer Motion** - Smooth animations
- 📁 **React Dropzone** - File upload handling

### State & Data
- 🏪 **Zustand** - Client state management  
- 🔄 **TanStack Query** - Server state, caching, mutations
- 📡 **Axios** - HTTP client

### Developer Experience  
- 🧪 **Vitest + Testing Library** - Fast testing
- 🛠️ **ESLint + Prettier** - Code quality
- 🪝 **Husky** - Git hooks
- 🔍 **Next SEO** - Meta tag management

## 📋 Essential Files

- **📦 CAPABILITIES.md** - Complete list of 31 pre-installed packages and usage examples
- **🎨 DESIGN_SYSTEM_TEMPLATE.md** - Ready for `/1-setup-design` command to create your design system
- **⚙️ .env.example** - Environment variables template

## 🎨 Design System Setup

**Before building UI, set up your design system:**

```bash
# In Claude Code, run these commands in sequence:
/1-setup-design     # Choose colors, fonts, spacing
/2-setup-foundation # Configure Tailwind + create templates
```

This will:
1. Let you choose from 8 proven color themes (Apple, Stripe, GitHub, etc.)
2. Select from 5 battle-tested font pairings (Inter, Montserrat, etc.)  
3. Configure spacing and styling preferences
4. Generate `DESIGN_SYSTEM.md` + update `tailwind.config.js` + create `COMPONENT_TEMPLATES.md`

**Why this matters:** Agents get working, customized component patterns instead of hardcoded values.

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 8.0 or later

### Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database (SQLite ready out of the box)
npm run db:push

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Database (Prisma)
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations  
- `npm run db:studio` - Open database GUI

### Testing
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Analysis
- `npm run analyze` - Analyze bundle size

## Project Structure

```
├── CAPABILITIES.md         # 31 pre-installed packages reference
├── DESIGN_SYSTEM_TEMPLATE.md # Template for /1-setup-design command
├── .env.example           # Environment variables template
├── prisma/schema.prisma   # Database schema
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/auth/       # NextAuth API routes
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── __tests__/      # Page tests
│   ├── components/         # Reusable components + providers
│   ├── lib/               # Auth, Prisma, utilities
│   ├── stores/            # Zustand state management  
│   └── types/             # TypeScript definitions
├── styles/globals.css     # Minimal Tailwind foundation
└── ...config files
```

## Quality Gates

This project includes pre-commit hooks that automatically:
- Run ESLint and fix issues
- Format code with Prettier
- Ensure type safety with TypeScript

## Testing

Tests are written with Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Bundle Analysis

Analyze your bundle size to optimize performance:

```bash
npm run analyze
```

## 🚀 Quick Start Checklist

1. ✅ **Install dependencies:** `npm install`
2. ✅ **Set up environment:** `cp .env.example .env.local` 
3. ✅ **Initialize database:** `npm run db:push`
4. 🎨 **Create design system:** Run `/1-setup-design` in Claude Code
5. 📦 **Check capabilities:** Read `CAPABILITIES.md` for available packages
6. 🛠️ **Start building:** `npm run dev`

## 🤖 For Autonomous Development

**Key Files for AI Agents:**
- **CAPABILITIES.md** - Prevents unnecessary package installations
- **DESIGN_SYSTEM.md** - Ensures consistent UI design (created by `/1-setup-design`)
- **Examples:** Check `src/components/` and `src/lib/` for usage patterns

## Built with Queen Claude

This foundation includes 31 essential packages covering authentication, database, forms, UI components, state management, and more - everything needed to build modern web applications without constantly installing dependencies.

**Next steps:** Run `/1-setup-design` to create your design system, then start building!