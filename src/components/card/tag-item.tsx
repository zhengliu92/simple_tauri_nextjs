import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateVal } from "@/lib/storage";
import { useImgDataStore } from "@/hooks/use-img-data";
import { ImageSchema } from "@/types/img-type";
import { ChevronDown } from "lucide-react";

type Props = {
  img: ImageSchema;
  imgInView: number;
};

export const ItemsMap: Record<string, string> = {
  good: "良品",
  bad: "残次品",
  unknown: "未知",
};

export function TagItem({ img, imgInView }: Props) {
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
    <div className=' relative'>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className='border w-full h-10 absolute z-10 rounded-md flex justify-start p-3 items-center text-sm  bg-slate-500  hover:cursor-pointer'
      >
        {placeholder}
        <ChevronDown className='text-sm w-4 h-4 ml-auto' />
      </div>
      <Select
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        onValueChange={async (value) => {
          if (!img.id) {
            toast.error("图片id不存在");
            return;
          }
          await updateVal(img.id, value);
          let data_temp = imgStore.imgData;
          data_temp[imgInView].val = value;
          imgStore.setImgData([...data_temp]);
          toast.success(`标签已更新为${ItemsMap[value]}`);
        }}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='good'>良品</SelectItem>
            <SelectItem value='bad'>残次品</SelectItem>
            <SelectItem value='unknown'>未知</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
