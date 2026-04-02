# Design System Document: AI-Assisted Procurement Excellence

## 1. Overview & Creative North Star: "The Intelligent Architect"
The vision for this design system is **The Intelligent Architect**. Procurement is often a chaotic landscape of fragmented data; our role is to impose a sense of calm, editorial order. We move beyond the "standard SaaS dashboard" by treating data as a premium narrative. 

This system rejects the "box-inside-a-box" layout of the early 2010s. Instead, we use **Tonal Depth** and **Asymmetric Breathing Room** to guide the eye. We favor sophisticated layering and high-contrast typography over rigid borders. The result is a platform that feels like a high-end financial journal—authoritative, trustworthy, and effortlessly smart.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in the "Deep Blue" of traditional institutional trust, but elevated with "Soft Blue" accents to signal AI-driven modernity.

### Tonal Hierarchy
- **Primary:** `primary` (#002045) and `primary_container` (#1a365d). Used for high-level branding and primary actions.
- **Accent:** `secondary` (#006494) and `secondary_container` (#74c3fe). Used for AI-suggested insights and data highlights.
- **Backgrounds:** `surface` (#f7fafc) and `surface_container_lowest` (#ffffff).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off areas. Structural separation must be achieved through background color shifts.
- A card (`surface_container_lowest`) should sit on a section background (`surface_container_low`). 
- Navigation sidebars should be defined by a shift to `surface_container` rather than a vertical line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers:
1.  **Base:** `surface` (#f7fafc) - The global canvas.
2.  **Sectioning:** `surface_container_low` (#f1f4f6) - Defines broad content regions.
3.  **Active Workspace:** `surface_container_lowest` (#ffffff) - The highest-priority "paper" layer for cards and data tables.
4.  **Floating Elements:** Use Glassmorphism. Apply `surface_variant` at 60% opacity with a `backdrop-blur: 12px` to modals or dropdowns.

### Signature Textures
Main CTAs should not be flat. Use a subtle linear gradient from `primary` to `primary_container` (Top-Left to Bottom-Right) to add "visual soul" and a sense of depth that feels premium.

---

## 3. Typography: Editorial Authority
We use a dual-font approach to balance human readability with technical precision.

- **Display & Headlines (Manrope):** Chosen for its geometric stability and modern warmth.
    - `display-lg` (3.5rem): Used for high-level procurement KPIs.
    - `headline-md` (1.75rem): Used for page titles.
- **Body & Labels (Inter):** A workhorse for data density and clarity.
    - `body-md` (0.875rem): Standard for all procurement data tables.
    - `label-sm` (0.6875rem): All-caps with increased letter-spacing (0.05em) for category headers.

---

## 4. Elevation & Depth: The Layering Principle
We convey importance through **Tonal Layering**, not shadows.

- **Stacking:** Place a white card (`surface_container_lowest`) on a light gray background (`surface_container_low`) to create a natural "lift."
- **Ambient Shadows:** Only use shadows for floating components (Modals, Hovered Cards). 
    - **Specs:** `0px 12px 32px rgba(24, 28, 30, 0.06)`. 
    - The shadow is tinted by `on_surface` (#181c1e) at a very low opacity to mimic natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in a high-density table), use `outline_variant` (#c4c6cf) at **20% opacity**. Never use 100% opaque borders.
