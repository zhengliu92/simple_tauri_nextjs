export type ImageType = {
  id: string;
  url: string;
  pred: "good" | "bad" | undefined;
  real: "good" | "bad" | undefined;
};

const img_path = "E:\\Code\\proj\\zhonghuansaite\\data\\1";
export const images: ImageType[] = [
  {
    id: "1",
    url: img_path + "\\Image_20240428173940559.jpg",
    pred: undefined,
    real: undefined,
  },
];
