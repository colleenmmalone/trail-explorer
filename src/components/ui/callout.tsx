
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const calloutVariants = cva(
    "border-l-4 rounded-lg p-4 py-6",
    {
        variants: {
            variant: {
                default: `bg-primary-light text-primary border-primary`,
                purple: `bg-secondary-light text-secondary border-secondary`,
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface CalloutProps
    extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
        title: string;
   description: string;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
    ({ className, variant, ...props }, ref) => {
       
        return <div className={cn(calloutVariants({ variant, className }))} ref={ref} {...props} >
            <h3 className="text-md font-semibold mb-1 font-display">{props.title}</h3>
             <p className="text-sm ">{props.description}</p>
        </div>
    },
);

Callout.displayName = "Callout";

export { Callout, calloutVariants };