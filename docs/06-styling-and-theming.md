# 6. Styling and Theming

This project uses **Tailwind CSS** for styling and a custom theming system built with CSS variables for easy customization.

## Tailwind CSS

Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you apply pre-existing utility classes directly in your HTML/JSX.

- **Configuration**: The Tailwind configuration is located in `tailwind.config.ts`.
- **Global Styles**: Global base styles and custom CSS variable definitions are in `src/app/globals.css`.

### Best Practices

- **Use `@apply` sparingly**: Prefer applying utilities directly in JSX for better readability and maintainability. Use `@apply` only for small, repeated sets of styles where a component isn't feasible.
- **Stick to the Theme**: Use theme-defined values for colors, spacing, and fonts (e.g., `bg-primary`, `p-4`, `text-lg`) instead of arbitrary values (e.g., `bg-[#123456]`, `p-[17px]`). This ensures consistency.

## Theming System

The application has a dynamic theming system that allows users to change the color scheme and mode (light/dark) in real-time.

### How It Works

The theming is controlled by CSS variables defined in `src/app/globals.css`. The `ThemeProvider` in `src/app/layout.tsx` (from `next-themes`) applies a class to the `<html>` element (e.g., `dark-blue`).

The CSS in `globals.css` uses these classes to set the values of the core theme variables:

```css
/* Core variables available everywhere */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 204 90% 54%;
  /* ... etc. */
}

/* Dark mode overrides */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... etc. */
}

/* Color theme override (example for blue) */
.dark-blue {
    --primary: 204 90% 54%;
    --primary-foreground: 210 40% 98%;
}
```

Components from ShadCN UI and custom components use these variables for styling. For example, the Button component uses `bg-primary`.

### Customizing the Theme

1.  **Changing Colors**: To change the primary color, you only need to modify the HSL values for `--primary` and `--primary-foreground` under the desired theme class (e.g., `.dark-blue`) in `src/app/globals.css`.
2.  **Adding a New Color Theme**:
    a.  Add the new color name (e.g., "red") to the `colors` array in `src/components/theme-customizer.tsx`.
    b.  Add the theme classes (e.g., `light-red`, `dark-red`) to `src/app/globals.css` and define the `--primary` and `--primary-foreground` variables for it.
    c.  Add the theme names to the `themes` array in `src/components/theme-provider.tsx`.

The **ThemeCustomizer** component (`src/components/theme-customizer.tsx`) handles the logic for switching themes and persisting the user's choice in `localStorage`.
