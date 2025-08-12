"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  type ComponentProps,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type ButtonElement = ElementRef<typeof Button>;
type ButtonProps = ComponentProps<typeof Button> & {
  before?: ReactNode;
};

export const SubmitButton = forwardRef<ButtonElement, ButtonProps>(
  ({ before, className, children, ...props }, ref) => {
    const { pending } = useFormStatus();
    const loadingIcon = pending ? (
      <Loading size="sm" color="secondary" />
    ) : (
      before
    );

    return (
      <Button
        {...props}
        ref={ref}
        disabled={pending || props.disabled}
        className={cn("flex items-center gap-2", className)}
      >
        {loadingIcon}
        {children}
      </Button>
    );
  },
);
