import { FaMoon, FaSun } from "react-icons/fa6";
import { useAtom } from "jotai";
import { modeAtom, userAtom } from "@/store";
import { BaseLayout, Button } from "@/components";
import { useEffect } from "react";
import { Outlet, redirect } from "react-router";
import { logInfo } from "@/utils/logger";

export const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  
  return (
    <BaseLayout>
     <main className="flex-grow p-4">{children ? children : <Outlet />}</main>
    </BaseLayout>
  );
};
