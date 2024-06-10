import { ImageSchema } from "./../types/img-type";
import { invoke } from "@tauri-apps/api/tauri";
import Database from "tauri-plugin-sql-api";

export async function connect(): Promise<Database> {
  const db_url = await invoke<string>("get_env", { name: "DATABASE_URL" });

  if (!db_url) {
    throw new Error("No database URI provided");
  }
  return await Database.load(db_url);
}

export async function createImageData(imgDatas: ImageSchema[]) {
  const db = await connect();
  if (!db) {
    console.warn("Database not connected");
    return;
  }
  imgDatas.forEach(async (imgData) => {
    await db.execute(
      "INSERT INTO images (path, alt, pred, val,createdAt ) VALUES ($1, $2, $3, $4, $5)",
      [imgData.path, imgData.alt, imgData.pred, imgData.val, imgData.createdAt]
    );
  });
}

export async function getImageData(): Promise<ImageSchema[]> {
  const db = await connect();
  if (!db) {
    console.warn("Database not connected");
    return [];
  }
  const res = (await db.select("SELECT * FROM images")) as ImageSchema[];
  return res;
}

export async function getPagedImageDataByDateRange(
  startDate: Date | undefined,
  endDate: Date | undefined,
  pageSize: number = 20,
  pageNumber: number = 1
): Promise<ImageSchema[]> {
  const db = await connect();
  if (!db) {
    console.warn("Database not connected");
    return [];
  }
  const res = (await db.select(
    "SELECT * FROM images WHERE createdAt BETWEEN $1 AND $2 LIMIT $3 OFFSET $4",
    [startDate, endDate, pageSize, (pageNumber - 1) * pageSize]
  )) as ImageSchema[];

  return res;
}

export async function getNumberOfImages(
  startDate: Date | undefined,
  endDate: Date | undefined
): Promise<number> {
  const db = await connect();
  if (!db) {
    console.warn("Database not connected");
    return 0;
  }
  const res = (await db.select(
    "SELECT COUNT(*) as count FROM images WHERE createdAt BETWEEN $1 AND $2",
    [startDate, endDate]
  )) as {
    count: number;
  }[];

  return res[0].count;
}

export async function updateVal(id: number, val: string) {
  const db = await connect();
  if (!db) {
    console.warn("Database not connected");
    return;
  }
  await db.execute("UPDATE images SET val = $1 WHERE id = $2", [val, id]);
}
