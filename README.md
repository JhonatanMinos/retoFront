# Gestor de Contactos con Filtros

> Prueba técnica frontend — listado de contactos, formulario validado y filtros reactivos combinables.

## 🎯 Objetivo

SPA en React que combina:

- Listado de contactos (nombre, email, teléfono, departamento)
- Modal de alta con validación en tiempo real (Formik + Yup)
- Filtros combinables: texto por nombre + chips por departamento
- Estados de carga (skeleton) y estado vacío (empty state)

Fuente de datos: `data.json` local, cargado como estado inicial en memoria (sin backend).

## 🛠️ Stack tecnológico

| Capa                         | Tecnología                     | Por qué                                                                                                                                                               |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime / gestor de paquetes | **Bun**                        | Instalación de dependencias mucho más rápida que npm/yarn (resuelto en Zig, sin capa intermedia de Node); un solo binario hace de runtime, instalador y test runner.  |
| Bundler / dev server         | **Vite** (ejecutado sobre Bun) | Bun reemplaza a Node como motor, pero Vite sigue siendo el bundler con HMR más maduro para React — no hay razón para cambiarlo solo por usar Bun.                     |
| UI                           | **React 18 + TypeScript**      | El tipado estricto del modelo `Contact` / `Department` evita errores de forma o typos en producción — es un requisito explícito de la prueba, no solo buena práctica. |
| Estilos                      | **Tailwind CSS**               | Utilidades atómicas que encajan de forma natural con Atomic Design: cada átomo lleva sus propias clases, sin hojas de estilo separadas que mantener en sincronía.     |
| Formularios                  | **Formik + Yup**               | Formik controla estado/touched/submit del form; Yup declara el schema de validación y expone errores en tiempo real sin lógica manual de validación.                  |
| Formato y lint               | **Biome.js**                   | Un solo binario en Rust reemplaza ESLint + Prettier; formatea y lintea en el mismo comando, sin conflictos de reglas entre ambas herramientas ni doble config.        |
| IDs                          | `crypto.randomUUID()`          | UUID v4 nativo (navegador y Bun lo soportan) — no hace falta la dependencia `uuid` para esto.                                                                         |

## 🏗️ Arquitectura: Atomic Design

Mapeo directo a los componentes que pide la prueba:

- **Atoms**: `Button`, `Input`, `Label`, `Chip`, `Spinner`, `ErrorText`
- **Molecules**: `FormField` (Label + Input + ErrorText), `SearchBar`, `DepartmentFilter` (Chip[] con estado activo), `ContactCardSkeleton`
- **Organisms**: `ContactList` (lista + EmptyState + Skeleton), `ContactForm` (modal + Formik + Yup), `FilterBar` (SearchBar + DepartmentFilter + contador)
- **Templates**: `ContactManagerLayout`
- **Pages**: `ContactsPage`

**Por qué atomic design aquí, no en general:**

1. Reusabilidad real y no teórica: `Input`/`Button` se repiten literalmente entre el formulario y la barra de filtros.
2. Aísla la validación (Formik/Yup) dentro del organism `ContactForm`, sin que se filtre a los átomos.
3. Cada nivel se testea aislado, sin montar la app completa.
4. Un revisor de la prueba entiende la estructura solo con ver las carpetas, sin leer todo el código.

**Riesgo a vigilar:** con ~10-12 componentes es fácil crear capas vacías. Regla práctica: si un "molecule" solo envuelve un átomo sin agregar lógica propia, no lo crees — evita indirection sin valor.

## 📁 Estructura de carpetas

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Chip/
│   │   ├── Spinner/
│   │   └── ErrorText/
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── SearchBar/
│   │   ├── DepartmentFilter/
│   │   └── ContactCardSkeleton/
│   ├── organisms/
│   │   ├── ContactList/
│   │   ├── ContactForm/
│   │   └── FilterBar/
│   └── templates/
│       └── ContactManagerLayout/
├── hooks/
│   ├── useContacts.ts        # CRUD en memoria + carga inicial desde data.json
│   └── useContactFilters.ts  # filtrado combinado (nombre + departamento)
├── schemas/
│   └── contactSchema.ts      # Yup schema
├── types/
│   └── contact.ts            # Contact, Department
├── data/
│   └── data.json
├── pages/
│   └── ContactsPage.tsx
└── App.tsx
```

## 🔄 Manejo de estado

Solo custom hooks, sin store global — el alcance no lo justifica:

- `useContacts`: array de contactos + `add`/`delete`, carga inicial desde `data.json`.
- `useContactFilters`: deriva la lista filtrada a partir de `contacts` + texto + departamento activo.

Si más adelante se agrega persistencia o backend real, ahí sí vale la pena evaluar Context o Zustand. Para esta prueba, Redux/Zustand sería sobre-ingeniería.

## ✅ Requerimientos de la prueba

- [ ] React + TypeScript
- [ ] Carga inicial desde `data.json`
- [ ] Lista con nombre, email, teléfono, departamento
- [ ] UUID al agregar contacto
- [ ] Skeleton loading
- [ ] EmptyState (sin contactos / sin resultados de filtro)
- [ ] Botón eliminar contacto
- [ ] Modal con Formik + Yup (nombre, email, departamento obligatorios)
- [ ] Errores en tiempo real + botón deshabilitado si hay errores
- [ ] Búsqueda por nombre en tiempo real
- [ ] Chips de filtro por departamento
- [ ] Contador de resultados filtrados
- [ ] Filtros combinables (nombre + departamento simultáneo)
- [ ] Repo público en GitHub + README con instrucciones
- [ ] (Opcional) Deploy en Vercel/Netlify

## 🚀 Instalación y uso

```bash
bun install       # instalar dependencias
bun run dev       # entorno de desarrollo
bun run format    # formatear con Biome
bun run lint      # lint con Biome
bun run build     # build de producción
```

El `package.json` completo (dependencias + scripts) está en el mismo entregable, junto a este README. Nota sobre `build`: corre `tsc --noEmit` antes de `vite build` — si hay un error de tipos, el build falla ahí en vez de generar un bundle roto en producción.

## 📝 Decisiones técnicas (el porqué, no solo el qué)

- **Skeleton sin backend real**: simular con `setTimeout` (~500-800ms) dentro de `useContacts` al montar. Así el loading state es visible sin dejar datos falsos que luego haya que retirar.
- **EmptyState con una sola variante parametrizada** (`reason: "no-contacts" | "no-results"`): evita duplicar el componente por dos textos distintos.
- **Yup schema separado del componente**: permite testear las reglas de validación sin montar el modal, y reusarlas si más adelante se agrega edición de contactos.
- **Biome sobre ESLint + Prettier**: en un proyecto de este tamaño el ahorro real está en no mantener dos configs (`.eslintrc` + `.prettierrc`) que a veces chocan entre reglas de formato y de estilo.

## 🔮 Próximos pasos opcionales

- Deploy en Vercel (el build de Vite se arrastra y suelta directo)
- Tests con `bun:test` + Testing Library — `useContactFilters` es el más crítico de cubrir
- Persistencia en `localStorage` para sobrevivir a un refresh
