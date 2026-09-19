export type ProfileType = {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
  role: "anggota" | "bendahara" | "admin";
};
