/**
 * Design System Generator
 * Generates complete DESIGN_SYSTEM.md from structured parameters
 * Compatible with MCP VM sandbox execution
 */

// All dependencies injected by MCP sandbox: fs, path, console, process

// Load shadcn palette generator functions directly
function hexToOklch(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  const x = 0.4124564 * linearR + 0.3575761 * linearG + 0.1804375 * linearB;
  const y = 0.2126729 * linearR + 0.7151522 * linearG + 0.0721750 * linearB;
  const z = 0.0193339 * linearR + 0.1191920 * linearG + 0.9503041 * linearB;
  
  const l = Math.cbrt(y);
  const a = (x - y) * 0.5;
  const b_oklab = (y - z) * 0.5;
  
  const c = Math.sqrt(a * a + b_oklab * b_oklab);
  let h = Math.atan2(b_oklab, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  
  return {
    l: Math.round(l * 1000) / 1000,
    c: Math.round(c * 1000) / 1000,
    h: Math.round(h * 10) / 10
  };
}

function oklchToString(oklch) {
  return `${oklch.l} ${oklch.c} ${oklch.h}`;
}

function adjustLightness(oklch, factor) {
  return {
    ...oklch,
    l: Math.max(0, Math.min(1, oklch.l * factor))
  };
}

function adjustChroma(oklch, factor) {
  return {
    ...oklch,
    c: Math.max(0, oklch.c * factor)
  };
}

function getContrastingColor(baseOklch) {
  return baseOklch.l > 0.5 
    ? { l: 0.145, c: 0, h: 0 }
    : { l: 0.985, c: 0, h: 0 };
}

function generateShadcnPalette(basicTheme) {
  const primary = hexToOklch(basicTheme.primaryColor);
  const success = hexToOklch(basicTheme.successColor);
  const error = hexToOklch(basicTheme.errorColor);
  const warning = hexToOklch(basicTheme.warningColor);
  const background = hexToOklch(basicTheme.backgroundColor);
  const surface = hexToOklch(basicTheme.surfaceColor);
  const textPrimary = hexToOklch(basicTheme.textPrimaryColor);
  const textSecondary = hexToOklch(basicTheme.textSecondaryColor);

  const lightPalette = {
    background: oklchToString(background),
    foreground: oklchToString(textPrimary),
    card: oklchToString(background),
    cardForeground: oklchToString(textPrimary),
    popover: oklchToString(background),
    popoverForeground: oklchToString(textPrimary),
    primary: oklchToString(primary),
    primaryForeground: oklchToString(getContrastingColor(primary)),
    secondary: oklchToString(adjustLightness(surface, 0.98)),
    secondaryForeground: oklchToString(textPrimary),
    muted: oklchToString(surface),
    mutedForeground: oklchToString(textSecondary),
    accent: oklchToString(adjustLightness(surface, 0.96)),
    accentForeground: oklchToString(textPrimary),
    destructive: oklchToString(error),
    destructiveForeground: oklchToString(getContrastingColor(error)),
    border: oklchToString(adjustLightness(surface, 0.92)),
    input: oklchToString(adjustLightness(surface, 0.92)),
    ring: oklchToString(adjustChroma(primary, 0.5)),
    success: oklchToString(success),
    warning: oklchToString(warning),
    surfaceColor: oklchToString(surface),
    textPrimaryColor: oklchToString(textPrimary),
    textSecondaryColor: oklchToString(textSecondary)
  };

  const darkBackground = { l: 0.145, c: 0, h: 0 };
  const darkCard = { l: 0.205, c: 0, h: 0 };
  const darkSurface = { l: 0.269, c: 0, h: 0 };
  const lightText = { l: 0.985, c: 0, h: 0 };
  const darkMutedText = { l: 0.708, c: 0, h: 0 };

  const darkPalette = {
    background: oklchToString(darkBackground),
    foreground: oklchToString(lightText),
    card: oklchToString(darkCard),
    cardForeground: oklchToString(lightText),
    popover: oklchToString(darkCard),
    popoverForeground: oklchToString(lightText),
    primary: oklchToString(adjustLightness(primary, 1.5)),
    primaryForeground: oklchToString(darkBackground),
    secondary: oklchToString(darkSurface),
    secondaryForeground: oklchToString(lightText),
    muted: oklchToString(darkSurface),
    mutedForeground: oklchToString(darkMutedText),
    accent: oklchToString(darkSurface),
    accentForeground: oklchToString(lightText),
    destructive: oklchToString(adjustLightness(error, 1.2)),
    destructiveForeground: oklchToString(lightText),
    border: "1 0 0 / 10%",
    input: oklchToString(darkSurface),
    ring: oklchToString(adjustLightness(primary, 1.2)),
    success: oklchToString(adjustLightness(success, 1.1)),
    warning: oklchToString(adjustLightness(warning, 1.1)),
    surfaceColor: oklchToString(darkSurface),
    textPrimaryColor: oklchToString(lightText),
    textSecondaryColor: oklchToString(darkMutedText)
  };

  return { light: lightPalette, dark: darkPalette };
}

// Theme definitions (1-8)
const THEMES = {
  1: {
    name: "Apple Clean",
    primary: { color: "#007AFF", name: "system blue" },
    success: { color: "#34C759", name: "system green" },
    error: { color: "#FF3B30", name: "system red" },
    warning: { color: "#FF9500", name: "system orange" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F2F2F7", name: "light gray" },
    textPrimary: { color: "#1C1C1E", name: "black" },
    textSecondary: { color: "#8E8E93", name: "gray" }
  },
  2: {
    name: "Stripe Professional",
    primary: { color: "#635BFF", name: "electric violet" },
    success: { color: "#00D924", name: "green" },
    error: { color: "#DF1B41", name: "red" },
    warning: { color: "#FF9500", name: "orange" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F7F9FC", name: "subtle gray" },
    textPrimary: { color: "#1A1F36", name: "navy" },
    textSecondary: { color: "#6B7280", name: "medium gray" }
  },
  3: {
    name: "GitHub Developer",
    primary: { color: "#238636", name: "green" },
    success: { color: "#1F883D", name: "dark green" },
    error: { color: "#D1242F", name: "red" },
    warning: { color: "#BF8700", name: "yellow" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F6F8FA", name: "light gray" },
    textPrimary: { color: "#24292F", name: "charcoal" },
    textSecondary: { color: "#57606A", name: "gray" }
  },
  4: {
    name: "Linear Productive",
    primary: { color: "#5E6AD2", name: "indigo" },
    success: { color: "#00875A", name: "teal green" },
    error: { color: "#E34935", name: "red" },
    warning: { color: "#FFAB00", name: "amber" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F9FAFB", name: "cool gray" },
    textPrimary: { color: "#111827", name: "almost black" },
    textSecondary: { color: "#6B7280", name: "medium gray" }
  },
  5: {
    name: "Figma Creative",
    primary: { color: "#0066FF", name: "bright blue" },
    success: { color: "#14AE5C", name: "green" },
    error: { color: "#F24822", name: "red-orange" },
    warning: { color: "#FFCD29", name: "yellow" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F5F5F5", name: "neutral gray" },
    textPrimary: { color: "#2C2C2C", name: "dark gray" },
    textSecondary: { color: "#8C8C8C", name: "medium gray" }
  },
  6: {
    name: "Calm Modern",
    primary: { color: "#2563EB", name: "blue 600" },
    success: { color: "#16A34A", name: "green 600" },
    error: { color: "#DC2626", name: "red 600" },
    warning: { color: "#D97706", name: "amber 600" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F8FAFC", name: "slate 50" },
    textPrimary: { color: "#0F172A", name: "slate 900" },
    textSecondary: { color: "#64748B", name: "slate 500" }
  },
  7: {
    name: "Vibrant Energy",
    primary: { color: "#EC4899", name: "pink 500" },
    success: { color: "#10B981", name: "emerald 500" },
    error: { color: "#EF4444", name: "red 500" },
    warning: { color: "#F59E0B", name: "amber 500" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#FAFAFA", name: "gray 50" },
    textPrimary: { color: "#111827", name: "gray 900" },
    textSecondary: { color: "#6B7280", name: "gray 500" }
  },
  8: {
    name: "Earth Conscious",
    primary: { color: "#059669", name: "emerald 600" },
    success: { color: "#16A34A", name: "green 600" },
    error: { color: "#DC2626", name: "red 600" },
    warning: { color: "#D97706", name: "amber 600" },
    background: { color: "#FFFFFF", name: "white" },
    surface: { color: "#F0FDF4", name: "green 50" },
    textPrimary: { color: "#14532D", name: "green 900" },
    textSecondary: { color: "#6B7280", name: "gray 500" }
  }
};

// Font definitions (1-5)
const FONTS = {
  1: {
    name: "Inter + Inter",
    heading: { font: "Inter", weight: "600" },
    body: { font: "Inter", weight: "400" },
    headingUrl: "Inter",
    bodyUrl: "Inter"
  },
  2: {
    name: "Montserrat + Source Sans Pro",
    heading: { font: "Montserrat", weight: "600" },
    body: { font: "Source Sans Pro", weight: "400" },
    headingUrl: "Montserrat",
    bodyUrl: "Source+Sans+Pro"
  },
  3: {
    name: "Space Grotesk + Space Mono",
    heading: { font: "Space Grotesk", weight: "600" },
    body: { font: "Space Mono", weight: "400" },
    headingUrl: "Space+Grotesk",
    bodyUrl: "Space+Mono"
  },
  4: {
    name: "Playfair Display + Source Sans Pro",
    heading: { font: "Playfair Display", weight: "600" },
    body: { font: "Source Sans Pro", weight: "400" },
    headingUrl: "Playfair+Display",
    bodyUrl: "Source+Sans+Pro"
  },
  5: {
    name: "Manrope + Inter",
    heading: { font: "Manrope", weight: "600" },
    body: { font: "Inter", weight: "400" },
    headingUrl: "Manrope",
    bodyUrl: "Inter"
  }
};

// Spacing definitions (1-3)
const SPACING = {
  1: {
    name: "Compact",
    baseUnit: 4,
    scale: "4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px",
    values: { ds1: "4px", ds2: "8px", ds3: "12px", ds4: "16px", ds5: "20px", ds6: "24px" },
    componentPadding: "12px",
    sectionMargin: "24px",
    cardSpacing: "16px",
    buttonPadding: "8px"
  },
  2: {
    name: "Balanced",
    baseUnit: 8,
    scale: "8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px",
    values: { ds1: "8px", ds2: "16px", ds3: "24px", ds4: "32px", ds5: "40px", ds6: "48px" },
    componentPadding: "16px",
    sectionMargin: "32px",
    cardSpacing: "24px",
    buttonPadding: "12px"
  },
  3: {
    name: "Spacious",
    baseUnit: 12,
    scale: "12px, 24px, 36px, 48px, 60px, 72px, 96px, 120px",
    values: { ds1: "12px", ds2: "24px", ds3: "36px", ds4: "48px", ds5: "60px", ds6: "72px" },
    componentPadding: "24px",
    sectionMargin: "48px",
    cardSpacing: "36px",
    buttonPadding: "16px"
  }
};

// Radius definitions (1-4)
const RADIUS = {
  1: { name: "Sharp", sm: 0, md: 0, lg: 0, rem: 0 },
  2: { name: "Subtle", sm: 2, md: 4, lg: 6, rem: 0.25 },
  3: { name: "Modern", sm: 4, md: 8, lg: 12, rem: 0.5 },
  4: { name: "Rounded", sm: 6, md: 12, lg: 18, rem: 0.75 }
};

function generateDesignSystem(params) {
  const {
    theme_choice,
    custom_colors,
    font_choice,
    spacing_choice,
    radius_choice
  } = params;

  // Get theme data
  let theme;
  if (theme_choice === 'custom' && custom_colors) {
    theme = {
      name: "Custom Brand Colors",
      primary: { color: custom_colors.primary, name: "brand primary" },
      success: { color: custom_colors.success, name: "brand success" },
      error: { color: custom_colors.error, name: "brand error" },
      warning: { color: custom_colors.warning, name: "brand warning" },
      background: { color: custom_colors.background, name: "brand background" },
      surface: { color: custom_colors.surface, name: "brand surface" },
      textPrimary: { color: custom_colors.textPrimary, name: "brand text" },
      textSecondary: { color: custom_colors.textSecondary, name: "brand secondary" }
    };
  } else {
    theme = THEMES[theme_choice];
  }

  const font = FONTS[font_choice];
  const spacing = SPACING[spacing_choice];
  const radius = RADIUS[radius_choice];

  // Generate complete shadcn OKLCH palette
  const basicTheme = {
    primaryColor: theme.primary.color,
    successColor: theme.success.color,
    errorColor: theme.error.color,
    warningColor: theme.warning.color,
    backgroundColor: theme.background.color,
    surfaceColor: theme.surface.color,
    textPrimaryColor: theme.textPrimary.color,
    textSecondaryColor: theme.textSecondary.color
  };

  const shadcnPalette = generateShadcnPalette(basicTheme);

  // Read template - try multiple possible paths
  const templatePaths = [
    path.join(__dirname, '..', '..', 'DESIGN_SYSTEM_TEMPLATE.md'), // From .claude/scripts
    path.join(process.cwd(), 'DESIGN_SYSTEM_TEMPLATE.md'), // From project root
    path.join(process.cwd(), 'nextjs-queen', 'template', 'DESIGN_SYSTEM_TEMPLATE.md') // From repo root
  ];

  let template;
  for (const templatePath of templatePaths) {
    if (fs.existsSync(templatePath)) {
      template = fs.readFileSync(templatePath, 'utf8');
      break;
    }
  }

  if (!template) {
    throw new Error(`DESIGN_SYSTEM_TEMPLATE.md not found in any of: ${templatePaths.join(', ')}`);
  }

  // Replace all template variables
  const replacements = {
    // Theme variables
    '{{THEME_NAME}}': theme.name,
    '{{PRIMARY_COLOR}}': theme.primary.color,
    '{{PRIMARY_NAME}}': theme.primary.name,
    '{{SUCCESS_COLOR}}': theme.success.color,
    '{{SUCCESS_NAME}}': theme.success.name,
    '{{ERROR_COLOR}}': theme.error.color,
    '{{ERROR_NAME}}': theme.error.name,
    '{{WARNING_COLOR}}': theme.warning.color,
    '{{WARNING_NAME}}': theme.warning.name,
    '{{BACKGROUND_COLOR}}': theme.background.color,
    '{{BACKGROUND_NAME}}': theme.background.name,
    '{{SURFACE_COLOR}}': theme.surface.color,
    '{{SURFACE_NAME}}': theme.surface.name,
    '{{TEXT_PRIMARY_COLOR}}': theme.textPrimary.color,
    '{{TEXT_PRIMARY_NAME}}': theme.textPrimary.name,
    '{{TEXT_SECONDARY_COLOR}}': theme.textSecondary.color,
    '{{TEXT_SECONDARY_NAME}}': theme.textSecondary.name,

    // OKLCH palette variables (light mode)
    '{{BACKGROUND_OKLCH}}': shadcnPalette.light.background,
    '{{FOREGROUND_OKLCH}}': shadcnPalette.light.foreground,
    '{{CARD_OKLCH}}': shadcnPalette.light.card,
    '{{CARD_FOREGROUND_OKLCH}}': shadcnPalette.light.cardForeground,
    '{{POPOVER_OKLCH}}': shadcnPalette.light.popover,
    '{{POPOVER_FOREGROUND_OKLCH}}': shadcnPalette.light.popoverForeground,
    '{{PRIMARY_OKLCH}}': shadcnPalette.light.primary,
    '{{PRIMARY_FOREGROUND_OKLCH}}': shadcnPalette.light.primaryForeground,
    '{{SECONDARY_OKLCH}}': shadcnPalette.light.secondary,
    '{{SECONDARY_FOREGROUND_OKLCH}}': shadcnPalette.light.secondaryForeground,
    '{{MUTED_OKLCH}}': shadcnPalette.light.muted,
    '{{MUTED_FOREGROUND_OKLCH}}': shadcnPalette.light.mutedForeground,
    '{{ACCENT_OKLCH}}': shadcnPalette.light.accent,
    '{{ACCENT_FOREGROUND_OKLCH}}': shadcnPalette.light.accentForeground,
    '{{DESTRUCTIVE_OKLCH}}': shadcnPalette.light.destructive,
    '{{DESTRUCTIVE_FOREGROUND_OKLCH}}': shadcnPalette.light.destructiveForeground,
    '{{BORDER_OKLCH}}': shadcnPalette.light.border,
    '{{INPUT_OKLCH}}': shadcnPalette.light.input,
    '{{RING_OKLCH}}': shadcnPalette.light.ring,
    '{{SUCCESS_OKLCH}}': shadcnPalette.light.success,
    '{{WARNING_OKLCH}}': shadcnPalette.light.warning,
    '{{SURFACE_OKLCH}}': shadcnPalette.light.surfaceColor,
    '{{TEXT_PRIMARY_OKLCH}}': shadcnPalette.light.textPrimaryColor,
    '{{TEXT_SECONDARY_OKLCH}}': shadcnPalette.light.textSecondaryColor,

    // OKLCH palette variables (dark mode)
    '{{BACKGROUND_DARK_OKLCH}}': shadcnPalette.dark.background,
    '{{FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.foreground,
    '{{CARD_DARK_OKLCH}}': shadcnPalette.dark.card,
    '{{CARD_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.cardForeground,
    '{{POPOVER_DARK_OKLCH}}': shadcnPalette.dark.popover,
    '{{POPOVER_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.popoverForeground,
    '{{PRIMARY_DARK_OKLCH}}': shadcnPalette.dark.primary,
    '{{PRIMARY_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.primaryForeground,
    '{{SECONDARY_DARK_OKLCH}}': shadcnPalette.dark.secondary,
    '{{SECONDARY_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.secondaryForeground,
    '{{MUTED_DARK_OKLCH}}': shadcnPalette.dark.muted,
    '{{MUTED_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.mutedForeground,
    '{{ACCENT_DARK_OKLCH}}': shadcnPalette.dark.accent,
    '{{ACCENT_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.accentForeground,
    '{{DESTRUCTIVE_DARK_OKLCH}}': shadcnPalette.dark.destructive,
    '{{DESTRUCTIVE_FOREGROUND_DARK_OKLCH}}': shadcnPalette.dark.destructiveForeground,
    '{{BORDER_DARK_OKLCH}}': shadcnPalette.dark.border,
    '{{INPUT_DARK_OKLCH}}': shadcnPalette.dark.input,
    '{{RING_DARK_OKLCH}}': shadcnPalette.dark.ring,
    '{{SUCCESS_DARK_OKLCH}}': shadcnPalette.dark.success,
    '{{WARNING_DARK_OKLCH}}': shadcnPalette.dark.warning,
    '{{SURFACE_DARK_OKLCH}}': shadcnPalette.dark.surfaceColor,
    '{{TEXT_PRIMARY_DARK_OKLCH}}': shadcnPalette.dark.textPrimaryColor,
    '{{TEXT_SECONDARY_DARK_OKLCH}}': shadcnPalette.dark.textSecondaryColor,

    // Font variables
    '{{FONT_PAIRING_NAME}}': font.name,
    '{{HEADING_FONT}}': font.heading.font,
    '{{HEADING_WEIGHT}}': font.heading.weight,
    '{{BODY_FONT}}': font.body.font,
    '{{BODY_WEIGHT}}': font.body.weight,
    '{{HEADING_FONT_URL}}': font.headingUrl,
    '{{BODY_FONT_URL}}': font.bodyUrl,

    // Spacing variables
    '{{SPACING_TYPE}}': spacing.name,
    '{{BASE_UNIT}}': spacing.baseUnit.toString(),
    '{{SPACING_SCALE}}': spacing.scale,
    '{{SPACING_1}}': spacing.values.ds1,
    '{{SPACING_2}}': spacing.values.ds2,
    '{{SPACING_3}}': spacing.values.ds3,
    '{{SPACING_4}}': spacing.values.ds4,
    '{{SPACING_5}}': spacing.values.ds5,
    '{{SPACING_6}}': spacing.values.ds6,
    '{{COMPONENT_PADDING}}': spacing.componentPadding,
    '{{SECTION_MARGIN}}': spacing.sectionMargin,
    '{{CARD_SPACING}}': spacing.cardSpacing,
    '{{BUTTON_PADDING}}': spacing.buttonPadding,

    // Radius variables
    '{{RADIUS_SIZE}}': radius.name,
    '{{RADIUS_SM}}': radius.sm.toString(),
    '{{RADIUS_MD}}': radius.md.toString(),
    '{{RADIUS_LG}}': radius.lg.toString(),
    '{{RADIUS_REM}}': radius.rem.toString()
  };

  // Apply all replacements
  Object.entries(replacements).forEach(([placeholder, value]) => {
    template = template.replace(new RegExp(placeholder, 'g'), value);
  });

  return template;
}

// Export for MCP usage - compatible with VM sandbox
if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = { generateDesignSystem };
} else if (typeof global !== 'undefined') {
  global.generateDesignSystem = generateDesignSystem;
}