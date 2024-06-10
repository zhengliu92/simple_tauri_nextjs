import React, { useEffect } from "react";
import { useImgDataStore } from "./use-img-data";
import { getNumberOfImages, getPagedImageDataByDateRange } from "@/lib/storage";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { ImageSchema } from "@/types/img-type";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export function useLoadImg() {
  const [date, setDate] = React.useState<DateRange>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [isLoading, setisLoading] = React.useState(true);
  const imgStore = useImgDataStore();
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [dataNum, setDataNum] = React.useState(0);
  const [imgInView, setImgInView] = React.useState<number>(0);
  const loadData = async () => {
    setisLoading(true);

    const data = await getPagedImageDataByDateRange(
      date.from,
      date.to,
      pageSize,
      pageNum
    );
    setDataNum(await getNumberOfImages(date.from, date.to));

    data.forEach((img) => {
      img.url = convertFileSrc(img.path);
    });
    imgStore.setImgData(data);
    setisLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [pageNum]);

  useEffect(() => {
    loadData();
  }, [pageSize]);

  return {
    data: imgStore.imgData as ImageSchema[],
    isLoading,
    reloadData: loadData,
    setPageNum,
    setPageSize,
    pageSize,
    pageNum,
    dataNum,
    setDate: setDate as React.Dispatch<
      React.SetStateAction<DateRange | undefined>
    >,
    date,
    setImgInView,
    imgInView,
  };
}
