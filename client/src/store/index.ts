import { atom, useAtom } from 'jotai';

export const modeAtom = atom<"light" | "dark">("dark")

export const userAtom = atom<{
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
} | null>(null);
