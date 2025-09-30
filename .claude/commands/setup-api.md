---
name: setup-api
description: Create Next.js API routes with proper TypeScript types, validation, and error handling
---

Create Next.js API routes following App Router API conventions with proper TypeScript types and error handling.

## Usage
Generate API routes in the correct App Router structure:
- Use `src/app/api/[endpoint]/route.ts` pattern
- Include proper TypeScript types for requests and responses
- Implement proper HTTP method handlers (GET, POST, PUT, DELETE)
- Add request validation and error handling

## API Route Structure
- Named exports for HTTP methods (GET, POST, etc.)
- Proper TypeScript types for request/response
- Request validation using TypeScript types
- Consistent error response format
- Security considerations (CORS, validation, sanitization)

## File Location Rules
- API routes: `src/app/api/users/route.ts`
- Dynamic API routes: `src/app/api/users/[id]/route.ts`
- Nested endpoints: `src/app/api/auth/login/route.ts`
- Proper HTTP status codes and JSON responses
- Middleware integration when needed