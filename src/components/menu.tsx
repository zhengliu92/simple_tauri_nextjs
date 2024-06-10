"use client";

import { Sailboat } from "lucide-react";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";

import { MenuModeToggle } from "./menu-mode-toggle";

export function Menu() {
  return (
    <Menubar className='rounded-none border-b pl-2 lg:pl-3  bg-background shadow-sm'>
      <MenubarMenu>
        <div className='inline-flex h-fit w-fit items-center text-cyan-500'>
          <Sailboat className='h-5 w-5' />
        </div>
      </MenubarMenu>
      <MenuModeToggle />
    </Menubar>
  );
}
