export type TSong = {
  id: number;
  title: string;
  image_path: string;
  author: string;
  user_id?: number;
  genre_id?: string;
  song_path?: string;
  public?: number;
  created_at?: string;
};
