import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Auto-fix quote escaping in JSX
      "react/no-unescaped-entities": ["error"],
      // Consistent quote style
      "quotes": ["error", "double", { "avoidEscape": true }],
      "jsx-quotes": ["error", "prefer-double"],
      // Additional JSX safety rules
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
      // Design system spacing compliance
      "no-restricted-syntax": [
        "error",
        {
          "selector": "Literal[value=/[pm][xy]?-\\[[0-9]+px\\]/]",
          "message": "Use design system spacing classes (p-ds-1, p-ds-2, etc.) instead of arbitrary values like p-[16px]. Check DESIGN_SYSTEM.md for available classes."
        },
        {
          "selector": "Literal[value=/gap-\\[[0-9]+px\\]/]",
          "message": "Use design system spacing classes (gap-ds-1, gap-ds-2, etc.) instead of arbitrary values like gap-[16px]. Check DESIGN_SYSTEM.md for available classes."
        },
        {
          "selector": "Literal[value=/space-[xy]-\\[[0-9]+px\\]/]",
          "message": "Use design system spacing classes (space-x-ds-1, space-y-ds-2, etc.) instead of arbitrary values. Check DESIGN_SYSTEM.md for available classes."
        },
        {
          "selector": "Literal[value=/bg-\\[#[0-9A-Fa-f]{6}\\]/]",
          "message": "Use bg-primary, bg-destructive, bg-success instead of arbitrary hex colors. Check DESIGN_SYSTEM.md for available colors."
        },
        {
          "selector": "Literal[value=/text-\\[#[0-9A-Fa-f]{6}\\]/]",
          "message": "Use text-primary, text-secondary instead of arbitrary hex colors. Check DESIGN_SYSTEM.md for available colors."
        },
        {
          "selector": "Literal[value=/font-\\[[^\\]]+\\]/]",
          "message": "Use font-heading or font-body from design system instead of arbitrary fonts. Check DESIGN_SYSTEM.md for typography."
        }
      ]
    }
  }
];