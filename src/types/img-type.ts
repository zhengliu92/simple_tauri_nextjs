export interface ImageSchema {
  path: string;
  url?: string;
  alt: string;
  pred: string;
  val: string | undefined;
  id?: number;
  createdAt?: string;
}
