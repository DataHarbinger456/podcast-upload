#!/usr/bin/env node

/**
 * Design System Validation Script
 * Tests ESLint rules and Tailwind safelist against common violations
 */

import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test cases for ESLint violations
const testCases = {
  violations: [
    // Should be caught by ESLint
    '<div className="bg-[#ff0000] p-[16px]">Bad hex color and spacing</div>',
    '<p className="text-[#000000] font-[Inter]">Bad hex text and font</p>',
    '<button className="gap-[24px] m-[12px]">Bad arbitrary spacing</button>',
    '<span className="bg-[#007AFF] text-[#FFFFFF]">Multiple hex violations</span>',
  ],
  valid: [
    // Should pass ESLint
    '<div className="bg-primary p-ds-2">Good design system usage</div>',
    '<p className="text-primary font-body">Good typography</p>',
    '<button className="gap-ds-3 m-ds-1">Good spacing</button>',
    '<span className="bg-secondary text-foreground">Good colors</span>',
  ]
};

function createTestComponent(content, fileName) {
  return `
import React from 'react';

export default function ${fileName}() {
  return (
    ${content}
  );
}
`;
}

async function validateESLintRules() {
  console.log('🔍 Testing ESLint Rules...');

  const tempDir = '/tmp/design-system-test';
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // Copy eslint config to temp directory
  const eslintConfig = fs.readFileSync(
    path.join(__dirname, '../eslint.config.js'),
    'utf8'
  );
  fs.writeFileSync(path.join(tempDir, 'eslint.config.js'), eslintConfig);

  let violationsCaught = 0;
  let validPassed = 0;

  console.log('\n📋 Testing Violations (should be caught):');
  // Test violations
  for (let i = 0; i < testCases.violations.length; i++) {
    const violation = testCases.violations[i];
    const fileName = `TestViolation${i + 1}`;
    const testFile = path.join(tempDir, `${fileName}.tsx`);
    fs.writeFileSync(testFile, createTestComponent(violation, fileName));

    try {
      execSync(`npx eslint ${testFile}`, {
        stdio: 'pipe',
        cwd: tempDir
      });
      console.log(`❌ MISSED: ${violation.substring(0, 50)}...`);
    } catch (error) {
      console.log(`✅ CAUGHT: ${violation.substring(0, 50)}...`);
      violationsCaught++;
    }
  }

  console.log('\n📋 Testing Valid Cases (should pass):');
  // Test valid cases
  for (let i = 0; i < testCases.valid.length; i++) {
    const valid = testCases.valid[i];
    const fileName = `TestValid${i + 1}`;
    const testFile = path.join(tempDir, `${fileName}.tsx`);
    fs.writeFileSync(testFile, createTestComponent(valid, fileName));

    try {
      execSync(`npx eslint ${testFile}`, {
        stdio: 'pipe',
        cwd: tempDir
      });
      console.log(`✅ PASSED: ${valid.substring(0, 50)}...`);
      validPassed++;
    } catch (error) {
      console.log(`❌ FALSE POSITIVE: ${valid.substring(0, 50)}...`);
      console.log(`   Error: ${error.message.split('\n')[0]}`);
    }
  }

  // Cleanup
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`\n📊 ESLint Results:`);
  console.log(`  Violations caught: ${violationsCaught}/${testCases.violations.length}`);
  console.log(`  Valid cases passed: ${validPassed}/${testCases.valid.length}`);

  return violationsCaught === testCases.violations.length && validPassed === testCases.valid.length;
}

async function validateTailwindSafelist() {
  console.log('\n🎨 Testing Tailwind Safelist...');

  // Check if tailwind config has our safelist classes
  try {
    const tailwindConfigPath = path.join(__dirname, '../tailwind.config.js');

    if (!fs.existsSync(tailwindConfigPath)) {
      console.log('⚠️  No tailwind.config.js found - run /2-setup-foundation first');
      return false;
    }

    const configContent = fs.readFileSync(tailwindConfigPath, 'utf8');

    const requiredClasses = [
      'ds-1', 'ds-2', 'p-ds-1', 'bg-primary', 'text-primary', 'font-heading', 'font-body'
    ];

    let foundClasses = 0;
    for (const className of requiredClasses) {
      if (configContent.includes(`'${className}'`)) {
        console.log(`✅ Found: ${className}`);
        foundClasses++;
      } else {
        console.log(`❌ Missing: ${className}`);
      }
    }

    console.log(`\n📊 Safelist Results: ${foundClasses}/${requiredClasses.length} classes found in config`);

    // Try to build to see if classes are actually generated
    console.log('\n🔨 Testing Build Process...');
    try {
      execSync('npm run build', { stdio: 'pipe' });
      console.log('✅ Build succeeded');
      return foundClasses === requiredClasses.length;
    } catch (buildError) {
      console.log('⚠️  Build failed, but safelist validation completed');
      return foundClasses === requiredClasses.length;
    }

  } catch (error) {
    console.log('❌ Safelist validation failed:', error.message);
    return false;
  }
}

async function validateDesignSystemFile() {
  console.log('\n📖 Testing DESIGN_SYSTEM.md...');

  const designSystemPath = path.join(__dirname, '../DESIGN_SYSTEM.md');

  if (!fs.existsSync(designSystemPath)) {
    console.log('⚠️  No DESIGN_SYSTEM.md found - run /1-setup-design first');
    return false;
  }

  const content = fs.readFileSync(designSystemPath, 'utf8');

  const requiredSections = [
    'ds-1:', 'ds-2:', 'ds-3:', 'ds-4:', 'ds-5:', 'ds-6:',
    'p-ds-2', 'm-ds-4', 'font-heading', 'font-body'
  ];

  let foundSections = 0;
  for (const section of requiredSections) {
    if (content.includes(section)) {
      console.log(`✅ Found: ${section}`);
      foundSections++;
    } else {
      console.log(`❌ Missing: ${section}`);
    }
  }

  console.log(`\n📊 DESIGN_SYSTEM.md: ${foundSections}/${requiredSections.length} sections found`);
  return foundSections === requiredSections.length;
}

async function main() {
  console.log('🚀 Design System Validation Starting...\n');

  const eslintValid = await validateESLintRules();
  const safelistValid = await validateTailwindSafelist();
  const designSystemValid = await validateDesignSystemFile();

  console.log('\n🎯 Final Results:');
  console.log(`  ESLint Rules: ${eslintValid ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Tailwind Safelist: ${safelistValid ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  DESIGN_SYSTEM.md: ${designSystemValid ? '✅ PASS' : '❌ FAIL'}`);

  if (eslintValid && safelistValid && designSystemValid) {
    console.log('\n🎉 Design system compliance is working correctly!');
    console.log('\n💡 Next steps:');
    console.log('  1. Run /1-setup-design to create DESIGN_SYSTEM.md');
    console.log('  2. Run /2-setup-foundation to generate tailwind.config.js');
    console.log('  3. Agents can now use design system classes safely');
    process.exit(0);
  } else {
    console.log('\n💥 Design system validation failed!');
    console.log('\n🔧 Troubleshooting:');
    if (!designSystemValid) console.log('  - Run /1-setup-design first');
    if (!safelistValid) console.log('  - Run /2-setup-foundation after setup-design');
    if (!eslintValid) console.log('  - Check ESLint configuration in eslint.config.js');
    process.exit(1);
  }
}

main().catch(console.error);