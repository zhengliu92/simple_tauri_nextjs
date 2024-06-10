"use client";

import React, { useEffect } from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { CarouselApi } from "./carousel";
import CardSideBar from "./card-sidebar";
import CardToolBar from "./card-toolbar";
import { useMounted } from "@/hooks/use-mounted";
import { useLoadImg } from "@/hooks/use-load-img";
import { ImageSchema } from "@/types/img-type";

type Props = {};

const CardPage = (props: Props) => {
  const [urls, setUrls] = React.useState<string[]>([]);

  // const handler = async () => {
  //   // open for image files
  //   let files = (await open({
  //     multiple: true,
  //     filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
  //   })) as string[] | null;

  //   if (files !== null) {
  //     console.log(files);
  //     const urls = files.map((file) => convertFileSrc(file));
  //     console.log(urls);
  //     setUrls(urls);
  //   }
  // };

  const imgHandler = useLoadImg();

  useMounted();
  return (
    <>
      <div className='w-full'>
        <CardToolBar {...imgHandler} />
        <div className='flex'>
          <div className='flex flex-col w-2/3 justify-center items-center'>
            {/* <button onClick={handler}>click</button> */}
            <CarouselApi {...imgHandler} />
          </div>
          <div className='flex w-1/3'>
            <CardSideBar {...imgHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPage;
