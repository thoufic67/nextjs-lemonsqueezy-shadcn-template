"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export const PageTitleAction = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="size-10 rounded-full"
            size="icon"
            onClick={() =>
              toast("This demo action isn't supposed to do anything.")
            }
          >
            <PlusIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          Add new
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
