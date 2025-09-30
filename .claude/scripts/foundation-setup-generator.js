/**
 * Foundation Setup Generator
 * Reads DESIGN_SYSTEM.md and generates complete Next.js foundation setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseDesignSystem(designSystemContent) {
  const lines = designSystemContent.split('\n');
  
  // Extract theme name
  const themeLine = lines.find(line => line.includes('Color Palette:'));
  const themeName = themeLine ? themeLine.replace('## 🌈 Color Palette: ', '').trim() : 'Custom Theme';
  
  // Extract colors (look for hex values)
  const colorPattern = /#[0-9A-Fa-f]{6}/g;
  const hexColors = designSystemContent.match(colorPattern) || [];
  
  // Extract specific colors by looking for their labels
  const extractColor = (label) => {
    const line = lines.find(line => line.includes(label) && line.includes('#'));
    const match = line ? line.match(/#[0-9A-Fa-f]{6}/) : null;
    return match ? match[0] : '#000000';
  };
  
  const colors = {
    primary: extractColor('**Primary:**'),
    success: extractColor('**Success:**'),
    error: extractColor('**Error:**'),
    warning: extractColor('**Warning:**'),
    background: extractColor('**Background:**'),
    surface: extractColor('**Surface:**'),
    textPrimary: extractColor('**Primary Text:**'),
    textSecondary: extractColor('**Secondary Text:**')
  };
  
  // Extract font information
  const typographyLine = lines.find(line => line.includes('Typography:'));
  const fontMatch = typographyLine ? typographyLine.match(/Typography: (.+)/) : null;
  const fontPairing = fontMatch ? fontMatch[1].trim() : 'Inter + Inter';
  
  // Parse font details
  const headingLine = lines.find(line => line.includes('**Headings:**'));
  const bodyLine = lines.find(line => line.includes('**Body:**'));
  
  const headingFont = headingLine ? headingLine.match(/\*\*Headings:\*\* (.+?) \d+/)?.[1] || 'Inter' : 'Inter';
  const bodyFont = bodyLine ? bodyLine.match(/\*\*Body:\*\* (.+?) \d+/)?.[1] || 'Inter' : 'Inter';
  const headingWeight = headingLine ? headingLine.match(/(\d+)$/)?.[1] || '600' : '600';
  const bodyWeight = bodyLine ? bodyLine.match(/(\d+)$/)?.[1] || '400' : '400';
  
  // Extract spacing info
  const spacingLine = lines.find(line => line.includes('Scale:'));
  const spacingType = spacingLine ? spacingLine.replace('### Scale: ', '').trim() : 'Balanced';
  
  // Extract radius info
  const radiusLine = lines.find(line => line.includes('--radius:'));
  const radiusMatch = radiusLine ? radiusLine.match(/--radius: ([0-9.]+)/) : null;
  const radius = radiusMatch ? radiusMatch[1] : '0.5';
  
  return {
    themeName,
    colors,
    fonts: {
      heading: headingFont,
      body: bodyFont,
      headingWeight,
      bodyWeight,
      pairing: fontPairing
    },
    spacing: {
      type: spacingType
    },
    radius
  };
}

function extractOklchFromDesignSystem(content) {
  // Extract OKLCH values that are already generated in DESIGN_SYSTEM.md
  const lines = content.split('\n');
  const oklchVars = {};
  
  // Find CSS variables section
  const cssStart = content.indexOf(':root {');
  if (cssStart !== -1) {
    const cssEnd = content.indexOf('}', cssStart);
    const cssSection = content.substring(cssStart, cssEnd);
    
    // Extract all --variable: value pairs
    const varPattern = /--([\w-]+):\s*([^;]+);/g;
    let match;
    while ((match = varPattern.exec(cssSection)) !== null) {
      oklchVars[match[1]] = match[2].trim();
    }
  }
  
  return oklchVars;
}

function generateGlobalsCss(designSystem, oklchVars) {
  // Use extracted OKLCH values or fallbacks
  const getVar = (name, fallback) => oklchVars[name] || fallback;
  
  return `@tailwind base;
@tailwind components;  
@tailwind utilities;

@layer base {
  :root {
    /* Core theme colors */
    --background: ${getVar('background', '1 0 0')};
    --foreground: ${getVar('foreground', '0.1 0 0')};
    
    /* Component backgrounds */
    --card: ${getVar('card', '1 0 0')};
    --card-foreground: ${getVar('card-foreground', '0.1 0 0')};
    --popover: ${getVar('popover', '1 0 0')};
    --popover-foreground: ${getVar('popover-foreground', '0.1 0 0')};
    
    /* Interactive elements */
    --primary: ${getVar('primary', '0.5 0.2 250')};
    --primary-foreground: ${getVar('primary-foreground', '1 0 0')};
    --secondary: ${getVar('secondary', '0.95 0.02 250')};
    --secondary-foreground: ${getVar('secondary-foreground', '0.1 0 0')};
    
    /* Muted and accent states */
    --muted: ${getVar('muted', '0.95 0.02 250')};
    --muted-foreground: ${getVar('muted-foreground', '0.45 0.02 250')};
    --accent: ${getVar('accent', '0.95 0.02 250')};
    --accent-foreground: ${getVar('accent-foreground', '0.1 0 0')};
    
    /* State colors */
    --destructive: ${getVar('destructive', '0.6 0.2 20')};
    --destructive-foreground: ${getVar('destructive-foreground', '1 0 0')};
    
    /* Form and border elements */
    --border: ${getVar('border', '0.9 0.02 250')};
    --input: ${getVar('input', '0.9 0.02 250')};
    --ring: ${getVar('ring', '0.5 0.1 250')};
    
    /* Border radius */
    --radius: ${designSystem.radius}rem;
    
    /* Legacy colors for custom components */
    --success: ${getVar('success', '0.6 0.2 120')};
    --warning: ${getVar('warning', '0.7 0.2 60')};
    --surface: ${getVar('surface', '0.98 0.02 250')};
    --text-primary: ${getVar('text-primary', '0.1 0 0')};
    --text-secondary: ${getVar('text-secondary', '0.45 0.02 250')};
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --background: 0.145 0 0;
      --foreground: 0.985 0 0;
      --card: 0.205 0 0;
      --card-foreground: 0.985 0 0;
      --popover: 0.205 0 0;
      --popover-foreground: 0.985 0 0;
      --primary: ${oklchVars['primary-dark'] || '0.7 0.2 250'};
      --primary-foreground: 0.145 0 0;
      --secondary: 0.269 0 0;
      --secondary-foreground: 0.985 0 0;
      --muted: 0.269 0 0;
      --muted-foreground: 0.708 0 0;
      --accent: 0.269 0 0;
      --accent-foreground: 0.985 0 0;
      --destructive: ${oklchVars['destructive-dark'] || '0.7 0.2 20'};
      --destructive-foreground: 0.985 0 0;
      --border: 1 0 0 / 10%;
      --input: 0.269 0 0;
      --ring: ${oklchVars['ring-dark'] || '0.8 0.2 250'};
      
      /* Legacy colors for dark mode */
      --success: ${oklchVars['success-dark'] || '0.7 0.2 120'};
      --warning: ${oklchVars['warning-dark'] || '0.8 0.2 60'};
      --surface: 0.269 0 0;
      --text-primary: 0.985 0 0;
      --text-secondary: 0.708 0 0;
    }
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}`;
}

function generateTailwindConfig(designSystem) {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // shadcn/ui colors (CSS variables)
      colors: {
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
        
        // Legacy colors for custom components
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        surface: "hsl(var(--surface))",
        'text-primary': "hsl(var(--text-primary))",
        'text-secondary': "hsl(var(--text-secondary))",
      },
      fontFamily: {
        heading: ['${designSystem.fonts.heading}', 'sans-serif'],
        body: ['${designSystem.fonts.body}', 'sans-serif'],
      },
      spacing: {
        'ds-1': '0.25rem',
        'ds-2': '0.5rem', 
        'ds-3': '0.75rem',
        'ds-4': '1rem',
        'ds-5': '1.25rem',
        'ds-6': '1.5rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'ds-sm': '0.25rem',
        'ds-md': '0.5rem',
        'ds-lg': '0.75rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;
}

function generateLayoutTsx(designSystem) {
  // Convert font names to Next.js import names
  const getNextFontName = (fontName) => {
    return fontName.replace(/\s+/g, '_');
  };
  
  const headingImport = getNextFontName(designSystem.fonts.heading);
  const bodyImport = getNextFontName(designSystem.fonts.body);
  
  return `import { ${headingImport}${headingImport !== bodyImport ? ', ' + bodyImport : ''} } from 'next/font/google'
import './globals.css'

const headingFont = ${headingImport}({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

const bodyFont = ${bodyImport}({
  subsets: ['latin'], 
  weight: ['400', '500'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${headingFont.variable} \${bodyFont.variable}\`}>
      <body>
        {children}
      </body>
    </html>
  )
}`;
}

function generateUtils() {
  return `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;
}

function generateComponentsJson() {
  return `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils"
  }
}`;
}

function setupFoundation() {
  try {
    // Step 1: Read and parse DESIGN_SYSTEM.md
    const designSystemPath = path.join(process.cwd(), 'DESIGN_SYSTEM.md');
    if (!fs.existsSync(designSystemPath)) {
      throw new Error('DESIGN_SYSTEM.md not found. Please run /1-setup-design first.');
    }
    
    const designSystemContent = fs.readFileSync(designSystemPath, 'utf8');
    const designSystem = parseDesignSystem(designSystemContent);
    const oklchVars = extractOklchFromDesignSystem(designSystemContent);
    
    // Step 2: Initialize shadcn/ui
    console.log('Initializing shadcn/ui...');
    try {
      execSync('npx shadcn@latest init --yes --defaults', { 
        stdio: 'pipe',
        cwd: process.cwd() 
      });
    } catch (shadcnError) {
      console.log('Note: shadcn init may have failed, but continuing with file generation...');
    }
    
    // Step 3: Generate all configuration files
    const files = {
      'src/app/globals.css': generateGlobalsCss(designSystem, oklchVars),
      'tailwind.config.js': generateTailwindConfig(designSystem),
      'src/app/layout.tsx': generateLayoutTsx(designSystem),
      'src/lib/utils.ts': generateUtils(),
      'components.json': generateComponentsJson()
    };
    
    // Step 4: Ensure directories exist and write files
    const results = [];
    Object.entries(files).forEach(([filePath, content]) => {
      const fullPath = path.join(process.cwd(), filePath);
      const dir = path.dirname(fullPath);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write file
      fs.writeFileSync(fullPath, content, 'utf8');
      results.push(filePath);
    });
    
    return {
      success: true,
      theme_name: designSystem.themeName,
      font_pairing: designSystem.fonts.pairing,
      files_created: results,
      message: `Foundation setup complete with ${designSystem.themeName} theme and ${designSystem.fonts.pairing} fonts`
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupFoundation };
}

// Export for browser usage  
if (typeof window !== 'undefined') {
  window.setupFoundation = setupFoundation;
}