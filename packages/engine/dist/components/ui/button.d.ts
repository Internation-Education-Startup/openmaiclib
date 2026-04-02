import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: {
    variant?: "link" | "outline" | "default" | "secondary" | "ghost" | "destructive";
    size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
} & import('class-variance-authority/types').ClassProp) => string;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
