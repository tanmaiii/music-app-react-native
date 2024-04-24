export type TPlaylist = {
  id: number;
  title: string;
  desc: string;
  image_path: string;
  author: string;
  user_id?: number;
  genre_id?: string;
  public?: number;
  is_deleted?: number;
  created_at?: string;
};
