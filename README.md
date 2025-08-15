# 🚀 NanoUI

NanoUI — это высокопроизводительная и легковесная библиотека компонентов для React, построенная на принципах **zero-dependency** и максимальной оптимизации. Проект является полностью открытым (`open-source`) и распространяется без ограничений.

## 💡 Зачем нужна NanoUI?

Большинство популярных UI-библиотек для React страдают от избыточного веса, большого количества зависимостей и жесткой привязки к конкретным инструментам стилизации. Это приводит к увеличению размера бандла и времени загрузки, а также к ограниченной гибкости.

Дополнительные зависимости также повышают риск конфликтов версий, усложняют поддержку и создают уязвимости для атак на цепочку поставок (`supply chain attacks`), таких как подмена или компрометация сторонних пакетов. Архитектура NanoUI с принципом **zero-dependency** полностью устраняет этот риск, так как в финальной сборке нет сторонних зависимостей, способных стать точкой атаки.

## 🏗️ Архитектура проекта

NanoUI спроектирован по принципам модульности, полной изоляции компонентов и минимизации веса бандла. Архитектура строится вокруг следующих ключевых идей:

### 1. Полная изоляция компонентов

Каждый компонент — это полностью самостоятельная единица:
* Собственный модуль стилей (**CSS Modules**).
* **Локальные дизайн-токены**, определённые в пределах компонента.
* Встроенные дефолтные параметры с возможностью переопределения через `props` и CSS-переменные.
* Отсутствие зависимости от глобальных тем, глобального CSS или сторонних утилитарных классов.

Это гарантирует отсутствие конфликта стилей при интеграции в любые проекты.

### 2. Zero-dependency и безопасная поставка

* **В кодовой базе нет внешних библиотек рантайма**: ни CSS-фреймворков, ни CSS-in-JS решений, ни сторонних UI-пакетов.
* Сборка **не подтягивает транзитивные зависимости**, что исключает риски `supply chain attacks`.
* Весь необходимый функционал реализован внутри проекта и проходит общий аудит.

### 3. Оптимизация для Tree-shaking

* Каждый компонент является отдельным **entry-point**.
* Стили импортируются только внутри компонента, что позволяет сборщику исключить неиспользуемые модули.
* Отсутствие общего CSS-файла — бандл включает только стили тех компонентов, которые реально импортированы.

### 4. Стилизация через CSS Variables

* Дизайн-токены реализованы через **CSS Variables**, которые объявляются в корневом элементе компонента.
* Поддерживается **динамическая темизация** и изменение стилей на лету без пересборки.
* Возможность локального переопределения токенов на уровне отдельного экземпляра компонента.

### 5. Минимизация дублирования

* Общие стили реализуются как внутренние утилиты, а не глобальные классы.
* Переменные и утилиты переиспользуются в рамках исходников, но не попадают в бандл, если компонент, их использующий, не импортирован.

### 6. Гибкая интеграция

* Совместимость с любыми сборщиками: **Vite, Webpack, Next.js, Parcel**.
* Возможность **частичной интеграции** — импортируйте только нужные компоненты без лишнего кода.
* Поддержка **ESM** и **CJS** для максимальной совместимости.

---

## 📦 Набор компонентов

Библиотека NanoUI включает в себя полный набор UI-элементов, разработанных по принципу `zero-dependency` и полной изоляции. Особое внимание уделяется семантической правильности и использованию нативных возможностей HTML/CSS.

### Базовые элементы
* `Button` — кнопки всех типов.
* `Input` — однострочное поле ввода.
* `Textarea` — многострочное поле ввода.
* `Checkbox` — переключатель с поддержкой indeterminate-состояния.
* `Radio Group` — группа радио-кнопок.
* `Switch` — тумблер.
* `Select` — выпадающий список с кастомной стилизацией.
* `Slider`, `Range Slider` — ползунки.
* `File Upload` — компонент загрузки файлов.
* `Color Picker` — выбор цвета.

### Формы и валидация
* `Form`, `FormField` — обёртки для работы с формами.
* `Password Input`, `Search Input` — специализированные поля ввода.

### Отображение информации
* `Card`, `Table`, `List`, `Avatar`, `Badge`, `Divider`.
* `Tooltip`, `Popover`, `Accordion`, `Tabs`.
* `Progress`, `Skeleton`, `Empty State`.

### Модальные и уведомления
* `Dialog` / `Modal` — модальные окна.
* `Drawer` / `Sidebar` — выезжающие панели.
* `Toast`, `Alert`, `Confirm Dialog`.

### Навигация
* `Breadcrumbs`, `Pagination`, `Steps`.
* `Navbar`, `Sidebar Navigation`, `Command Palette`.

### Медиа
* `Image`, `Video Player`, `Audio Player`.

### Графика и визуализация
* `Chart Wrapper`, `Stat`.

### Прочее
* `Loading Spinner`, `Collapse`, `Resizable Panel`.
* `Virtualized List`, `Infinite Scroll`, `Markdown`.

***

# 🚀 NanoUI

NanoUI is a high-performance, lightweight component library for React, built on the principles of **zero-dependency** and maximum optimization. The project is completely open-source and distributed without restrictions.

## 💡 Why NanoUI?

Most popular UI libraries for React suffer from excessive weight, a large number of dependencies, and a rigid attachment to specific styling tools. This leads to increased bundle size and load times, as well as limited flexibility.

Additional dependencies also increase the risk of version conflicts, complicate maintenance, and create vulnerabilities to **supply chain attacks**, where third-party packages can be compromised. NanoUI's **zero-dependency** architecture completely eliminates this risk, as the final build contains no external dependencies that could become an attack vector.

## 🏗️ Project Architecture

NanoUI is designed with modularity, complete component isolation, and minimal bundle size in mind. The architecture is built around the following key ideas:

### 1. Complete Component Isolation

Each component is a completely self-contained unit:
* Its own style module (**CSS Modules**).
* **Local design tokens**, defined within the component's scope.
* Built-in default parameters with the ability to override them via `props` and CSS variables.
* No dependency on global themes, global CSS, or third-party utility classes.

This guarantees no style conflicts when integrating into any project.

### 2. Zero-dependency and Secure Delivery

* The codebase contains **no external runtime libraries**: no CSS frameworks, no CSS-in-JS solutions, and no third-party UI packages.
* The build process **does not pull in transitive dependencies**, which eliminates the risk of `supply chain attacks`.
* All necessary functionality is implemented internally and undergoes a unified audit.

### 3. Optimization for Tree-shaking

* Each component is a separate **entry-point**.
* Styles are imported only within a component, allowing bundlers to exclude unused modules.
* There is no single global CSS file—the bundle only includes styles for the components that are actually used.

### 4. Styling via CSS Variables

* Design tokens are implemented using **CSS Variables**, which are declared in the component's root element.
* Supports **dynamic theming** and on-the-fly style changes without a rebuild.
* Tokens can be locally overridden at the level of an individual component instance.

### 5. Minimizing Duplication

* Common styles are implemented as internal utilities, not global classes.
* Variables and utilities are reused within the source code but do not end up in the final bundle if the component that uses them is not imported.

### 6. Flexible Integration

* Compatibility with any bundler: **Vite, Webpack, Next.js, Parcel**.
* Supports **partial integration**—import only the components you need without extra code.
* Supports **ESM** and **CJS** for maximum compatibility.

---

## 📦 Component Library

The NanoUI library includes a full set of UI elements, designed with the `zero-dependency` principle and complete isolation. We place maximum emphasis on semantic correctness and leveraging native HTML/CSS capabilities.

### Basic Elements
* `Button` — All button types.
* `Input` — A single-line text input field.
* `Textarea` — A multi-line text input field.
* `Checkbox` — A toggle with support for an indeterminate state.
* `Radio Group` — A group of radio buttons.
* `Switch` — A toggle switch.
* `Select` — A dropdown list with custom styling.
* `Slider`, `Range Slider` — Sliders.
* `File Upload` — A file upload component.
* `Color Picker` — A color selection tool.

### Forms & Validation
* `Form`, `FormField` — Wrappers for working with forms.
* `Password Input`, `Search Input` — Specialized input fields.

### Information Display
* `Card`, `Table`, `List`, `Avatar`, `Badge`, `Divider`.
* `Tooltip`, `Popover`, `Accordion`, `Tabs`.
* `Progress`, `Skeleton`, `Empty State`.

### Modals & Notifications
* `Dialog` / `Modal` — Modal windows.
* `Drawer` / `Sidebar` — Sliding panels.
* `Toast`, `Alert`, `Confirm Dialog`.

### Navigation
* `Breadcrumbs`, `Pagination`, `Steps`.
* `Navbar`, `Sidebar Navigation`, `Command Palette`.

### Media
* `Image`, `Video Player`, `Audio Player`.

### Graphics & Visualization
* `Chart Wrapper`, `Stat`.

### Other
* `Loading Spinner`, `Collapse`, `Resizable Panel`.
* `Virtualized List`, `Infinite Scroll`, `Markdown`.
