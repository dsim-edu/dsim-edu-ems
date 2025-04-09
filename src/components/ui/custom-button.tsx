import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface CustomButtonProps extends ButtonProps {
  pending?: boolean;
}

export function CustomBtn({
  pending,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn("w-32 cursor-pointer py-3 border md:py-6", className)}
      disabled={pending}
      {...props}
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin text-white duration-500" />
      ) : (
        children
      )}
    </Button>
  );
}
