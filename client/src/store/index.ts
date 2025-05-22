import { atom, useAtom } from 'jotai';

export const modeAtom = atom<"light" | "dark">("dark")

export const userAtom = atom<{
  id: string;
  name: string;
  email: string;
} | null>(null);
