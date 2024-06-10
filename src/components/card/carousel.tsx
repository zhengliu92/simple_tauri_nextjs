import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Input } from "../ui/input";
import { ImageMagnifier } from "./img-magnify";

import "@/css/loading.css";
import CardLoading from "./card-loading";
import { Skeleton } from "../ui/skeleton";
import { useImgDataStore } from "@/hooks/use-img-data";

type Props = {
  isLoading: boolean;
  setPageNum: (num: number) => void;
  setPageSize: (size: number) => void;
  pageSize: number;
  pageNum: number;
  dataNum: number;
  setImgInView: (id: number) => void;
};

export function CarouselApi({
  isLoading,
  setPageNum,
  setPageSize,
  pageSize,
  pageNum,
  dataNum,
  setImgInView,
}: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState<number | undefined>(0);
  const [count, setCount] = React.useState(0);
  const imgStore = useImgDataStore();
  const data = imgStore.imgData;

  const pageList = Array.from(
    { length: Math.ceil(dataNum / pageSize) },
    (_, i) => i * pageSize + 1
  );
  const pageListStr = pageList.map((page) => `${page}-${page + pageSize - 1}`);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      const current = api.selectedScrollSnap();
      setImgInView(current);
      setCurrent(current + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    // scroll the carousel to the first item
    // api.scrollTo(0);
    setCount(data.length);
  }, [api, data]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!api) {
      return;
    }
    if (e.target.value === "") {
      setCurrent(undefined);
      return;
    }

    const value = parseInt(e.target.value, 10);
    setCurrent(value);
    // if value > count scroll to the last item
    if (value > count) {
      api.scrollTo(count - 1);
      return;
    }
    // if value > 0 scroll to the first item
    if (value <= 0) {
      api.scrollTo(0);
      return;
    }

    if (value > 0 && value <= count) {
      api.scrollTo(value - 1);
      return;
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-full max-w-xl  flex aspect-square items-center justify-center p-0 border-2 relative'>
        <CardLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='w-full h-full max-w-xl  flex aspect-square items-center justify-center p-0 border-2 relative'>
        <span className='z-20 absolute font-semibold text-2xl'>请加载数据</span>
        <Skeleton className='absolute z-10 w-full h-full inset-0 bg-black/20 rounded-none' />
      </div>
    );
  }

  return (
    <div className='w-full max-w-xl '>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {data.map((datai) => (
            <CarouselItem key={datai.id}>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-0 border-2'>
                  <div className='w-full h-full relative'>
                    {isLoading && <CardLoading />}
                    <ImageMagnifier
                      className='absolute inset-0'
                      src={datai.url!}
                      width={"100%"}
                      height={"100%"}
                      magnifierHeight={250}
                      magnifieWidth={250}
                      zoomLevel={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex justify-between '>
          <CarouselPrevious className='w-8 h-8 relative' />
          <div className='flex text-center text-sm text-muted-foreground  items-center justify-center'>
            <Input
              className='w-16 h-8 mx-2 text-center'
              onChange={onInputChange}
              value={!!current ? current.toString() : ""}
            />
            of {count}
          </div>
          <CarouselNext className='w-8 h-8 relative' />
        </div>
        <div className='mx-10 text-sm flex overflow-x-auto text-nowrap'>
          <span className=' font-semibold'>页码:</span>
          {pageListStr.map((page, index) => (
            <button
              key={index}
              className='mx-2'
              onClick={() => {
                setPageNum(index + 1);
                setImgInView(0);
              }}
            >
              {index + 1 === pageNum ? (
                <span className='text-sky-500'>{page}</span>
              ) : (
                page
              )}
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
