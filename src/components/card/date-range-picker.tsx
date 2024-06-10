"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  className?: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  reloadData: () => Promise<void>;
};

export function DatePickerWithRange({
  className,
  date,
  setDate,
  reloadData,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        open={open}
        onOpenChange={(open) => setOpen(open)}
      >
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y MM-dd")} - {format(date.to, "y MM-dd")}
                </>
              ) : (
                format(date.from, "y MM-dd")
              )
            ) : (
              <span>请选择日期</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <div className='flex flex-col items-center mb-4'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              formatters={{
                formatWeekdayName: (weekday: Date) => {
                  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
                  return `${weekdays[weekday.getDay()]}`;
                },
                formatCaption: (month: Date) => {
                  return `${month.getFullYear()}年${month.getMonth() + 1}月`;
                },
              }}
            />
            <div className=' flex space-x-4'>
              <Button
                variant='outline'
                onClick={() => {
                  setDate(undefined);
                }}
              >
                清空选择
              </Button>
              <Button
                disabled={!date}
                onClick={() => {
                  setOpen(false);
                  reloadData();
                }}
              >
                确认
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
