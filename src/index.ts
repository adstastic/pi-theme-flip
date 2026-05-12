import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

type ThemeChoice = typeof LIGHT_THEME | typeof DARK_THEME;
type CommandChoice = ThemeChoice | "toggle" | "status";

function normalizeChoice(value: string): CommandChoice | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === "toggle") return "toggle";
  if (normalized === "status") return "status";
  if (normalized === LIGHT_THEME) return LIGHT_THEME;
  if (normalized === DARK_THEME) return DARK_THEME;
  return undefined;
}

function currentThemeName(ctx: ExtensionContext): string | undefined {
  return ctx.ui.theme.name;
}

function nextTheme(ctx: ExtensionContext): ThemeChoice {
  return currentThemeName(ctx) === DARK_THEME ? LIGHT_THEME : DARK_THEME;
}

function setPiTheme(ctx: ExtensionContext, themeName: ThemeChoice): void {
  if (!ctx.hasUI) return;

  const result = ctx.ui.setTheme(themeName);
  if (!result.success) {
    ctx.ui.notify(`theme flip failed: ${result.error ?? "unknown error"}`, "error");
    return;
  }

  ctx.ui.notify(`theme: ${themeName}`, "info");
}

export default function (pi: ExtensionAPI) {
  pi.registerCommand("theme-flip", {
    description: "Toggle pi theme between dark and light. Use /theme-flip dark|light|status.",
    handler: async (args, ctx) => {
      const requested = normalizeChoice(args);
      if (!requested) {
        ctx.ui.notify("usage: /theme-flip [toggle|dark|light|status]", "warning");
        return;
      }

      if (requested === "status") {
        ctx.ui.notify(`theme: ${currentThemeName(ctx) ?? "unknown"}`, "info");
        return;
      }

      setPiTheme(ctx, requested === "toggle" ? nextTheme(ctx) : requested);
    },
  });
}
