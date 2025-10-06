#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Fast exit if not a TSX file
const filePath = process.argv[2];
const toolUsed = process.argv[3];

if (!filePath || !filePath.endsWith(".tsx")) {
  process.exit(0);
}

// Only check Edit, Write, MultiEdit operations
if (!toolUsed || !["Edit", "Write", "MultiEdit"].includes(toolUsed)) {
  process.exit(0);
}

try {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  
  // Track violations with line numbers
  const violations = [];
  
  // Pattern definitions with descriptions
  const customPatterns = [
    { pattern: /className="[^"]*bg-gradient-/, desc: "Custom gradient", suggestion: "Use bg-primary, bg-success, etc." },
    { pattern: /className="[^"]*transform\s+[^"]*scale-/, desc: "Custom transform scale", suggestion: "Avoid custom transforms" },
    { pattern: /className="[^"]*rotate-/, desc: "Custom rotation", suggestion: "Use simple hover effects" },
    { pattern: /className="[^"]*bg-(red|blue|green|yellow|purple|pink|indigo|gray)-\d{3}/, desc: "Raw Tailwind color", suggestion: "Use bg-primary, bg-success, bg-error, bg-warning" },
    { pattern: /className="[^"]*text-(red|blue|green|yellow|purple|pink|indigo|gray)-\d{3}/, desc: "Raw Tailwind text color", suggestion: "Use text-text-primary, text-text-secondary" },
    { pattern: /className="[^"]*p-[1-9]\d+/, desc: "Custom padding", suggestion: "Use ds-1, ds-2, ds-3, ds-4, ds-5, ds-6" },
    { pattern: /className="[^"]*m-[1-9]\d+/, desc: "Custom margin", suggestion: "Use ds-1, ds-2, ds-3, ds-4, ds-5, ds-6" },
    { pattern: /className="[^"]*shadow-(2xl|inner)/, desc: "Custom shadow", suggestion: "Use shadow-sm, shadow-md, shadow-lg" },
    { pattern: /className="[^"]*ring-\d+/, desc: "Custom ring", suggestion: "Use focus:border-primary focus:ring-2 focus:ring-primary/20" },
    { pattern: /className="[^"]*rounded-[2-9]\d*xl/, desc: "Custom border radius", suggestion: "Use rounded-ds-sm, rounded-ds-md, rounded-ds-lg" },
  ];
  
  // Track string/template literal context to avoid false positives
  let inTemplateString = false;
  let inMultilineString = false;
  
  // Check each line for violations (skip comments and strings)
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();
    
    // Skip comment lines
    if (trimmedLine.startsWith("//") || 
        trimmedLine.startsWith("/*") || 
        trimmedLine.startsWith("*") ||
        trimmedLine.startsWith("*/")) {
      return;
    }
    
    // Track template string state
    if (trimmedLine.includes("`")) {
      inTemplateString = !inTemplateString;
    }
    
    // Skip string assignment lines
    if (trimmedLine.match(/^\s*const\s+\w+\s*=\s*["']/)) {
      return;
    }
    
    // Skip if we're inside a template string (unless it contains React components)
    if (inTemplateString && !trimmedLine.match(/<[A-Z]\w+/)) {
      return;
    }
    
    // Only check actual JSX/TSX className attributes
    customPatterns.forEach(({ pattern, desc, suggestion }) => {
      if (pattern.test(line)) {
        violations.push({
          line: lineNumber,
          content: line.trim(),
          violation: desc,
          suggestion: suggestion
        });
      }
    });
  });
  
  // Check for template compliance indicators
  const templatePatterns = [
    /bg-primary/, /bg-success/, /bg-error/, /bg-warning/,
    /font-heading/, /font-body/,
    /ds-\d+/, /rounded-ds-/,
    /text-text-primary/, /text-text-secondary/
  ];
  
  const hasTemplate = templatePatterns.some(pattern => pattern.test(content));
  
  // Button-specific check with line numbers (skip comments and strings)
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();
    
    // Skip comment lines
    if (trimmedLine.startsWith("//") || 
        trimmedLine.startsWith("/*") || 
        trimmedLine.startsWith("*") ||
        trimmedLine.startsWith("*/")) {
      return;
    }
    
    // Skip string assignment lines (const x = "...", const y = '...', const z = `...`)
    if (trimmedLine.match(/^\s*const\s+\w+\s*=\s*["'`]/)) {
      return;
    }
    
    // Skip lines inside template literals that don't contain actual JSX elements
    if (trimmedLine.match(/^\s*["'`]/) && !trimmedLine.match(/<[A-Z]/)) {
      return;
    }
    
    const buttonRegex = /<[Bb]utton[^>]*className="([^"]+)"/g;
    let match;
    
    while ((match = buttonRegex.exec(line)) !== null) {
      const classes = match[1];
      
      // If button has custom styling but no design system tokens
      if ((classes.includes("bg-") || classes.includes("border-")) && 
          !classes.includes("bg-primary") && 
          !classes.includes("bg-success") && 
          !classes.includes("bg-error") &&
          !classes.includes("bg-warning")) {
        
        violations.push({
          line: lineNumber,
          content: line.trim(),
          violation: "Custom button implementation",
          suggestion: "Use button templates from COMPONENT_TEMPLATES.md"
        });
      }
    }
  });
  
  // Report violations if found (regardless of template presence)
  if (violations.length > 0) {
    // Handle both Windows (\) and Unix (/) path separators
    const fileName = filePath.split(/[/\\]/).pop() || filePath;
    console.error(`❌ Design system violations in ${fileName}:`);
    console.error(`📁 File: ${filePath}`);
    console.error("");
    
    violations.forEach(violation => {
      console.error(`🚨 Line ${violation.line}: ${violation.violation}`);
      console.error(`   ${violation.content}`);
      console.error(`💡 ${violation.suggestion}`);
      console.error("");
    });
    
    console.error("📖 Reference: COMPONENT_TEMPLATES.md");
    console.error("🎨 Colors: DESIGN_SYSTEM.md");
    process.exit(2);
  }
  
  // Success - passes basic compliance check
  process.exit(0);
  
} catch (error) {
  // Don't fail the hook if we can't read the file
  console.error(`⚠️  Could not validate ${filePath}: ${error.message}`);
  process.exit(0);
}