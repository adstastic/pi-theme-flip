# pi-theme-flip

A tiny Pi extension that adds an immediate theme toggle command.

No polling. No OS detection. No subprocesses. It only calls Pi's `ctx.ui.setTheme()` when you ask.

## Install

From npm:

```bash
pi install npm:pi-theme-flip
```

Try without installing:

```bash
pi -e npm:pi-theme-flip
```

From this repository:

```bash
npm install
npm run build
pi -e ./src/index.ts
```

Or install/use it as a Pi package from a local path:

```bash
pi install /absolute/path/to/pi-theme-flip
```

## Use

```text
/theme-flip
/theme-flip toggle
/theme-flip dark
/theme-flip light
/theme-flip status
```

`/theme-flip` toggles between Pi's built-in `dark` and `light` themes.

Pi extension commands execute immediately while the agent is streaming, so you can run `/theme-flip` during a tool call or long response without waiting for the agent turn to finish.

## Behavior

- Current `dark` theme flips to `light`.
- Any other current theme flips to `dark`.
- `dark` and `light` force one side.
- `status` reports the active theme name.
- Non-UI modes no-op.
