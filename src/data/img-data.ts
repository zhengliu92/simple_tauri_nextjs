import { invoke } from "@tauri-apps/api/tauri";
import { ImageSchema } from "../types/img-type";
import { addDays } from "date-fns";

const data_path =
  "E:\\Code\\proj\\material_cv\\inputs\\material_data\\Labelled";

export async function getImageDataFromDir(
  ext: string[] = ["jpg"]
): Promise<ImageSchema[]> {
  const files = await invoke<string[]>("get_files_in_dir", { dir: data_path });

  const valid_files = files.filter((file) =>
    ext.includes(file.split(".").pop() as string)
  );
  const imgData = valid_files.map((file) => {
    // create a ramdom integer between 0 and 7
    const rand = Math.floor(Math.random() * 7);
    return {
      path: data_path + "\\" + file,
      alt: file,
      pred: "good",
      val: "not known",
      createdAt: addDays(new Date(), -rand).toISOString(),
    };
  });
  console.log(imgData);

  return imgData;
}
