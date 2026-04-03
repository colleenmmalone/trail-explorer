import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground cursor-default",
        dark: "border-transparent bg-foreground text-primary-foreground cursor-default",
        neutral: "text-foreground border-border/90 bg-background cursor-default",
        green: "text-primary border-[#b7d4b8] bg-[#d8ead8] cursor-default",
        purple: "text-secondary border-[#c8b8e0] bg-[#e8e0f0] cursor-default",
        brown: "text-[#7a3f10] border-[#ddb890] bg-[#f0dcc8] cursor-default",
        red: "text-destructive border-[#dda898] bg-[#f0d0c8] cursor-default",
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
