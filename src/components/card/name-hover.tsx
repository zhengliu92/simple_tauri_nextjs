"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NameToolTipProps {
  name?: string;
  classname?: string;
}

export function NameToolTip({ name, classname }: NameToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("truncate", classname)}> {name}</div>
        </TooltipTrigger>
        <TooltipContent className='max-w-md cursor-pointer'>
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
