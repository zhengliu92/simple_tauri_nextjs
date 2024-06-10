import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { updateVal } from "@/lib/storage";
import { useImgDataStore } from "@/hooks/use-img-data";
import { ImageSchema } from "@/types/img-type";
import { ChevronDown, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  img: ImageSchema;
  imgInView: number;
};

export const ItemsMap: Record<string, string> = {
  good: "良品",
  bad: "残次品",
  unknown: "未知",
};

export function TagPopover({ img, imgInView }: Props) {
  let val = img.val;
  if (!val) {
    val = "unknown";
  }

  const imgStore = useImgDataStore();
  if (!Object.keys(ItemsMap).includes(val)) {
    val = "unknown";
  }

  const getItemValue = (val: string) => {
    const res = ItemsMap[val];
    if (!res) {
      return "未知";
    }
    return res;
  };
  const placeholder = getItemValue(val);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <PopoverTrigger className='w-full'>
        <div className='border w-full h-10 rounded-md flex justify-start p-3 items-center text-sm  hover:cursor-pointer'>
          {placeholder}
          <ChevronDown className='text-sm w-4 h-4 ml-auto' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='mr-4 '>
        <div className='p-0'>
          {Object.keys(ItemsMap).map((key) => {
            return (
              <button
                key={key}
                className={cn(
                  "p-2 rounded-md hover:bg-primary/10 flex items-center cursor-pointer w-full text-sm",
                  val === key && "cursor-not-allowed bg-primary/10"
                )}
                disabled={val === key}
                onClick={async () => {
                  await updateVal(img.id!, key);
                  let data_temp = imgStore.imgData;
                  data_temp[imgInView].val = key;
                  imgStore.setImgData([...data_temp]);
                  setOpen(false);
                  toast.success(`标签已更新为${ItemsMap[key]}`);
                }}
              >
                {ItemsMap[key]}
                {val === key && <CircleCheck className='w-4 h-4 ml-auto' />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
