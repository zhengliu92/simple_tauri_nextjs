import { ImageSchema } from "@/types/img-type";
import React, { useEffect } from "react";
import { NameToolTip } from "./name-hover";
import { TagItem } from "./tag-item";
import { Separator } from "../ui/separator";
import { useImgDataStore } from "@/hooks/use-img-data";
import { format } from "date-fns";

import { Skeleton } from "../ui/skeleton";
import { TagPopover } from "./tag-popover";

type Props = {
  imgInView: number;
  setImgInView: (id: number) => void;
};

const CardSideBar = ({ imgInView, setImgInView }: Props) => {
  const imgStore = useImgDataStore();
  const img = imgStore.imgData[imgInView];

  if (!img) {
    return <Skeleton className='w-full h-96 mr-4 bg-black/20' />;
  }

  return (
    <div className='w-full grid grid-cols-3 h-fit gap-y-4 font-semibold mr-4 justify-center items-center'>
      <div className='col-span-3'>图片信息</div>
      <Separator className='col-span-3 bg-primary/50 h-1 rounded-full' />
      <div>图片标题：</div>
      <div className='col-span-2'>{img.alt}</div>
      <div>创建日期:</div>
      <div className='col-span-2'>
        {format(img.createdAt!, "y/MM/dd HH:mm")}
      </div>
      <div>文件位置:</div>
      <div className='col-span-2'>
        <NameToolTip name={img.path} />
      </div>
      <div>预测结果：</div>
      <div className='col-span-2'>{img.pred}</div>
      <div>人工标注：</div>
      <div className='col-span-2'>
        <TagPopover
          img={img}
          imgInView={imgInView}
        />
      </div>
    </div>
  );
};

export default CardSideBar;
