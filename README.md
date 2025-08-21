# 🚀 NanoUI

NanoUI is a high-performance, lightweight component library for React, built on the principles of **zero-dependency** and maximum optimization. The project is fully **open-source** and distributed without restrictions.

---

## 📑 Table of Contents

- [💡 Why NanoUI?](#-why-nanoui)
- [🏗️ Project Architecture](#️-project-architecture)
  - [1. Complete Component Isolation](#1-complete-component-isolation)
  - [2. Zero-dependency and Secure Delivery](#2-zero-dependency-and-secure-delivery)
  - [3. Optimization for Tree-shaking](#3-optimization-for-tree-shaking)
  - [4. SSR-ready by Default](#4-ssr-ready-by-default)
  - [5. Styling via CSS Variables](#5-styling-via-css-variables)
  - [6. Minimizing Duplication](#6-minimizing-duplication)
  - [7. Flexible Integration](#7-flexible-integration)
- [📦 Component Library](#-component-library)
  - [Basic Elements](#basic-elements)
  - [Forms & Validation](#forms--validation)
  - [Information Display](#information-display)
  - [Modals & Notifications](#modals--notifications)
  - [Navigation](#navigation)
  - [Media](#media)
  - [Graphics & Visualization](#graphics--visualization)
  - [Other](#other)

---

## 💡 Why NanoUI?

Most popular UI libraries for React (Material UI, Chakra UI, Ant Design, shadcn/ui) suffer from excessive weight, a large number of dependencies, and a rigid attachment to specific styling tools. This results in:

- Increased bundle size and load times.
- Limited customization flexibility.
- Challenges in integrating with projects requiring high performance.

Additional dependencies also increase the risk of **version conflicts** and **supply chain attacks**, such as substitution or compromise of third-party packages. NanoUI's **zero-dependency** architecture completely eliminates these risks, as the final build contains no external dependencies that could become an attack vector.

---

## 🏗️ Project Architecture

NanoUI is designed with modularity, component isolation, and minimal bundle size in mind.

### 1. Complete Component Isolation

- Own style module (**CSS Modules**).
- Local design tokens defined within the component.
- Built-in default parameters with overrides via `props` and CSS variables.
- No dependency on global themes, CSS, or utility classes.
- **Guaranteed no style conflicts** when integrating into any project.

### 2. Zero-dependency and Secure Delivery

- No external runtime libraries: no CSS frameworks, CSS-in-JS solutions, or UI packages.
- The build process does not pull in transitive dependencies, eliminating `supply chain` risks.
- All functionality is implemented internally and undergoes unified auditing.

### 3. Optimization for Tree-shaking

- Each component is a separate **entry-point**.
- Styles are imported only within the component.
- No global CSS file — the bundle contains only the styles of used components.

### 4. SSR-ready by Default

- Styles are loaded together with the component.
- In SSR environments (Next.js, Remix), CSS is automatically inlined into the HTML response.
- **FOUC** (_flash of unstyled content_) is prevented by preloading critical styles.

### 5. Styling via CSS Variables

- Design tokens implemented with **CSS Variables** in the component's root element.
- Supports dynamic theming and style changes without rebuild.
- Tokens can be locally overridden per component instance.

### 6. Minimizing Duplication

- Common styles are implemented as internal utilities, not global classes.
- Variables and utilities are reused in the source code but are excluded from the bundle if unused.

### 7. Flexible Integration

- Works with **Vite, Webpack, Next.js, Parcel**.
- Partial integration — import only needed components.
- Supports **ESM** and **CJS** for maximum compatibility.

### 8. Accessibility by Default (WCAG 2.1 AA)

- All interactive components follow **WCAG 2.1 AA** accessibility guidelines.
- Semantic HTML elements and correct `role` / `aria-*` attributes are used for assistive technologies.
- Focus styles are clearly visible and consistent across all components.
- Color palettes and contrasts meet the AA standard for readability.
- Keyboard navigation is fully supported (Tab, Enter, Space, Escape, Arrow keys).
- Dynamic elements announce state changes to screen readers.

---

## 📦 Component Library

All components follow the `zero-dependency` principle, are fully isolated, and can be used independently. Special focus is placed on semantic correctness and leveraging native HTML/CSS capabilities.

### Basic Elements

- `Button` — buttons (primary, secondary, outline, ghost, link).
- `Input` — single-line text fields.
- `Textarea` — multi-line text fields.
- `Checkbox` — with indeterminate state.
- `Radio Group` — group of radio buttons.
- `Switch` — toggle switch.
- `Select` — dropdown list with custom styling.
- `Slider`, `Range Slider` — sliders.
- `File Upload` — file upload component.
- `Color Picker` — color selection tool.

### Forms & Validation

- `Form`, `FormField` — wrappers for working with forms.
- `Password Input` — password field with show/hide option.
- `Search Input` — search field with icon and quick clear.

### Information Display

- `Card`, `Table`, `List`.
- `Avatar`, `Badge`, `Divider`.
- `Tooltip`, `Popover`, `Accordion`, `Tabs`.
- `Progress`, `Skeleton`, `Empty State`.

### Modals & Notifications

- `Dialog` / `Modal`.
- `Drawer` / `Sidebar`.
- `Toast`, `Alert`, `Confirm Dialog`.

### Navigation

- `Breadcrumbs`, `Pagination`, `Steps`.
- `Navbar`, `Sidebar Navigation`, `Command Palette`.

### Media

- `Image`, `Video Player`, `Audio Player`.

### Graphics & Visualization

- `Chart Wrapper`, `Stat`.

### Other

- `Loading Spinner`, `Collapse`, `Resizable Panel`.
- `Virtualized List`, `Infinite Scroll`, `Markdown`.
