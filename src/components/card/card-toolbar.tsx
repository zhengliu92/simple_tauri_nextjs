import React from "react";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { createImageData } from "@/lib/storage";
import { getImageDataFromDir } from "@/data/img-data";

type Props = {
  reloadData: () => Promise<void>;
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

const CardToolBar = ({ reloadData, date, setDate }: Props) => {
  const initData = async () => {
    const data = await getImageDataFromDir();
    await createImageData(data);
  };

  return (
    <div className='container border-b shadow-sm flex items-center mb-7 min-h-12 space-x-2 justify-between'>
      <h2 className='text-lg font-semibold w-1/5'>视觉标注</h2>
      <div className=' flex space-x-4'>
        <DatePickerWithRange
          date={date}
          setDate={setDate}
          reloadData={reloadData}
        />
        <Button
          variant='outline'
          onClick={initData}
        >
          初始化数据
        </Button>
        <Button
          variant='outline'
          disabled={!date}
          onClick={() => reloadData()}
        >
          刷新数据
        </Button>
      </div>
    </div>
  );
};

export default CardToolBar;
