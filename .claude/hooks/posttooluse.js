#!/usr/bin/env node
/**
 * Queen Styles - Design System Compliance Hook
 * Enforces design system usage in .tsx files
 */

const fs = require("fs");
const path = require("path");

// Color codes
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m"
};

/**
 * Read JSON input from stdin
 */
async function readStdinInput() {
  let inputData = "";
  
  for await (const chunk of process.stdin) {
    inputData += chunk;
  }

  if (!inputData.trim()) {
    process.exit(0);
  }

  try {
    return JSON.parse(inputData);
  } catch (error) {
    process.exit(0);
  }
}

/**
 * Extract file path from tool input
 */
function extractFilePath(input) {
  const { tool_input } = input;
  return tool_input?.file_path || null;
}

/**
 * Main validation function
 */
async function main() {
  const input = await readStdinInput();
  const filePath = extractFilePath(input);
  const toolName = input.tool_name;

  // Fast exit if not a TSX file
  if (!filePath || !filePath.endsWith(".tsx")) {
    process.exit(0);
  }

  // Only check Edit, Write, MultiEdit operations
  if (!toolName || !["Edit", "Write", "MultiEdit"].includes(toolName)) {
    process.exit(0);
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const violations = [];
    
    // Check for shadcn component availability
    const availableShadcnComponents = [];
    const componentsUiPath = path.join(process.cwd(), "src/components/ui");
    if (fs.existsSync(componentsUiPath)) {
      const componentFiles = fs.readdirSync(componentsUiPath)
        .filter(file => file.endsWith(".tsx"))
        .map(file => file.replace(".tsx", ""));
      availableShadcnComponents.push(...componentFiles);
    }

    // Custom patterns to detect
    const customPatterns = [
      { pattern: /className="[^"]*bg-gradient-/, desc: "Custom gradient", suggestion: "Use bg-primary, bg-success" },
      { pattern: /className="[^"]*transform\s+[^"]*scale-/, desc: "Custom transform scale", suggestion: "Avoid custom transforms" },
      { pattern: /className="[^"]*rotate-/, desc: "Custom rotation", suggestion: "Use simple hover effects" },
      { pattern: /className="[^"]*bg-(red|blue|green|yellow|purple|pink|indigo|gray)-\d{3}/, desc: "Raw Tailwind color", suggestion: "Use bg-primary, bg-success, bg-error" },
      { pattern: /className="[^"]*text-(red|blue|green|yellow|purple|pink|indigo|gray)-\d{3}/, desc: "Raw text color", suggestion: "Use text-text-primary, text-text-secondary" },
      { pattern: /className="[^"]*p-[1-9]\d+/, desc: "Custom padding", suggestion: "Use ds-1, ds-2, ds-3, ds-4" },
      { pattern: /className="[^"]*m-[1-9]\d+/, desc: "Custom margin", suggestion: "Use ds-1, ds-2, ds-3, ds-4" },
      { pattern: /className="[^"]*shadow-(2xl|inner)/, desc: "Custom shadow", suggestion: "Use shadow-sm, shadow-md, shadow-lg" },
      { pattern: /className="[^"]*rounded-[2-9]\d*xl/, desc: "Custom border radius", suggestion: "Use rounded-ds-sm, rounded-ds-md, rounded-ds-lg" },
    ];
    
    // Check each line for violations
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      // Skip comments
      if (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*") || trimmedLine.startsWith("*")) {
        return;
      }
      
      // Skip string assignments
      if (trimmedLine.match(/^\s*const\s+\w+\s*=\s*["'`]/)) {
        return;
      }
      
      customPatterns.forEach(({ pattern, desc, suggestion }) => {
        if (pattern.test(line)) {
          violations.push({
            line: lineNumber,
            violation: desc,
            suggestion: suggestion
          });
        }
      });
    });
    
    // shadcn component usage enforcement
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*") || trimmedLine.startsWith("*")) {
        return;
      }
      
      // Check for custom button when shadcn Button exists
      if (availableShadcnComponents.includes("button") && 
          line.match(/<button[^>]*>/i) && 
          !content.includes('import { Button } from "@/components/ui/button"')) {
        violations.push({
          line: lineNumber,
          violation: "Custom button when shadcn Button exists",
          suggestion: 'Use: import { Button } from "@/components/ui/button"'
        });
      }
      
      // Check for custom card when shadcn Card exists
      if (availableShadcnComponents.includes("card") && 
          line.match(/<div[^>]*className="[^"]*border[^"]*p-[^"]*>/i) && 
          !content.includes('import { Card } from "@/components/ui/card"')) {
        violations.push({
          line: lineNumber,
          violation: "Custom card-like div when shadcn Card exists",
          suggestion: 'Use: import { Card } from "@/components/ui/card"'
        });
      }
      
      // Check for missing cn() utility when using complex classNames
      if (line.includes("className={") && 
          (line.includes("bg-primary") || line.includes("text-foreground")) &&
          !content.includes('import { cn } from "@/lib/utils"')) {
        violations.push({
          line: lineNumber,
          violation: "Missing cn() utility for shadcn styling",
          suggestion: 'Add: import { cn } from "@/lib/utils"'
        });
      }
    });
    
    // Button-specific check
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith("//") || trimmedLine.startsWith("/*") || trimmedLine.startsWith("*")) {
        return;
      }
      
      if (trimmedLine.match(/^\s*const\s+\w+\s*=\s*["'`]/)) {
        return;
      }
      
      const buttonRegex = /<[Bb]utton[^>]*className="([^"]+)"/g;
      let match;
      
      while ((match = buttonRegex.exec(line)) !== null) {
        const classes = match[1];
        
        if ((classes.includes("bg-") || classes.includes("border-")) && 
            !classes.includes("bg-primary") && 
            !classes.includes("bg-success") && 
            !classes.includes("bg-error") &&
            !classes.includes("bg-warning")) {
          
          violations.push({
            line: lineNumber,
            violation: "Custom button",
            suggestion: "Use approved button templates"
          });
        }
      }
    });
    
    // Report violations
    if (violations.length > 0) {
      const fileName = filePath.split(/[/\\]/).pop() || filePath;
      
      console.error("");
      console.error(`${colors.red}🛑 STOP! ${colors.yellow}${fileName}${colors.red} violates the design system${colors.reset}`);
      
      violations.forEach(violation => {
        console.error(`${colors.red}❌${colors.reset} ${colors.cyan}L${violation.line}${colors.reset}: ${violation.violation} ${colors.yellow}→${colors.reset} ${violation.suggestion}`);
      });
      
      console.error(`${colors.blue}📖 Fix using: COMPONENT_TEMPLATES.md + src/components/ui/${colors.reset}`);
      console.error("");
      process.exit(2);
    }
    
    // Success
    process.exit(0);
    
  } catch (error) {
    process.exit(0);
  }
}

// Run main
main().catch(() => process.exit(1));