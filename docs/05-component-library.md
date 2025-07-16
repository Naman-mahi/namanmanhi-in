# 5. Component Library Guide

This project uses **ShadCN UI** as its primary component library. ShadCN UI is not a traditional component library but rather a collection of reusable components that you can copy and paste into your apps and customize to your needs.

## Philosophy

- **You own the code**: Components live inside `src/components/ui`. This means you can change them as much as you want.
- **Composable and Accessible**: Built on top of Radix UI primitives, ensuring high-quality accessibility.
- **Styled with Tailwind CSS**: Components are styled using Tailwind CSS, making them easy to theme and customize.

## Using Existing Components

The core UI components are located in `src/components/ui`. You can import them directly into your pages and other components.

**Example**: Using a Button and a Card.
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>My Card</CardHeader>
      <CardContent>
        <p>This is a sample card component.</p>
        <Button className="mt-4">Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

## Creating New Components

When building new features, follow this component structure:

1.  **UI Primitives**: For any new, low-level UI element (e.g., a special kind of input), consider adding it to `src/components/ui` if it's generic enough.
2.  **Feature-Specific Components**: Components that are specific to a feature (like the blog or admin panel) should be placed in their respective folders inside `src/components`. For example:
    - `src/components/blog/BlogCard.tsx`
    - `src/components/admin/SubmissionList.tsx`
3.  **Page Sections**: Large components that compose a significant part of a page should be placed in `src/components/sections`. For example:
    - `src/components/sections/HeroCarousel.tsx`
    - `src/components/sections/ServicesGrid.tsx`

## Adding New ShadCN UI Components

If you need a component that is available from ShadCN but not yet in the project, you can add it using the ShadCN CLI.

**Example**: Adding the `Accordion` component.
```bash
npx shadcn-ui@latest add accordion
```
This command will add the accordion component files directly into `src/components/ui`, making them available for use throughout your project.
