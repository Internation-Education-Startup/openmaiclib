import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const badgeVariants: (props?: {
    variant?: "link" | "outline" | "default" | "secondary" | "ghost" | "destructive";
} & import('class-variance-authority/types').ClassProp) => string;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
