import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground cursor-default",
        dark: "border-transparent bg-primary text-primary-foreground cursor-default",
        neutral: "text-foreground border-border bg-background",
        green: "text-primary border-primary/60 bg-primary/20",
        purple: "text-secondary border-secondary/60 bg-secondary/20",
        brown: "text-accent border-accent/60 bg-accent/20",
        red: "text-destructive border-destructive/60 bg-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
