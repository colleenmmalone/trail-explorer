import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const btn = "gap-[8px] py-[24px] px-[11px] rounded-md";
const btnFilled = "shadow-[0_3px_0] hover:shadow-[0_5px_0] active:shadow-[0_1px_0] transition-all duration-200 hover:translate-y-[-2px] active:translate-y-[2px]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `${btn} ${btnFilled} bg-primary text-primary-foreground hover:bg-muted shadow-[#1a2e1a] hover:shadow-[#1a2e1a] active:shadow-[#1a2e1a]`,
        destructive: `${btn} ${btnFilled} bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[#510303] hover:shadow-[#510303] active:shadow-[#510303]`,
        outline: `${btn} border border-primary/80 text-primary bg-background/30 hover:bg-primary/10  active:bg-primary/30`,
        secondary: `${btn} ${btnFilled} bg-accent text-secondary-foreground hover:bg-accent/80 shadow-[#8a4a20] hover:shadow-[#8a4a20] active:shadow-[#8a4a20] `,
        tertiary: `${btn} ${btnFilled} bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[#2e1e42] hover:shadow-[#2e1e42] active:shadow-[#2e1e42]`,
        ghost: `${btn} hover:bg-primary/15 active:bg-primary/30 `,
        link: `${btn} text-primary underline-offset-4 hover:underline active:bg-primary/10`,
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9  px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
