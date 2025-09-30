---
name: create-component
description: Create a new React component with TypeScript, following Next.js conventions
---

Create a new React component with proper TypeScript types, following Next.js and project conventions.

## Usage
Generate components in the correct location with proper structure:
- Use `src/components/[feature]/ComponentName.tsx` pattern
- Include proper TypeScript interfaces for props
- Follow project styling patterns (Tailwind CSS)
- Include proper export structure

## Component Structure
- TypeScript interface for props
- Proper component function declaration
- JSX with semantic HTML
- Tailwind CSS classes following project patterns
- Export as default

## File Location Rules
- Feature-based organization: `src/components/auth/`, `src/components/ui/`
- PascalCase component names
- `.tsx` extension for components with JSX
- Index files for clean imports when appropriate