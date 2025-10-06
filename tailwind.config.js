/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using HSL format to match template expectations
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Design system colors
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        surface: "hsl(var(--surface-color))",
        "text-primary": "hsl(var(--text-primary-color))",
        "text-secondary": "hsl(var(--text-secondary-color))",
        // Rainbow button colors
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      spacing: {
        "ds-1": "12px",
        "ds-2": "24px",
        "ds-3": "36px",
        "ds-4": "48px",
        "ds-5": "60px",
        "ds-6": "72px"
},
      borderRadius: {
        lg: "0.5rem",
        md: "0.38rem",
        sm: "0.25rem",
        DEFAULT: "0.5rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        "rainbow": "rainbow var(--speed, 2s) infinite linear",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
        "rainbow": {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
    },
  },
  safelist: [
    // Design system spacing classes - always include
    "ds-1", "ds-2", "ds-3", "ds-4", "ds-5", "ds-6",
    // Padding variants
    "p-ds-1", "p-ds-2", "p-ds-3", "p-ds-4", "p-ds-5", "p-ds-6",
    "px-ds-1", "px-ds-2", "px-ds-3", "px-ds-4", "px-ds-5", "px-ds-6",
    "py-ds-1", "py-ds-2", "py-ds-3", "py-ds-4", "py-ds-5", "py-ds-6",
    "pt-ds-1", "pt-ds-2", "pt-ds-3", "pt-ds-4", "pt-ds-5", "pt-ds-6",
    "pb-ds-1", "pb-ds-2", "pb-ds-3", "pb-ds-4", "pb-ds-5", "pb-ds-6",
    "pl-ds-1", "pl-ds-2", "pl-ds-3", "pl-ds-4", "pl-ds-5", "pl-ds-6",
    "pr-ds-1", "pr-ds-2", "pr-ds-3", "pr-ds-4", "pr-ds-5", "pr-ds-6",
    // Margin variants
    "m-ds-1", "m-ds-2", "m-ds-3", "m-ds-4", "m-ds-5", "m-ds-6",
    "mx-ds-1", "mx-ds-2", "mx-ds-3", "mx-ds-4", "mx-ds-5", "mx-ds-6",
    "my-ds-1", "my-ds-2", "my-ds-3", "my-ds-4", "my-ds-5", "my-ds-6",
    "mt-ds-1", "mt-ds-2", "mt-ds-3", "mt-ds-4", "mt-ds-5", "mt-ds-6",
    "mb-ds-1", "mb-ds-2", "mb-ds-3", "mb-ds-4", "mb-ds-5", "mb-ds-6",
    "ml-ds-1", "ml-ds-2", "ml-ds-3", "ml-ds-4", "ml-ds-5", "ml-ds-6",
    "mr-ds-1", "mr-ds-2", "mr-ds-3", "mr-ds-4", "mr-ds-5", "mr-ds-6",
    // Gap variants for flexbox/grid
    "gap-ds-1", "gap-ds-2", "gap-ds-3", "gap-ds-4", "gap-ds-5", "gap-ds-6",
    "gap-x-ds-1", "gap-x-ds-2", "gap-x-ds-3", "gap-x-ds-4", "gap-x-ds-5", "gap-x-ds-6",
    "gap-y-ds-1", "gap-y-ds-2", "gap-y-ds-3", "gap-y-ds-4", "gap-y-ds-5", "gap-y-ds-6",
    // Space between variants
    "space-x-ds-1", "space-x-ds-2", "space-x-ds-3", "space-x-ds-4", "space-x-ds-5", "space-x-ds-6",
    "space-y-ds-1", "space-y-ds-2", "space-y-ds-3", "space-y-ds-4", "space-y-ds-5", "space-y-ds-6",

    // Design system colors (universal across all themes)
    "bg-primary", "bg-secondary", "bg-destructive", "bg-success", "bg-warning",
    "bg-muted", "bg-accent", "bg-background", "bg-foreground", "bg-card", "bg-popover",
    "bg-surface", "text-primary", "text-secondary", "text-muted-foreground", "text-foreground",
    "border-primary", "border-secondary", "border-destructive", "border-muted", "border-border",

    // Interactive states
    "hover:bg-primary", "hover:bg-secondary", "hover:bg-destructive", "hover:text-primary",
    "focus:bg-primary", "focus:ring-primary", "focus:ring-2", "focus:outline-none",
    "disabled:opacity-50", "disabled:pointer-events-none",

    // Typography (universal)
    "font-heading", "font-body", "text-xs", "text-sm", "text-base", "text-lg", "text-xl",
    "font-normal", "font-medium", "font-semibold", "font-bold",

    // Common layout utilities
    "flex", "inline-flex", "grid", "block", "inline-block", "hidden",
    "items-center", "items-start", "items-end", "justify-center", "justify-between",
    "w-full", "h-full", "min-h-screen", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl",
  ],
  plugins: [require("tailwindcss-animate")],
}