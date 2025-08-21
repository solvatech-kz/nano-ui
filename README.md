# 🚀 NanoUI

<img src="https://github.com/solvatech-kz/nano-ui/blob/7d5f59e8011dcb71d15ae486c2b7bc45aa796335/public/NanoLogo.png?raw=true" width="500">

NanoUI is a high-performance, lightweight component library for React, built on the principles of **zero-dependency** and maximum optimization. The project is fully **open-source** and distributed without restrictions.

---

## 📑 Table of Contents

- [💡 Why NanoUI?](#-why-nanoui)
- [🏗️ Project Architecture](#️-project-architecture)
- [📦 Component Library](#-component-library)
- [🛠️ Monorepo Structure & Workflow](#️-monorepo-structure--workflow)
  - [Workspace Layout](#workspace-layout)
  - [Creating a New Component](#creating-a-new-component)
  - [Using Components in the Next.js App](#using-components-in-the-nextjs-app)
  - [Testing Components](#testing-components)

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

- **Complete Component Isolation** – each component has its own styles, tokens, and overrides via props or CSS variables.
- **Zero-dependency** – no external runtime libraries, ensuring safe and lightweight builds.
- **Tree-shaking Optimized** – each component is an entry-point, and unused styles/components are removed during bundling.
- **SSR-ready** – styles are loaded together with the component.
- **CSS Variable Styling** – dynamic theming without rebuild.
- **Minimal Duplication** – internal utilities only, no global CSS pollution.
- **Flexible Integration** – works with Vite, Webpack, Next.js, Parcel.
- **Accessibility by Default** – semantic HTML, ARIA attributes, keyboard navigation, WCAG 2.1 AA compliant.

---

## 📦 Component Library

All components are isolated, semantic, and follow zero-dependency principles.

**Basic Elements:** Button, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Slider, File Upload, Color Picker  
**Forms & Validation:** Form, FormField, Password Input, Search Input  
**Information Display:** Card, Table, List, Avatar, Badge, Divider, Tooltip, Popover, Accordion, Tabs, Progress, Skeleton, Empty State  
**Modals & Notifications:** Dialog/Modal, Drawer/Sidebar, Toast, Alert, Confirm Dialog  
**Navigation:** Breadcrumbs, Pagination, Steps, Navbar, Sidebar Navigation, Command Palette  
**Media:** Image, Video Player, Audio Player  
**Graphics & Visualization:** Chart Wrapper, Stat  
**Other:** Loading Spinner, Collapse, Resizable Panel, Virtualized List, Infinite Scroll, Markdown

---

## 🛠️ Monorepo Structure & Workflow

### Workspace Layout

```
nano-ui/
├── apps/
│ └── web/ # Next.js demo & testing app
├── packages/
│ └── nanoui/ # Core component library
│ ├── src/ # Component source code
│ │ └── components/
│ │ └── button/
│ │ ├── Button.tsx
│ │ ├── Button.module.css
│ │ └── index.ts
│ └── tsconfig.json
├── package.json # Root workspace scripts
├── pnpm-workspace.yaml # Monorepo config
└── tsconfig.json # Root TypeScript config
```

- `packages/nanoui` – contains the actual component library.
- `apps/web` – Next.js application to test and demonstrate components.
- Root folder – contains workspace-wide scripts for building, testing, linting, and formatting.

---

### Creating a New Component

1. Create a new folder under `packages/nanoui/src/components/`:

`packages/nanoui/src/components/MyComponent/`

2. Add the component files:

- `MyComponent.tsx` – React component code.
- `MyComponent.module.css` – CSS module for styles.
- `index.ts` – export component:

```ts
export {default as MyComponent} from './MyComponent'
```

3. Update packages/nanoui/src/index.ts to export the new component:

```ts
export * from './components/MyComponent'
```

### Using Components in the Next.js App

1. Ensure @nanoui/core is listed in apps/web/package.json dependencies as:

`"@nanoui/core": "workspace:*"`

2. Import the component in your pages:

```ts
import { Button, MyComponent } from '@nanoui/core'

export default function Home() {
  return (
    <main>
      <h1>Hello NanoUI</h1>
      <Button>Click me</Button>
      <MyComponent />
    </main>
  )
}
```

3. Run the Next.js app for live preview:

`pnpm -F web dev`

### Testing Components

All components are tested using **Vitest** and `@testing-library/react`.

1. **Write unit tests next to the component**  
   For example, for `Button`:

```ts
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders Button component', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

2. **Run tests for the package**

```bash
pnpm -F @nanoui/core test
```

3. **Integration testing in Next.js app**

```ts
import { Button } from '@nanoui/core'

export default function Home() {
  return (
    <main>
      <h1>Hello NanoUI</h1>
      <Button>Click me</Button>
    </main>
  )
}
```

4. **Start dev server**

```bash
pnpm -F web dev
```

5. **Check component behavior and styling**

- All CSS is automatically imported from the package
- Verify props handling and interaction behavior
