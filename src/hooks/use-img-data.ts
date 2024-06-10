import { ImageSchema } from "@/types/img-type";
import { create } from "zustand";

type ImgDataStore = {
  imgData: ImageSchema[];
  setImgData: (data: ImageSchema[]) => void;
};

export const useImgDataStore = create<ImgDataStore>((set) => ({
  imgData: [],
  setImgData: (imgData: ImageSchema[]) => set({ imgData }),
}));
