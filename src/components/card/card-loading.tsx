import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { className?: string; dataLength?: number };

const CardLoading = ({ className }: Props) => {
  return (
    <div
      className={cn(
        " w-full h-full flex justify-center items-center",
        className
      )}
    >
      <div className='loader z-20 absolute' />
      <Skeleton className='absolute z-10 w-full h-full bg-black/20 inset-0 rounded-none' />
    </div>
  );
};

export default CardLoading;
