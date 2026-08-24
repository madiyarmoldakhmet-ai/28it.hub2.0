---
version: alpha
name: Ollama-design-analysis
description: |
  An almost defiantly minimal documentation-first system that treats the home page like a Markdown README — paper-white canvas, 36px center-aligned heading, a single black pill CTA, an inline terminal install snippet, and a hand-drawn llama mascot as the only ornamental element. No gradient, no hero photography, no marketing pyrotechnics. The chrome is a tiny utility palette of pure black, pure white, and three neutral grays; every interactive element is fully rounded into a pill (`{rounded.full}`); typography is SF Pro Rounded for headings paired with system sans for body and ui-monospace for code. Pricing tiers, FAQs, and "your data stays yours" guarantees all sit on the same flat canvas inside thin-border cards — the system is the documentation, and the documentation is the system.

colors:
  primary: "#000000"
  on-primary: "#ffffff"
  ink: "#000000"
  ink-deep: "#090909"
  charcoal: "#525252"
  body: "#737373"
  mute: "#a3a3a3"
  canvas: "#ffffff"
  surface-soft: "#fafafa"
  surface-card: "#ffffff"
  hairline: "#e5e5e5"
  hairline-strong: "#d4d4d4"
  on-dark: "#ffffff"
  on-dark-mute: "rgba(255,255,255,0.7)"
  surface-dark: "#171717"
  focus-ring: "rgba(59,130,246,0.5)"
  link: "#000000"
  link-mute: "#737373"
  terminal-red: "#ff5f56"
  terminal-yellow: "#ffbd2e"
  terminal-green: "#27c93f"

typography:
  display-xl:
    fontFamily: SF Pro Rounded
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.11
    letterSpacing: 0
  display-lg:
    fontFamily: SF Pro Rounded
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-lg:
    fontFamily: SF Pro Rounded
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0
  heading-md:
    fontFamily: ui-sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  heading-sm:
    fontFamily: ui-sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.56
    letterSpacing: 0
  body-md:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  body-sm-strong:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0
  caption-sm:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  code-md:
    fontFamily: ui-monospace
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-sm:
    fontFamily: ui-monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  button-md:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 88px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
  button-primary-active:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
  button-pill-on-dark:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
  button-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.mute}"
    rounded: "{rounded.full}"
  search-pill:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 36px
  search-pill-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 40px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  install-snippet:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-md}"
    rounded: "{rounded.full}"
    padding: 12px 20px
    height: 48px
  command-tag:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  terminal-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  terminal-traffic-lights:
    rounded: "{rounded.full}"
    size: 12px
  pricing-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  feature-bullet:
    textColor: "{colors.charcoal}"
    typography: "{typography.body-sm}"
  faq-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 0px
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  link-mute:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.none}"
    height: 56px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.none}"
    padding: 32px 24px
  cta-strip-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.heading-lg}"
    rounded: "{rounded.lg}"
    padding: 24px 32px
---

## Overview

Ollama's site is the most aggressively under-designed marketing surface in the AI tooling space, and that is the entire point. The home page reads like a Markdown README rendered with care: a 36px center-aligned heading sits above an inline `curl` install snippet inside a soft-gray pill, a single black "Download" CTA, and a hand-drawn llama mascot as the only ornament. Everything else — automate-your-work block, "Start local. Scale cloud." pricing pair, "Your data stays yours" guarantee strip, FAQ wall on `/pricing` — sits on the same paper-white canvas (`{colors.canvas}`) with quiet `{colors.body}` neutrals carrying the prose. The system is the documentation, and the documentation is the system.

The design philosophy is geometric: every interactive element collapses to `{rounded.full}` (9999px) — buttons, search pills, install-snippet pills, text inputs, and the terminal-traffic-light dots. There are no decorative drop shadows, no gradients, no hero illustrations beyond the llama. Cards (the rare ones, on `/pricing`) use a soft `{rounded.lg}` (12px) and a 1px hairline. The single inverted moment in the entire system is the dark "Max" pricing tier — `{colors.surface-dark}` with white text — which acts as the only attention-grabbing surface in an otherwise studiously flat layout.

Typography pairs SF Pro Rounded (display headings, weight 500–600) with the operating system's default sans (`ui-sans-serif`) for body and `ui-monospace` for code. The roundness of the heading face is the only "personality" the chrome carries — it gently echoes the `{rounded.full}` button geometry without being decorative about it.

**Key Characteristics:**
- Paper-white `{colors.canvas}` end-to-end with no surface alternation — the whole page is one continuous sheet
- Center-aligned hero with `{typography.display-xl}` SF Pro Rounded headline, no eyebrow, no subhead beyond a small "Power OpenClaw with Ollama" line under the llama
- Pill geometry everywhere: every button and pill input is `{rounded.full}`; cards use `{rounded.lg}`; nothing is sharp-cornered except section dividers
- Single-color CTA system: pure black `{colors.primary}` pills carry every action; "Get Pro" / "Get Max" inside pricing cards are the only variations
- Inline `curl` install snippet rendered as a pill with `{typography.code-md}` — the most signature element, sitting directly under the hero headline
- Terminal-mockup card with macOS traffic-light dots and inline `ollama launch openclaw` example — the home page's only "product preview"
- Inverted dark `{component.pricing-card-dark}` for the highest-tier "Max" plan, breaking the flat-white rhythm exactly once per page

## Colors

> **Source pages:** `/` (home) and `/pricing`. The chrome palette is identical across both — only content changes.

### Brand & Accent
- **Pure Black** (`{colors.primary}` — `#000000`): the brand. Every primary CTA, every black pill, every link in the nav, and every solid icon. There is no other "brand color."
- **Ink Deep** (`{colors.ink-deep}` — `#090909`): pressed-state black for the primary pill — a single notch below pure.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): the page itself. Nearly every surface in the system.
- **Soft Surface** (`{colors.surface-soft}` — `#fafafa`): install-snippet pill background, search pill, secondary chip backgrounds, alternating row fill where one is needed.
- **Surface Dark** (`{colors.surface-dark}` — `#171717`): the dark "Max" pricing card and dark CTA strips. The single inverted surface in the system.
- **Hairline** (`{colors.hairline}` — `#e5e5e5`): 1px card border, divider line above footer, divider between FAQ rows.
- **Hairline Strong** (`{colors.hairline-strong}` — `#d4d4d4`): rare slightly stronger divider where extra separation is needed (e.g., between unrelated FAQ groups).

### Text
- **Ink** (`{colors.ink}` — `#000000`): all headlines, primary nav links, button text on light surfaces, prices on pricing cards.
- **Charcoal** (`{colors.charcoal}` — `#525252`): list-item text and disabled-state secondary copy.
- **Body** (`{colors.body}` — `#737373`): default body color for paragraph copy, FAQ answers, footer link text — the system's most-used text color after pure black.
- **Mute** (`{colors.mute}` — `#a3a3a3`): caption text, command-line "comment" gray inside terminal mockups, lowest-emphasis utility text.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): primary text on `{colors.surface-dark}`.
- **On Dark Mute** (`{colors.on-dark-mute}` — `rgba(255,255,255,0.7)`): secondary copy inside the dark "Max" pricing card.

### Semantic
The system has effectively no error/success/warning palette in its public marketing surfaces — there are no validation states, no destructive flows, no banners. The only "semantic" colors are the macOS terminal traffic lights inside the terminal mockup:

- **Terminal Red** (`{colors.terminal-red}` — `#ff5f56`): close-window dot.
- **Terminal Yellow** (`{colors.terminal-yellow}` — `#ffbd2e`): minimize dot.
- **Terminal Green** (`{colors.terminal-green}` — `#27c93f`): zoom dot.

These appear only inside `{component.terminal-card}` and have no other use.

### Focus
- **Focus Ring** (`{colors.focus-ring}` — `rgba(59,130,246,0.5)`): translucent blue browser-default focus ring around interactive elements. The only blue in the system.

## Typography

### Font Family
- **SF Pro Rounded** (display headings) — Apple's rounded geometric sans, used at weights 500 and 600 for headlines from `{typography.display-xl}` (36px) down to `{typography.heading-lg}` (24px). Falls back to `system-ui` → `-apple-system`.
- **ui-sans-serif** (body, links, buttons, captions) — the operating system's default sans-serif. Carries every non-display text role at 12–20px. Falls back through `system-ui` and platform emoji families.
- **ui-monospace** (code, install snippet, command tags) — the OS default monospace. Used inside the terminal mockup, the inline `curl` install pill, and any inline `<code>` formatting. Falls back to SFMono-Regular → Menlo → Monaco → Consolas.

The pairing of SF Pro Rounded display + system sans body + system mono code is intentionally "stock Apple" — the design decision is to not have a typography decision. Branded display faces would compete with the system's documentation feel.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 36px | 500 | 1.11 | 0 | Hero headline ("The easiest way to build with open models") |
| `{typography.display-lg}` | 30px | 500 | 1.2 | 0 | Major section headlines ("Pricing", "Frequently asked questions") |
| `{typography.heading-lg}` | 24px | 600 | 1.33 | 0 | Section subheading inside body ("Automate your work", "Start local. Scale cloud.") |
| `{typography.heading-md}` | 20px | 500 | 1.4 | 0 | Pricing tier name ("Free", "Pro", "Max"), card title |
| `{typography.heading-sm}` | 18px | 500 | 1.56 | 0 | FAQ question label, in-card subtitle |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body, FAQ answers, paragraph copy |
| `{typography.body-strong}` | 16px | 500 | 1.5 | 0 | Inline emphasis, primary-nav link |
| `{typography.body-sm}` | 14px | 400 | 1.43 | 0 | Feature bullet ("Access larger models on data-center-grade hardware"), footer link |
| `{typography.body-sm-strong}` | 14px | 500 | 1.43 | 0 | Button label, pricing-card eyebrow ("Solve harder tasks, faster") |
| `{typography.caption-sm}` | 12px | 400 | 1.33 | 0 | Footer copyright row, smallest meta text |
| `{typography.code-md}` | 16px | 400 | 1.5 | 0 | Install-snippet `curl` line, in-terminal command |
| `{typography.code-sm}` | 14px | 400 | 1.43 | 0 | Terminal output line, inline `<code>` chips |
| `{typography.button-md}` | 14px | 500 | 1 | 0 | Every button label across the system |

### Principles
The typography is built for legibility at small sizes on a flat-white canvas. SF Pro Rounded's softened terminals on the heading face do almost all of the brand expression; everything below 20px collapses into the operating system's default sans, which renders identically to the way docs.ollama.com and the Ollama CLI's own help text would appear in a terminal. There is almost no letter-spacing variation, no display-only weights, no italic, and the heading-to-body ratio compresses tightly (36 → 30 → 24 → 20 → 16) so the page reads as a single readable column rather than a marketing pyramid.

### Note on Font Substitutes
SF Pro Rounded is Apple-licensed and ships only on macOS/iOS. On other systems it falls back to `system-ui` (Segoe UI / Roboto / DejaVu Sans depending on platform) — Ollama explicitly accepts that the heading face will look slightly different on Windows/Linux. The closest open-source substitute is **Nunito** (rounded geometric sans, weights 500/600). For the body face, **Inter** is a near-perfect match for `system-ui` rendered metrics. For code, **JetBrains Mono** or **Fira Code** are the canonical open-source substitutes for `ui-monospace`.

## Layout

### Spacing System
- **Base unit:** 8px (with finer 2/4/6px steps available for tight inline gaps)
- **Tokens (front matter):** `{spacing.xxs}` (2px) · `{spacing.xs}` (4px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (16px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.section}` (88px)
- **Universal section rhythm:** every page uses `{spacing.section}` (88px) as the vertical gap between major content blocks (hero → automate → start local/scale cloud → your data stays yours → get-started footer call). This is the single largest spacing token in the system and it is used liberally.
- **Card internal padding:** pricing cards sit at `{spacing.xxl}` (32px) all around; FAQ rows use `{spacing.lg}` (16px) vertical with no horizontal padding.

### Grid & Container
- **Max width:** ~720px content column on the home page (the whole page is laid out as a single narrow reading column with optional 2-column splits inside specific sections).
- **Pricing grid:** 3-up cards at desktop with a max content width of ~960px; collapses to 1-up below 768px.
- **Automate-your-work split:** desktop 50/50 left-text/right-terminal-mockup; mobile stacks vertical with the terminal below the text.
- **FAQ:** single-column stacked rows, full-width within the 720px content column.
- **Footer:** single-row of small body-sm links, center-aligned at desktop, wrapping to two rows on narrow screens.

### Whitespace Philosophy
Whitespace is the entire layout. Sections are separated by 88px of plain white air, never by decorative dividers, never by colored bands. Inside a section, content sits in a tight reading column with no decorative columns, callout boxes, or lifted cards. The site treats the page as a long-form Markdown document, and the air between sections is the equivalent of a blank line in Markdown source.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Hero, automate-your-work, your-data-stays-yours, footer — the dominant treatment across the page |
| 1 — Hairline border | 1px solid `{colors.hairline}` | Pricing cards, FAQ row dividers, terminal mockup card |
| 2 — Inverted dark | `{colors.surface-dark}` fill | Dark "Max" pricing card and dark CTA strip — the system's only "elevated" surfaces use color, not shadow |

The system has no drop-shadow elevation at all. Nothing lifts, nothing floats, nothing layers. The only depth cue beyond hairline borders is the single dark surface used on the highest-tier pricing card to draw attention to it.

### Decorative Depth
The site has effectively zero decorative depth in the traditional sense. The "depth" comes entirely from two recurring devices:
- **The hand-drawn llama mascot** — appearing once at the top of the hero, once at the top of each pricing card, and once next to the lock icon in the "Your data stays yours" section. It is the only illustration in the system.
- **A single line-drawn lock icon** — used in the data-privacy section. Stroke-only, no fill, drawn in `{colors.ink}`.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Nav, footer, FAQ row dividers — flat structural lines |
| `{rounded.sm}` | 6px | Inline code chips, command tags |
| `{rounded.md}` | 8px | Rare medium-radius surfaces (e.g., dropdown panels) |
| `{rounded.lg}` | 12px | Pricing cards, terminal mockup card |
| `{rounded.full}` | 9999px | Every button, every pill input, install-snippet pill, search pill, traffic-light dots |

The dominant shape vocabulary is just two values: pills (`{rounded.full}`) for everything interactive and 12px (`{rounded.lg}`) for the few cards in the system. There are no medium-radius "soft cards" — surfaces are either pills or rectangles with corners large enough to read as deliberately soft.

### Photography Geometry
There is no photography. The only image-like elements are:
- **The llama mascot** — a hand-drawn line illustration, ~80–120px on the hero, ~32–48px when it appears as a pricing-card eyebrow icon.
- **The lock icon** — single stroke line drawing in the privacy section.
- **macOS traffic-light dots** — three filled circles at 12px (`{rounded.full}`) inside the terminal mockup card.

## Components

> **No hover states documented** per system policy. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`** — the universal Ollama CTA
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button-md}`, padding `8px 20px`, height `36px`, rounded `{rounded.full}`.
- Used for "Download" (top nav), "Sign in" (top nav, paired with Download), "Create account", "Get Pro", "Get Max" — every primary action in the system.
- Pressed state lives in `button-primary-active` — background drops to `{colors.ink-deep}`.

**`button-secondary`** — outline alternative on light canvas
- Background `{colors.canvas}`, text `{colors.ink}`, 1px solid `{colors.hairline-strong}`, type `{typography.button-md}`, padding `8px 20px`, height `36px`, rounded `{rounded.full}`.
- Used as a secondary affordance — e.g., the "Sign in" pill in the top nav when paired with the black "Download" pill, "See more apps →" arrow link in compact form.

**`button-pill-on-dark`** — white pill on dark surface
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.button-md}`, rounded `{rounded.full}`.
- Sits inside the dark "Max" pricing card as the "Get Max" CTA — inverts the standard primary so the dark card itself becomes the visual anchor and the white pill reads as the CTA.

**`button-disabled`**
- Background `{colors.surface-soft}`, text `{colors.mute}`, rounded `{rounded.full}` — flat soft gray.

### Inputs & Forms

**`search-pill`** + **`search-pill-focused`**
- Default: background `{colors.surface-soft}`, text `{colors.ink}`, type `{typography.body-sm}`, padding `8px 16px`, height `36px`, rounded `{rounded.full}`. Anchored in the center of the primary nav with a small magnifier icon prefix and "Search models" placeholder.
- Focused: background flips to `{colors.canvas}` and the browser-default `{colors.focus-ring}` translucent blue ring appears.

**`text-input`** + **`text-input-focused`**
- Default: background `{colors.canvas}`, 1px solid `{colors.hairline}`, type `{typography.body-md}`, padding `8px 16px`, height `40px`, rounded `{rounded.full}`.
- Focused: 1px ink border + browser-default focus ring.

**`install-snippet`** — the signature install pill
- Background `{colors.surface-soft}`, text `{colors.ink}` rendered in `{typography.code-md}`, padding `12px 20px`, height `48px`, rounded `{rounded.full}`.
- Contains the literal `curl -fsSL https://ollama.com/install.sh | sh` install command with a small copy-icon at the right edge. Sits directly below the hero headline as the page's most prominent "CTA."

**`command-tag`** — small inline command chip
- Background `{colors.surface-soft}`, text `{colors.ink}` in `{typography.code-sm}`, padding `6px 12px`, rounded `{rounded.full}`.
- Used inside the "Automate your work" section for the `ollama launch openclaw` example chip and similar inline-command demos.

### Cards & Containers

**`terminal-card`** — the home page's only "product preview"
- Container: background `{colors.canvas}`, 1px solid `{colors.hairline}`, padding `{spacing.lg}` (16px), rounded `{rounded.lg}`.
- Header: three `{component.terminal-traffic-lights}` dots (red/yellow/green at 12px) anchored to the top-left of the card.
- Body: terminal output rendered in `{typography.code-sm}` with comments in `{colors.mute}` and active commands in `{colors.ink}`.

**`terminal-traffic-lights`**
- Three 12px filled circles at `{rounded.full}`: `{colors.terminal-red}`, `{colors.terminal-yellow}`, `{colors.terminal-green}`. Sits as a row of three with `{spacing.xs}` gaps between dots inside the terminal card header.

**`pricing-card`** — Free / Pro tiers
- Container: background `{colors.canvas}`, 1px solid `{colors.hairline}`, padding `{spacing.xxl}` (32px), rounded `{rounded.lg}`.
- Layout: small llama mascot icon (~32px) at top, tier name in `{typography.heading-md}`, one-line tier description, large price in `{typography.display-lg}` (`$0` / `$20`), single `{component.button-primary}` CTA, divider, `{typography.body-sm-strong}` "Everything in Free, plus:" header, list of `{component.feature-bullet}` rows.

**`pricing-card-dark`** — Max tier (inverted)
- Identical layout to `pricing-card` but with `{colors.surface-dark}` background, `{colors.on-dark}` text, `{colors.on-dark-mute}` secondary text, and `{component.button-pill-on-dark}` CTA. The inversion is the system's single "look here" cue.

**`feature-bullet`** — pricing card list item
- Inline `✓` checkmark at `{colors.ink}` followed by `{typography.body-sm}` text in `{colors.charcoal}`. No background, no border, just stacked rows with `{spacing.sm}` between them.

**`faq-row`** — `/pricing` FAQ entry
- Container: background `{colors.canvas}`, padding `16px 0`, 1px bottom border `{colors.hairline}`.
- Question: `{typography.heading-sm}` (18px / 500) in `{colors.ink}`.
- Answer: `{typography.body-md}` (16px / 400) in `{colors.body}`, sitting directly below the question with `{spacing.xs}` gap. Always expanded — no accordion collapse.

**`cta-strip-dark`** — rare dark CTA band
- Background `{colors.surface-dark}`, text `{colors.on-dark}` in `{typography.heading-lg}`, padding `24px 32px`, rounded `{rounded.lg}`. Used sparingly between sections.

### Inline

**`link-inline`** — body-prose anchor link
- `{colors.ink}` text with underline. Default decoration is `text-decoration: underline`.

**`link-mute`** — secondary anchor in long-form prose
- `{colors.body}` text with underline appearing on default — used in FAQ answers ("see [hello@ollama.com](mailto:)") and footer.

### Navigation

**`primary-nav`**
- Background `{colors.canvas}`, text `{colors.ink}`, height 56px, type `{typography.body-sm-strong}`, rounded `{rounded.none}`.
- Layout (desktop): llama icon (left) followed by "Models · Docs · Pricing" text links, centered `{component.search-pill}`, and a right cluster of "Sign in" + black `{component.button-primary}` "Download".

**Top Nav (Mobile)**
- Llama icon at left, hamburger drawer trigger at right. Search pill expands to full-width when triggered. The drawer lists "Models · Docs · Pricing · Sign in · Download" stacked vertically with `{spacing.lg}` row gaps.

### Footer

**`footer-section`**
- Background `{colors.canvas}`, 1px top border `{colors.hairline}`, padding `32px 24px`, type `{typography.caption-sm}` `{colors.body}`.
- Single horizontal row of small links: "Download · Blog · Docs · GitHub · Discord · X · Contact · Privacy · Terms" + a "© 2026 Ollama" copyright at the right edge. Wraps to two rows on narrow screens.

## Do's and Don'ts

### Do
- Treat the page like a Markdown document: single reading column, plenty of `{spacing.section}` air between sections, no decorative dividers.
- Use `{component.button-primary}` (black pill) for every primary action. There is no green, no blue, no brand-tinted CTA.
- Default to `{rounded.full}` for any interactive element. Cards get `{rounded.lg}` (12px) and that is the only exception.
- Use `{typography.display-xl}` SF Pro Rounded for the hero headline and `{typography.body-md}` system sans for everything else. Avoid intermediate display sizes.
- Reserve `{component.pricing-card-dark}` (the inverted dark surface) for exactly one "look here" moment per page — never use it twice.
- Render install commands and CLI examples inside `{component.install-snippet}` or `{component.terminal-card}` with `{typography.code-md}` / `{typography.code-sm}`. Code is a first-class component.
- Keep the llama mascot the only illustration in the system. It is the brand.

### Don't
- Don't introduce gradients, drop shadows, or atmospheric backgrounds. The canvas is pure `{colors.canvas}`.
- Don't add brand colors. The system is `{colors.primary}` (black) on `{colors.canvas}` (white) with `{colors.body}` (gray) text. That is it.
- Don't soften pills or sharpen cards — pills stay `{rounded.full}`, cards stay `{rounded.lg}`. Don't introduce `{rounded.md}` for buttons or `{rounded.full}` for cards.
- Don't lift cards with shadows. Use a 1px `{colors.hairline}` border or invert to `{colors.surface-dark}` — those are the only two card treatments.
- Don't replace `ui-sans-serif` with a branded display body face. The system relies on `system-ui` rendering to feel native.
- Don't fill long-form pages with marketing chrome. FAQ answers stay in `{colors.body}` body-md prose with no decorative containers.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| desktop-large | 1280px+ | Default desktop — 720px content column, 3-up pricing grid |
| desktop | 1024px | Same layout; nav remains horizontal |
| tablet | 850px | Pricing collapses from 3-up to 2-up + 1; nav search pill compresses |
| tablet-narrow | 768px | Pricing collapses to 1-up stacked; primary nav becomes hamburger |
| mobile | 640px | Hero headline drops from `{typography.display-xl}` (36px) to ~28px; install-snippet wraps; section padding tightens |

### Touch Targets
All interactive elements meet WCAG AA at the 36–40px height range. `{component.button-primary}` and `{component.button-secondary}` sit at 36px height with 20px horizontal padding, giving an effective tappable area of ~36×80px which exceeds the 44×44px AAA threshold via the inline padding. `{component.text-input}` sits at 40px. `{component.search-pill}` sits at 36px height with 16px padding. Footer links use `{typography.caption-sm}` (12px) but receive ~12px line-height + ~8px vertical padding for a tappable row of ~32–36px.

### Collapsing Strategy
- **Primary nav:** desktop horizontal → tablet-narrow hamburger drawer at 768px. The black "Download" CTA stays visible at all widths; it never collapses into the menu.
- **Search pill:** desktop fixed width ~360px → tablet compressed to ~240px → mobile collapses to icon-only with a full-width overlay on tap.
- **Pricing grid:** 3-up → 2+1 → 1-up stacked at 850, 768, and below. The dark "Max" card stays in its inverted treatment at every breakpoint.
- **Automate-your-work split:** desktop 50/50 → tablet stacks vertical with text above terminal mockup.
- **Hero headline:** `{typography.display-xl}` (36px) at desktop, scaling to ~28px at mobile with line-height holding at ~1.15.
- **Section spacing:** `{spacing.section}` (88px) desktop → 64px tablet → 48px mobile.
- **Install-snippet pill:** wraps `curl` text to a second line on narrow screens rather than truncating; the copy-icon stays anchored to the right edge.

### Image Behavior
The only image asset is the llama mascot (raster PNG at multiple resolutions: 16/32/48/64/180/192/512px). It is rendered at fixed pixel sizes on the hero and pricing cards rather than scaling responsively — the brand asset is treated like a logo, not a hero image.

## Iteration Guide

1. Focus on ONE component at a time. Pull its YAML entry from the front matter and verify every property resolves.
2. Reference component names and tokens directly (`{colors.primary}`, `{component.button-primary-active}`, `{rounded.full}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-active`, `-disabled`, `-focused`) — do not bury them inside prose.
5. Default body to `{typography.body-md}`; reach for `{typography.body-sm}` for footer/utility text; reserve `{typography.display-xl}` strictly for the page-top headline.
6. Keep `{colors.primary}` scarce per viewport — there should be at most one black pill per fold (counting nav, hero CTA, and pricing-card CTA together). The design's restraint is the design.
7. When introducing a new component, ask whether it can be expressed with the existing pill + flat-card + terminal-mockup vocabulary before adding new tokens. The system's strength is that it almost never needs new ones.

## Known Gaps

- **Mobile screenshots not captured** — responsive behavior synthesizes Ollama's known mobile pattern (hamburger drawer, 1-up pricing stack, install-snippet wrap) from desktop evidence and the extracted breakpoint stack.
- **Hover states not documented** by system policy.
- **Form field styling** beyond search and install-snippet is not present in the captured surfaces — there is no visible long-form form on the home or pricing pages.
- **Authenticated chrome** (account dropdown, billing settings, model dashboard) not in the captured pages.
- **Models / Docs pages** not in the captured set — those surfaces likely add a sidebar and a docs typography tier that this document does not describe.---
version: alpha
name: PlayStation-design-analysis
description: |
  A three-surface marketing system organized around alternating black, white, and PlayStation Blue chapters that scroll past the viewer like a console launch trailer. Each section has a single editorial purpose — hero photography, console product render, PS Plus tier callout, news strip — and each owns one of three full-bleed canvas modes. The chrome is unusually quiet for a gaming brand: bright PlayStation Blue (`#0070d1`) carries every primary CTA as a fully-rounded pill, the proprietary SST face renders display copy at a signature weight 300 (light) for an airy, premium feel, and a crisp 8px-radius secondary card system carries product info on either canvas mode. The system never decorates — no gradient backgrounds on chrome, no atmospheric mesh, no drop shadows beyond a faint section-divide. Imagery does all the heavy lifting: console glamour shots, game key art, and PS Plus tier illustrations occupy 60-90% of every section, with copy compressed into a small editorial slot.

colors:
  primary: "#0070d1"
  primary-pressed: "#0064b7"
  primary-active: "#004d8d"
  on-primary: "#ffffff"
  link-light: "#0064b7"
  link-dark: "#53b1ff"
  commerce: "#d53b00"
  commerce-pressed: "#aa2f00"
  commerce-link-base: "#d63d00"
  on-commerce: "#ffffff"
  ink: "#000000"
  ink-deep: "#121314"
  ink-elevated: "#181818"
  charcoal: "#1f2024"
  body-light: "rgba(0,0,0,0.6)"
  mute-light: "#6b6b6b"
  ash-light: "#cccccc"
  body-dark: "rgba(255,255,255,0.7)"
  mute-dark: "rgba(229,229,229,0.55)"
  ash-dark: "rgba(229,229,229,0.2)"
  canvas-light: "#ffffff"
  surface-soft: "#f3f3f3"
  surface-card: "#f5f7fa"
  surface-filter: "rgba(245,247,250,0.3)"
  canvas-dark: "#000000"
  surface-dark-elevated: "#121314"
  surface-dark-card: "#181818"
  hairline-light: "#f3f3f3"
  hairline-dark: "rgba(229,229,229,0.2)"
  on-dark: "#ffffff"
  on-dark-mute: "#cccccc"
  warning: "#c81b3a"
  ps-plus-gold-start: "#ffce21"
  ps-plus-gold-mid: "#f5a623"
  ps-plus-gold-end: "#ee8e00"
  marathon-yellow: "#deff20"

typography:
  display-xl:
    fontFamily: PlayStation SST
    fontSize: 54px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: -0.1px
  display-lg:
    fontFamily: PlayStation SST
    fontSize: 44px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0.1px
  display-md:
    fontFamily: PlayStation SST
    fontSize: 35px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0
  heading-xl:
    fontFamily: PlayStation SST
    fontSize: 28px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0.1px
  heading-lg:
    fontFamily: PlayStation SST
    fontSize: 22px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0.1px
  heading-md:
    fontFamily: PlayStation SST
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  body-md:
    fontFamily: PlayStation SST
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.1px
  body-strong:
    fontFamily: PlayStation SST
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0.4px
  body-sm:
    fontFamily: PlayStation SST
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption-md:
    fontFamily: PlayStation SST
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption-sm:
    fontFamily: PlayStation SST
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  link-md:
    fontFamily: PlayStation SST
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-lg:
    fontFamily: PlayStation SST
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.45px
  button-md:
    fontFamily: PlayStation SST
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.324px

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: 12px 28px
    height: 48px
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
  button-commerce:
    backgroundColor: "{colors.commerce}"
    textColor: "{colors.on-commerce}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: 12px 28px
    height: 48px
  button-commerce-pressed:
    backgroundColor: "{colors.commerce-pressed}"
    textColor: "{colors.on-commerce}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
  button-secondary-light:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: 12px 28px
    height: 48px
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: 12px 28px
    height: 48px
  button-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ash-light}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
    height: 48px
  text-input-focused:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  filter-pill:
    backgroundColor: "{colors.surface-filter}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  filter-pill-active:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  product-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  product-card-dark:
    backgroundColor: "{colors.surface-dark-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  game-tile:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 0px
  feature-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 32px
  hero-band-blue:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-md}"
    rounded: "{rounded.none}"
    padding: 96px 48px
  hero-band-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.none}"
    padding: 96px 48px
  hero-band-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.none}"
    padding: 96px 48px
  ps-plus-banner:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.heading-xl}"
    rounded: "{rounded.md}"
    padding: 48px 32px
  carousel-paddle:
    backgroundColor: "rgba(255,255,255,0.16)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    size: 48px
  pagination-dot:
    backgroundColor: "{colors.ash-dark}"
    rounded: "{rounded.full}"
    size: 8px
  pagination-dot-active:
    backgroundColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    size: 8px
  badge-info:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  primary-nav:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    height: 48px
  sub-nav:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.none}"
    height: 40px
  footer-section:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.none}"
    padding: 48px 32px
  support-search-bar:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    height: 56px
  support-row:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 0px
  link-inline:
    textColor: "{colors.link-light}"
    typography: "{typography.link-md}"
---

## Overview

PlayStation's marketing system reads like a console launch trailer scrolling past the viewer in chapters. Each section is a full-bleed band — pure black `{colors.canvas-dark}`, true white `{colors.canvas-light}`, or PlayStation Blue `{colors.primary}` — and each chapter owns one editorial moment: hero console photography, a games-coming-soon strip, the PlayStation Plus tier banner, the "30 Years of PlayStation" anniversary band, the news strip from the PlayStation Blog. There is no decorative chrome between chapters; the section background change IS the divider. Sections stack at `{spacing.section}` (96px) rhythm with the next band's color taking over the page edge-to-edge.

The system has two distinct surface modes that alternate down the page: a **dark canvas mode** for editorial product moments (hero, "ON PLAYSTATION" band, marathon game pages) and a **light canvas mode** for utility surfaces (PS5 games listing, support pages, news index). Both modes use the same chrome vocabulary — fully-rounded `{rounded.full}` pill buttons, 8px-radius `{rounded.md}` cards, the proprietary PlayStation SST face — only the surface and on-surface colors change. The third surface mode is the **PlayStation Blue band** (`{colors.primary}` — `#0070d1`) reserved for the highest-priority moments: the Marathon launch CTA strip, the footer, and any "Action Required" banner.

The typography is the system's most distinctive choice. PlayStation SST renders display headlines at **weight 300** (light) — unusual for a gaming brand that could easily reach for bold geometric display faces. The light weight gives the chrome an airy, almost editorial quality that lets the imagery speak; copy is information rather than decoration. Heading sizes drop in tight increments (54 → 44 → 35 → 28 → 22 → 18) and body settles at 18px with 1.5 line-height for comfortable long-form reading on support and games pages.

**Key Characteristics:**
- Three-canvas chapter system: `{colors.canvas-dark}` (black), `{colors.canvas-light}` (white), `{colors.primary}` (PlayStation Blue) alternating down the page
- PlayStation Blue (`{colors.primary}` — `#0070d1`) is the universal primary CTA — fully-rounded pill at `{rounded.full}` (9999px)
- Commerce orange (`{colors.commerce}` — `#d53b00`) is the secondary CTA reserved for "Buy now" / "Pre-order" / store actions
- PlayStation SST display tier renders at **weight 300** with -0.1px to +0.4px tracking — the brand's signature airy editorial voice
- 8px-radius (`{rounded.md}`) for product cards and feature panels; 4px-radius (`{rounded.sm}`) for inputs; pills (`{rounded.full}`) for every CTA
- Game tiles, console renders, and PS Plus tier illustrations occupy 60-90% of each section — imagery does the storytelling
- Color-block page rhythm (one observed band sequence): dark hero → light console showcase → dark "Great PS4 & PS5 games" rail → light "Discover PlayStation Plus" tier band → light "30 years of PlayStation" callout → dark "ON PLAYSTATION" band → light news strip → blue footer

## Colors

> **Source pages:** `/en-tr/` (home), `/en-tr/ps5/games/` (PS5 games listing), `/en-tr/games/marathon/` (single game page), `/tr-tr/support/account/` (support center). The chrome palette is identical across all four pages; the support page uses the light-canvas mode exclusively while marketing pages alternate.

### Brand & Accent
- **PlayStation Blue** (`{colors.primary}` — `#0070d1`): the brand's universal primary. Every primary CTA pill, the active filter chip, the footer surface, badge fills, and inline link color on dark surfaces.
- **PlayStation Blue Pressed** (`{colors.primary-pressed}` — `#0064b7`): pressed state for the primary pill — also doubles as the inline link color on light surfaces.
- **PlayStation Blue Active** (`{colors.primary-active}` — `#004d8d`): deeply-pressed state for the primary button.
- **Commerce Orange** (`{colors.commerce}` — `#d53b00`): the secondary CTA reserved for store/buy/pre-order actions. The only warm color in the system.
- **Commerce Orange Pressed** (`{colors.commerce-pressed}` — `#aa2f00`): pressed state for commerce buttons.
- **Marathon Yellow** (`{colors.marathon-yellow}` — `#deff20`): a single high-saturation game-page accent extracted from Marathon's product palette — used only inside the dedicated `/marathon/` game page chrome and not part of the system's general accent vocabulary.

### Surface
- **Canvas Dark** (`{colors.canvas-dark}` — `#000000`): pure black hero band, primary nav background, footer base. The dominant surface for editorial product moments.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — `#121314`): inset dark panels, PS Plus tier banner background, "ON PLAYSTATION" gradient end.
- **Surface Dark Card** (`{colors.surface-dark-card}` — `#181818`): game tile fill, dark product card background.
- **Canvas Light** (`{colors.canvas-light}` — `#ffffff`): true white console-showcase band, support page body, news strip background.
- **Soft Surface** (`{colors.surface-soft}` — `#f3f3f3`): hairline-soft band fill on light pages, divider rule on light surfaces.
- **Surface Card** (`{colors.surface-card}` — `#f5f7fa`): cool-blue-tinted product card and tier-card background on light canvas.
- **Surface Filter** (`{colors.surface-filter}` — `rgba(245,247,250,0.3)`): translucent fill for filter-pill default state on light canvas.
- **Hairline Light** (`{colors.hairline-light}` — `#f3f3f3`): 1px divider rule on light pages.
- **Hairline Dark** (`{colors.hairline-dark}` — `rgba(229,229,229,0.2)`): translucent 1px divider on dark canvas.

### Text
- **Ink** (`{colors.ink}` — `#000000`): primary text on `{colors.canvas-light}`. Headlines, button text, support body.
- **Ink Deep** (`{colors.ink-deep}` — `#121314`): warmer near-black for in-card titles on dark surfaces and deep-shadow gradients.
- **Ink Elevated** (`{colors.ink-elevated}` — `#181818`): the lightest of the dark-canvas inks, used for elevated card backgrounds.
- **Body Light** (`{colors.body-light}` — `rgba(0,0,0,0.6)`): translucent body text on light canvas — the system's default paragraph color.
- **Mute Light** (`{colors.mute-light}` — `#6b6b6b`): metadata text and footer link captions on light canvas.
- **Ash Light** (`{colors.ash-light}` — `#cccccc`): disabled-state text and lowest-emphasis utility on light surfaces.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): primary text on `{colors.canvas-dark}` — headlines, button text on dark hero bands.
- **Body Dark** (`{colors.body-dark}` — `rgba(255,255,255,0.7)`): translucent body text on dark canvas.
- **On Dark Mute** (`{colors.on-dark-mute}` — `#cccccc`): secondary text and disabled state on dark surfaces.
- **Mute Dark** (`{colors.mute-dark}` — `rgba(229,229,229,0.55)`): captions and metadata on dark canvas.

### Semantic
- **Warning** (`{colors.warning}` — `#c81b3a`): validation errors and destructive confirmation copy.
- **Link Light** (`{colors.link-light}` — `#0064b7`): inline body-prose anchor link on light canvas — same hex as `{colors.primary-pressed}`.
- **Link Dark** (`{colors.link-dark}` — `#53b1ff`): inline body-prose anchor link on dark canvas — a brightened blue for dark-mode legibility.

### Brand Gradient
- **PlayStation Plus Gold Gradient** — a horizontal three-stop gold gradient `{colors.ps-plus-gold-start}` (`#ffce21`) → `{colors.ps-plus-gold-mid}` (`#f5a623`) → `{colors.ps-plus-gold-end}` (`#ee8e00`) that anchors the PS Plus banner on the home page. The only gradient in the system; reserved exclusively for PS Plus chrome.

## Typography

### Font Family
- **PlayStation SST** is the proprietary brand sans-serif used across every text role on the site. It carries weights 300 (light), 400 (regular), 500 (medium), 600 (semibold), and 700 (bold), and falls back through `sst` → `Arial` → `Helvetica`. The brand's distinctive choice is using **weight 300 (light) for display headlines** — unusual for a gaming brand and the source of the system's editorial, airy character.
- **SST** appears as a secondary cut for in-product surfaces, falling back to Helvetica → Arial.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 54px | 300 | 1.25 | -0.1px | Hero headline ("Discover all PS5 consoles and accessories") |
| `{typography.display-lg}` | 44px | 300 | 1.25 | 0.1px | Section headline ("Great PS4 & PS5 games out now or coming soon") |
| `{typography.display-md}` | 35px | 300 | 1.25 | 0 | Mid-section headline, game-page sub-hero |
| `{typography.heading-xl}` | 28px | 300 | 1.25 | 0.1px | "30 Years of PlayStation" callout, in-band sub-heading |
| `{typography.heading-lg}` | 22px | 300 | 1.25 | 0.1px | News card title, support category title |
| `{typography.heading-md}` | 18px | 600 | 1 | 0 | Card label, navigation menu heading, in-product strong title |
| `{typography.body-md}` | 18px | 400 | 1.5 | 0.1px | Body copy, paragraph text, support article body |
| `{typography.body-strong}` | 18px | 500 | 1.25 | 0.4px | Inline emphasis, primary nav link, button label (large) |
| `{typography.body-sm}` | 16px | 400 | 1.5 | 0 | Card description, secondary body |
| `{typography.caption-md}` | 14px | 400 | 1.5 | 0 | Footer link, metadata, sub-nav text |
| `{typography.caption-sm}` | 12px | 500 | 1.5 | 0 | Smallest utility text, badge label |
| `{typography.link-md}` | 18px | 400 | 1.5 | 0 | Inline body-prose anchor link |
| `{typography.button-lg}` | 18px | 700 | 1.25 | 0.45px | Primary CTA pill |
| `{typography.button-md}` | 14px | 700 | 1.25 | 0.324px | Compact pill, filter chip, secondary CTA |

### Principles
The hierarchy works on a 1.25-line-height ladder almost exclusively — even body sits at 1.5 instead of the typical 1.6 — which keeps long-form support pages tight and console showcases efficient. The weight contrast between display (300) and button (700) is dramatic: a single 18px chrome line might host a heavyweight CTA next to a feather-light 22px headline, giving the system its editorial gaming-magazine feel.

### Note on Font Substitutes
PlayStation SST is proprietary. The closest open-source substitutes:
- **Roboto Light (300)** for the display tier — its slightly looser letter-spacing matches SST's display optical fit.
- **Inter** at weights 400/500/600 for body and chrome — the closest geometric sans match for SST's body cut.
- **Source Sans Pro Light (300)** as an alternative for the display tier when Roboto reads too utilitarian.

When substituting, preserve the +0.1px to +0.45px tracking on display and button tiers — the spacing is part of what makes PlayStation SST feel premium at the light weight.

## Layout

### Spacing System
- **Base unit:** 8px (with finer 4/12px steps for tight inline gaps).
- **Tokens (front matter):** `{spacing.xxs}` (4px) · `{spacing.xs}` (8px) · `{spacing.sm}` (12px) · `{spacing.md}` (16px) · `{spacing.lg}` (24px) · `{spacing.xl}` (32px) · `{spacing.xxl}` (48px) · `{spacing.section}` (96px).
- **Universal section rhythm:** every page in the set uses `{spacing.section}` (96px) as the vertical gap between major content blocks. Card grids use `{spacing.lg}` (24px) gutters; in-card padding sits at `{spacing.lg}` to `{spacing.xl}` depending on density.
- **Hero band padding:** 96px vertical / 48px horizontal — the largest spacing in the system, reserved for full-bleed surface chapters.

### Grid & Container
- **Max width:** ~1280px content area for body text on desktop with 24px gutters that expand to ~48px at ultrawide. Hero bands and game-tile rails go full-bleed with no max-width constraint on imagery.
- **Game tile carousel:** 4-up at desktop with horizontal scroll on the same row, collapsing to 3-up at 1024px and 2-up at 768px. Each tile uses 16:9 cover art at `{rounded.md}`.
- **Console showcase grid:** desktop 5-column thumbnail strip below the main hero render, collapsing to 3-up + horizontal scroll at tablet.
- **Support page:** desktop 2-column 30/70 split (sidebar nav + article body), collapsing to single-column with the sidebar promoted to a top accordion at mobile.
- **News strip:** 3-up card grid at desktop, 2-up at tablet, 1-up at mobile.

### Whitespace Philosophy
Whitespace is structural and band-defined. The 96px `{spacing.section}` between chapters reads as silence between trailer cuts — there's no decorative wash, no gradient transition, no mid-section divider. Inside a section, content is left-aligned in a tight column with the imagery breathing in the right 60-70% of the band. Paragraph text is comfortable at 1.5 line-height but column widths stay narrow (~520px at desktop) to keep long-form copy readable.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for hero bands, footer, full-bleed sections — the dominant treatment |
| 1 — Hairline divider | 1px solid `{colors.hairline-light}s` or `{colors.hairline-dark}` | Card borders, support row dividers, footer column rules |
| 2 — Soft active shadow | `0 4px 12px rgba(0,0,0,0.16)` | Active/pressed CTAs, lifted product card |
| 3 — Section gradient | Soft top-to-bottom darkening from `{colors.surface-dark-elevated}` to `{colors.canvas-dark}` | "ON PLAYSTATION" band — only place a gradient appears on chrome |

The system has effectively no resting shadow on cards; depth is built from surface-color contrast across band chapters. Cards lift only on press.

### Decorative Depth
Depth comes from the alternating-band rhythm and from the imagery itself:
- **Console product photography** — DualSense controller and PS5 console renders shot on neutral white with crisp edge lighting, full-bleed inside the light-canvas band.
- **Game key art** — full-bleed cinematic stills (Marathon, the latest blockbuster releases) inside dark-canvas bands with title lockup overlaid in the lower-left.
- **PS Plus tier banner** — a subtle horizontal gold gradient (`{colors.ps-plus-gold-start}` → `{colors.ps-plus-gold-end}`) sits as the only chrome gradient in the system, anchoring the "Discover PlayStation Plus" CTA.
- **"ON PLAYSTATION" gradient band** — top-to-bottom deepening from `{colors.surface-dark-elevated}` (`#121314`) to `{colors.canvas-dark}` (`#000000`) creates a cinematic dimming effect under the anniversary callout.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Hero bands, primary nav, footer, sub-nav, support article body — every full-bleed structural surface |
| `{rounded.sm}` | 4px | Text inputs, support search field utilities |
| `{rounded.md}` | 8px | Game tiles, product cards, feature cards, PS Plus banner |
| `{rounded.lg}` | 16px | Rare large container with extra-soft corners (e.g., dialog cards) |
| `{rounded.full}` | 9999px | Every CTA pill (primary / commerce / secondary), filter chips, pagination dots, carousel paddles |

The radius vocabulary works on a 4 / 8 / pill rhythm for chrome with structural surfaces staying flat at 0px.

### Photography Geometry
- **Hero console render:** large centered console + DualSense composition on white, ~70% width of the band, with copy slot to the left.
- **Game tiles:** 16:9 key art at `{rounded.md}` (8px), 4-up rail at desktop with horizontal carousel.
- **Marathon game page hero:** full-bleed cinematic 16:9 still with the "MARATHON" wordmark in the lower-left at light weight, brand yellow `{colors.marathon-yellow}` accent on a few small UI tags.
- **News card thumbnails:** 16:9 imagery at `{rounded.md}` with a small text block below.
- **Avatar / brand icons:** 32–40px circles for sub-nav social row.

## Components

> **No hover states documented** per system policy. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`** — the universal PlayStation CTA
- Background `{colors.primary}` (PlayStation Blue), text `{colors.on-primary}`, type `{typography.button-lg}`, padding `12px 28px`, height ~48px, rounded `{rounded.full}`.
- Used for "Add to bag", "Sign up", "Learn more", "Subscribe" — every primary action across both light and dark canvases.
- Pressed state lives in `button-primary-pressed` — background drops to `{colors.primary-pressed}` (`#0064b7`).

**`button-commerce`** — orange store CTA
- Background `{colors.commerce}` (`#d53b00`), text `{colors.on-commerce}`, type `{typography.button-lg}`, padding `12px 28px`, height ~48px, rounded `{rounded.full}`.
- Reserved for "Buy now", "Pre-order", "Add to cart" — store actions only. The only warm color in the system.
- Pressed state lives in `button-commerce-pressed` — background drops to `{colors.commerce-pressed}`.

**`button-secondary-light`** — outline variant on light canvas
- Background transparent, text `{colors.ink}`, 1px solid `{colors.ash-light}` border, type `{typography.button-lg}`, padding `12px 28px`, height ~48px, rounded `{rounded.full}`.
- Lower-emphasis CTA on white surfaces ("Learn more →", "Watch trailer").

**`button-secondary-dark`** — outline variant on dark canvas
- Background transparent, text `{colors.on-dark}`, 1px solid `{colors.hairline-dark}`, type `{typography.button-lg}`, padding `12px 28px`, height ~48px, rounded `{rounded.full}`.
- Same role as the light variant but inverted for use on `{colors.canvas-dark}` hero bands.

**`button-disabled`**
- Background `{colors.surface-soft}`, text `{colors.ash-light}`, rounded `{rounded.full}` — flat soft gray.

### Filter & Tab Chips

**`filter-pill`** + **`filter-pill-active`**
- Default: background `{colors.surface-filter}` (translucent), text `{colors.ink}`, type `{typography.button-md}`, padding `8px 16px`, rounded `{rounded.full}`.
- Active: background flips to `{colors.canvas-light}` (opaque white) — the chip "lifts" from the translucent default.
- Used in the PS5 games filter strip ("All", "Coming Soon", "PlayStation VR2", "Recently Released").

### Inputs & Forms

**`text-input`** + **`text-input-focused`**
- Default: background `{colors.canvas-light}`, text `{colors.ink}`, 1px solid `{colors.ash-light}`, type `{typography.body-md}`, padding `12px 16px`, height ~48px, rounded `{rounded.sm}` (4px).
- Focused: 2px solid `{colors.primary}` border, no halo (relies on the border weight increase as the focus signal).

**`support-search-bar`** — the support-page signature search field
- Background `{colors.canvas-light}`, text `{colors.ink}`, type `{typography.body-md}`, padding `12px 24px`, height ~56px, rounded `{rounded.full}`.
- Sits at the top of the support page hero with a magnifier icon at the left edge and "Search the support center" placeholder.

### Cards & Containers

**`product-card`** — light-canvas product/feature card
- Container: background `{colors.surface-card}` (`#f5f7fa` cool-blue-tinted), 1px solid `{colors.hairline-light}` (rare; usually borderless), padding `{spacing.lg}` (24px), rounded `{rounded.md}` (8px).
- Used for the "PlayStation Store" sale callout, news cards, and PS Plus tier comparison cards on light canvas.

**`product-card-dark`** — dark-canvas product card
- Container: background `{colors.surface-dark-card}` (`#181818`), padding `{spacing.lg}`, rounded `{rounded.md}`.
- Used for game-detail cards and dark-canvas feature panels.

**`game-tile`** — game/console thumbnail tile
- Container: background `{colors.surface-dark-elevated}`, padding 0, rounded `{rounded.md}`.
- Layout: 16:9 cover art at full bleed inside the radius, with title + platform tag overlaid at the bottom-left in `{typography.body-sm}`.
- Used in the "Great PS4 & PS5 games" rail and the PS5 games listing grid.

**`feature-card`** — light-canvas marketing card
- Container: background `{colors.canvas-light}`, padding `{spacing.xl}` (32px), rounded `{rounded.md}`.
- Used for the "PlayStation Store" hero card and similar feature panels with a small product icon, title, body, and CTA.

**`hero-band-blue`** — the PlayStation Blue full-bleed band
- Background `{colors.primary}`, text `{colors.on-primary}` in `{typography.display-md}`, padding `96px 48px`, rounded `{rounded.none}`.
- The Marathon launch CTA strip and the footer surface use this band. The band's defining purpose is "this is the action moment of the page."

**`hero-band-dark`** — full-bleed dark hero
- Background `{colors.canvas-dark}` (with optional gradient end at `{colors.surface-dark-elevated}`), text `{colors.on-dark}` in `{typography.display-xl}`, padding `96px 48px`, rounded `{rounded.none}`.
- The home-page hero, the game-detail page hero, and the "ON PLAYSTATION" anniversary band.

**`hero-band-light`** — full-bleed white hero
- Background `{colors.canvas-light}`, text `{colors.ink}` in `{typography.display-xl}`, padding `96px 48px`, rounded `{rounded.none}`.
- The console showcase band ("Discover all PS5 consoles and accessories") and the support page top.

**`ps-plus-banner`** — PlayStation Plus tier callout
- Background `{colors.surface-dark-elevated}` with the `{colors.ps-plus-gold-start}` → `{colors.ps-plus-gold-end}` gold gradient as a horizontal accent bar across the top, text `{colors.on-dark}` in `{typography.heading-xl}`, padding `48px 32px`, rounded `{rounded.md}`.
- The "Discover PlayStation Plus" full-width banner on the home page.

**`carousel-paddle`** — circular carousel control
- Background `rgba(255,255,255,0.16)`, icon `{colors.on-dark}`, rounded `{rounded.full}`, size 48px.
- Anchored to the left/right edge of the game tile carousel.

**`pagination-dot`** + **`pagination-dot-active`**
- 8px circle at `{rounded.full}`. Default fill `{colors.ash-dark}`; active fill `{colors.on-dark}`.
- Carousel position indicator below the game tile rail.

### Inline

**`badge-info`** — small info tag
- Background `{colors.primary}`, text `{colors.on-primary}` in `{typography.caption-sm}`, padding `4px 10px`, rounded `{rounded.full}`.
- "New", "Pre-order", "Coming Soon" labels overlaid on game tiles.

**`link-inline`** — body-prose anchor link
- `{colors.link-light}` text on light canvas / `{colors.link-dark}` on dark canvas, no underline by default. Inline body links inside support article paragraphs.

### Navigation

**`primary-nav`**
- Background `{colors.canvas-dark}`, text `{colors.on-dark}`, height ~48px, type `{typography.body-strong}`, rounded `{rounded.none}`.
- Layout (desktop): PlayStation P-logo at far-left, centered nav row ("Games · PS5 · PS4 · PS VR2 · Subscriptions · Hardware · Mobile · News · Shop · Support"), right cluster (search-glyph + locale + cart icon + user-avatar circle).

**`sub-nav`** — secondary nav strip
- Background `{colors.canvas-dark}`, text `{colors.on-dark}` in `{typography.caption-md}`, height ~40px, rounded `{rounded.none}`.
- Sits directly below the primary nav on PS5 games / single game / PS Plus pages with section-specific anchor links.

**Top Nav (Mobile)**
- Hamburger menu icon at left, P-logo at center, search + cart icons at right. Primary nav collapses into a full-screen dark drawer that slides from the left.

### Footer

**`footer-section`**
- Background `{colors.primary}` (PlayStation Blue), text `{colors.on-primary}` in `{typography.caption-md}`, padding `{spacing.xxl}` (48px) vertical.
- Layout: large PlayStation wordmark at top-left, multi-column link grid (locale selector, store links, account, support, social), bottom row with terms / privacy fine-print in `{typography.caption-sm}`.
- The footer's blue surface is the system's "we're done — return to the brand" anchor.

### Support-page-specific

**`support-row`** — support article-list row
- Background `{colors.canvas-light}`, text `{colors.ink}` in `{typography.body-md}`, padding `16px 0`, with a 1px `{colors.hairline-light}` bottom rule.
- Used for FAQ / category-listing rows on the support page with a small chevron-right icon at the right edge.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (PlayStation Blue) for primary CTAs and the footer surface only. The blue band is precious — at most one full-bleed blue band per page.
- Reserve `{colors.commerce}` (orange) for store/buy/pre-order CTAs only. It is never used on marketing chrome or hero pills.
- Use PlayStation SST at weight 300 for display headings (54 / 44 / 35 / 28 / 22). The light weight is the brand voice.
- Stack content sections at `{spacing.section}` (96px) rhythm with the next band's surface color taking over the page edge-to-edge — no decorative dividers between bands.
- Use `{rounded.full}` (9999px) on every CTA pill and `{rounded.md}` (8px) on every product card. The two-radius vocabulary is the entire shape system aside from inputs.
- Pair full-bleed game key art and console renders inside dark or light bands; let imagery occupy 60-90% of the band's vertical height.
- Use `{component.ps-plus-banner}` with the gold gradient exclusively for the PlayStation Plus tier callout — never decorate other components with the gold.

### Don't
- Don't introduce drop shadows on resting cards. The system is flat-on-canvas; cards lift only on press.
- Don't replace `{colors.primary}` with another shade of blue. The brand blue is precise — `#0070d1` for default and `#0064b7` for pressed.
- Don't use `{colors.commerce}` (orange) on marketing/hero CTAs. It's reserved exclusively for store actions.
- Don't introduce a sans-serif body font, italic, or monospace style. PlayStation SST carries every text role.
- Don't soften pill geometry. CTAs are always `{rounded.full}` — no medium-radius buttons.
- Don't use the gold PS Plus gradient on anything that isn't the PS Plus banner. It is a tier-specific brand asset.
- Don't put a gradient on chrome. The only allowed gradient is the gold PS Plus accent and the soft top-to-bottom darkening of the "ON PLAYSTATION" band.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| ultrawide | 1920px+ | Hero band stays at content max-width 1280px; outer gutters grow to ~80px |
| desktop-large | 1440px | Default desktop — 4-up game tile carousel, full primary nav |
| desktop | 1280px | Same layout with narrower outer gutters |
| desktop-small | 1024px | Game tile rail collapses to 3-up; sub-nav remains horizontal |
| tablet | 768px | Game tiles → 2-up; primary nav becomes hamburger drawer |
| mobile | 480px | Single-column everything; hero `{typography.display-xl}` scales 54px → ~32px |
| mobile-narrow | 320px | Section padding tightens to 32px; hero further scales to ~28px |

### Touch Targets
All interactive elements meet WCAG AAA (≥ 44×44px). `{component.button-primary}` and `{component.button-commerce}` sit at 48px height with 28px horizontal padding (effective ~48×100px tappable). `{component.text-input}` sits at 48px. `{component.support-search-bar}` sits at 56px. `{component.filter-pill}` is ~36–40px height with 16px padding extending to 44px tappable via inline padding. `{component.carousel-paddle}` is exactly 48×48 circular.

### Collapsing Strategy
- **Primary nav:** desktop horizontal cluster → tablet hamburger drawer at 768px. The right-cluster icons (search, cart, account) stay visible at every breakpoint.
- **Sub-nav:** desktop horizontal anchor row → tablet horizontal scroll → mobile select dropdown.
- **Game tile carousel:** 4-up → 3-up → 2-up at 1024 and 768px; carousel paddles stay visible at every desktop breakpoint, hide on mobile in favor of touch-swipe.
- **Hero bands:** stay full-bleed at every breakpoint; only the internal content column reflows from 2-column (text-left + image-right) to single-column (text above image).
- **Console showcase:** desktop 5-up thumbnail strip → tablet 3-up + horizontal scroll → mobile 1-up with paddle.
- **Support page:** desktop 30/70 split (sidebar + body) → tablet sidebar promoted to top accordion → mobile fully collapsed accordion.
- **Section padding:** `{spacing.section}` (96px) desktop → 64px tablet → 48px mobile.
- **Hero headline:** `{typography.display-xl}` (54px) at desktop, scaling 44px / 32px / 28px down the breakpoint stack.

### Image Behavior
- Hero imagery (console renders, game key art) uses art-direction crops on mobile so the central subject stays centered when the band collapses to single-column.
- Game tile cover art preserves 16:9 ratio at every breakpoint; only the column count changes.
- Console showcase thumbnails maintain their natural aspect (~1:1 product render) across breakpoints.
- All non-critical imagery is lazy-loaded as the user scrolls into the next chapter.

## Iteration Guide

1. Focus on ONE component at a time. Pull its YAML entry and verify every property resolves.
2. Reference component names and tokens directly (`{colors.primary}`, `{component.button-primary-pressed}`, `{rounded.full}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-pressed`, `-disabled`) — do not bury them inside prose.
5. Default body to `{typography.body-md}` (18px / 400 / 1.5); reach for `{typography.display-xl}` strictly for the page-top hero headline; use `{typography.body-strong}` for primary nav links.
6. Keep `{colors.primary}` scarce per viewport — at most one full-bleed PlayStation Blue band per page.
7. When introducing a new component, ask whether it can be expressed with the existing pill + 8px-radius card + full-bleed-band vocabulary before adding new tokens. The system's strength is that it almost never needs new ones.

## Known Gaps

- **Mobile screenshots not captured** — responsive behavior synthesizes PlayStation's known mobile pattern (hamburger drawer, single-column band reflow, hero downscale) from desktop evidence and the breakpoint stack.
- **Hover states not documented** by system policy.
- **Sign-in / authentication chrome** (login modal, account dashboard, profile pages) not in the captured pages.
- **PlayStation Store** in-store browsing surfaces (PDP / cart / checkout) are not in the captured set — those use a more dense data-table layout that this document does not describe.
- **Game-page-specific theming** — the `/marathon/` page uses `{colors.marathon-yellow}` as a chapter accent. Other game pages may pull in their own per-title brand colors that vary outside the documented system.
- **Form validation states** (success / error inline messages) not present in the captured surfaces beyond the `{colors.warning}` color token.