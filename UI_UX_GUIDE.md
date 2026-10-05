# TeenTalk - UI/UX Design System & Style Guide

The TeenTalk platform employs a **calm, trusting, and accessible** design system engineered specifically for adolescents facing emotional distress, as well as institutional administrators requiring clear, clutter-free oversight.

---

## 1. Design Philosophy

- **Emotional Safety & Reassurance**: Colors and typography are chosen to de-escalate anxiety and invite honest sharing. Harsh warning red is reserved strictly for true emergency hotlines or self-harm triggers.
- **Cognitive Clarity**: Information is chunked into readable cards, progressive disclosure disclosures, and clear step-by-step flows.
- **Mobile-First Responsiveness**: Designed to function seamlessly on budget smartphones (320px width minimum) where students frequently access personal resources.
- **Zero Incomplete States**: Every view provides dedicated **Loading**, **Empty**, **Success**, and **Error** feedback states.

---

## 2. Color Palette & Semantics

### Primary Brand (Calm Teal)
Conveys psychological safety, growth, and trust.
- `brand-50`: `#f0fdfa` (Light background tint)
- `brand-100`: `#ccfbf1` (Hover state for badges)
- `brand-500`: `#14b8a6` (Interactive accents)
- `brand-600`: `#0d9488` (Primary action buttons & links)
- `brand-700`: `#0f766e` (Active / focused borders)
- `brand-900`: `#134e4a` (Deep headings)

### Supportive Safety (Institutional Blue)
Conveys statutory authority and structured governance.
- `safety-50`: `#eff6ff`
- `safety-500`: `#3b82f6`
- `safety-600`: `#2563eb`
- `safety-700`: `#1d4ed8`

### Functional Accents
- **Emergency & Crisis (Rose)**: `#e11d48` (Childline 1098, Emergency 112, high-severity complaints)
- **Success & Mastery (Emerald)**: `#059669` (Quizzes passed, certificates, completed modules)
- **Caution & Progress (Amber)**: `#d97706` (In-progress modules, under-review cases)
- **Neutrals (Slate)**: Background `#f8fafc`, borders `#e2e8f0`, body copy `#334155`, text `#0f172a`.

---

## 3. Typography & Hierarchy

- **Primary Font Family**: `Plus Jakarta Sans`, falling back to `Inter` and system sans-serif.
- **Display Headings**: Font-weight 800 (extrabold), tight tracking (`tracking-tight`), line-height 1.15.
- **Card & Section Titles**: Font-weight 700 (bold), 16px - 20px.
- **Body Copy**: Font-weight 400/500, 14px (desktop) / 13px (mobile), leading 1.6 for enhanced readability.
- **Monospace Code/Tokens**: For tracking codes (`TT-CASE-2026-XXXX`) and certificate IDs.

---

## 4. Component Standards

### Cards (`Card.jsx`)
- Border radius: `rounded-2xl` (16px).
- Border: `1px solid border-slate-200/80`.
- Shadow: Soft, subtle shadow `shadow-xs` or `shadow-sm`.
- Hover state: `hover:shadow-md hover:border-slate-300 transition-all`.

### Interactive Buttons (`Button.jsx`)
- Sizes: `sm` (px-3 py-1.5, 12px), `md` (px-4 py-2.5, 14px), `lg` (px-6 py-3, 16px).
- Focus state: `ring-2 ring-brand-500/20 outline-none`.
- Loading spinner: Embedded inline without disrupting layout dimensions.

### Form Inputs (`InputField.jsx`, `SelectField.jsx`, `TextareaField.jsx`)
- High contrast borders (`border-slate-200 focus:border-brand-500`).
- Dedicated error labels in `text-rose-600`.
- Explanatory helper text beneath inputs to clarify privacy and formatting.

---

## 5. Viewport Breakpoint Standards

- **Mobile (Small)**: `320px - 480px` (Single-column layout, bottom sticky emergency contact, slide-over navigation drawer).
- **Tablet**: `640px - 1024px` (Two-column grid, responsive tables with horizontal scroll).
- **Desktop**: `1024px+` (Fixed 64-width sidebar, multi-column analytics grid, max content width 1280px).
