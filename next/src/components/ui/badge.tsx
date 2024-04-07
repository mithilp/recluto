import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FaCircleXmark, FaXmark } from "react-icons/fa6";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-white text-black",
				secondary: "border-transparent bg-white text-black",
				destructive: "border-transparent bg-white text-black",
				outline: "text-black",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props}>
			<div>{props.children}</div>
			<FaXmark className="h-3 w-3 ml-1" />
		</div>
	);
}

export { Badge, badgeVariants };
