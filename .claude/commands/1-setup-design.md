---
name: 1-setup-design
description: Create a comprehensive design system with proven color palettes and typography
---

# 🎨 Design System Creation

Choose your design preferences to generate a complete design system with 20+ HSL variables for shadcn/ui.

## Theme Options
1. **Apple Clean** - iOS system colors (#007AFF primary)
2. **Stripe Professional** - Fintech violet (#635BFF primary)  
3. **GitHub Developer** - Code green (#238636 primary)
4. **Linear Productive** - Modern indigo (#5E6AD2 primary)
5. **Figma Creative** - Bright blue (#0066FF primary)
6. **Calm Modern** - Serene blue (#2563EB primary)
7. **Vibrant Energy** - Hot pink (#EC4899 primary)
8. **Earth Conscious** - Emerald green (#059669 primary)
9. **Custom Brand Colors** - Your exact hex colors

## Font Options
1. **Inter + Inter** - Clean, professional
2. **Montserrat + Source Sans Pro** - Corporate
3. **Space Grotesk + Space Mono** - Tech/developer
4. **Playfair Display + Source Sans Pro** - Editorial/luxury
5. **Manrope + Inter** - Friendly/approachable

## Spacing & Style
**Spacing:** 1=Compact(4px) | 2=Balanced(8px) | 3=Spacious(12px)
**Radius:** 1=Sharp(0px) | 2=Subtle(4px) | 3=Modern(8px) | 4=Rounded(12px)
**Shadows:** 1=None | 2=Subtle | 3=Moderate | 4=Bold
**Speed:** 1=Fast(150ms) | 2=Normal(300ms) | 3=Slow(500ms)

**Your choices: Theme(1-9), Font(1-5), Spacing(1-3), Radius(1-4), Shadows(1-4), Speed(1-3)**

**If theme 9:** Provide 8 hex colors: Primary, Success, Error, Warning, Background, Surface, Text Primary, Text Secondary

---

## 🤖 Claude Instructions

Use MCP tool for reliable generation:

```typescript
// Preset themes (1-8)
const result = await mcp_queen_mcp_generate_design_system({
  theme_choice: userChoice, font_choice: userFont,
  spacing_choice: userSpacing, radius_choice: userRadius,
  shadow_choice: userShadows, speed_choice: userSpeed
}, process.cwd());

// Custom colors (theme 9)
const result = await mcp_queen_mcp_generate_design_system({
  theme_choice: "custom", custom_colors: { primary: "#FF6B35", ... },
  font_choice: userFont, spacing_choice: userSpacing, radius_choice: userRadius,
  shadow_choice: userShadows, speed_choice: userSpeed
}, process.cwd());
```

The MCP tool automatically writes `DESIGN_SYSTEM.md`. Check `result.files_created` for confirmation. Done!