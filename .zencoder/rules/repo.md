---
description: Repository Information Overview
alwaysApply: true
---

# Student Attendance & Results Portal Information

## Summary
Integrated platform for attendance management, result monitoring, and stakeholder communication. Built with Next.js and TypeScript, featuring role-based dashboards for students, teachers, and administrators.

## Structure
- **app/**: Next.js app router with root layout and main page
- **components/**: React components organized by role (admin, student, teacher) and UI elements
- **hooks/**: Custom React hooks for mobile detection and toast notifications
- **lib/**: Utility functions
- **public/**: Static assets including icons and placeholder images
- **styles/**: Global CSS styles

## Language & Runtime
**Language**: TypeScript  
**Version**: ES6 target, strict mode enabled  
**Build System**: Next.js 16.0.3  
**Package Manager**: pnpm  

## Dependencies
**Main Dependencies**:
- next: 16.0.3
- react: 19.2.0
- react-dom: 19.2.0
- @radix-ui/*: Various UI components (accordion, dialog, dropdown-menu, etc.)
- tailwindcss: ^4.1.9
- lucide-react: ^0.454.0
- recharts: latest
- react-hook-form: ^7.60.0
- zod: 3.25.76
- date-fns: 4.1.0
- next-themes: ^0.4.6

**Development Dependencies**:
- typescript: ^5
- @types/node: ^22
- @types/react: ^19
- @types/react-dom: ^19
- postcss: ^8.5
- autoprefixer: ^10.4.20
- @tailwindcss/postcss: ^4.1.9

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Main Files & Resources
**Entry Point**: app/page.tsx (client component handling authentication and role-based routing)  
**Layout**: app/layout.tsx (root layout with metadata and theme)  
**Configuration Files**: 
- next.config.mjs: Next.js configuration with TypeScript error ignoring and unoptimized images
- tsconfig.json: TypeScript configuration with ES6 target and path aliases
- components.json: Shadcn/ui configuration with New York style and Tailwind CSS
- postcss.config.mjs: PostCSS configuration for Tailwind CSS

## UI Framework
**Framework**: Shadcn/ui with Radix UI primitives  
**Styling**: Tailwind CSS v4 with CSS variables  
**Theme**: Dark mode default, supports light/dark switching  
**Icons**: Lucide React icons