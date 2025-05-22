import { FaMoon, FaSun } from "react-icons/fa6";
import { useAtom } from "jotai";
import { modeAtom, userAtom } from "@/store";
import { Button } from "@/components";
import { useEffect } from "react";
import { Outlet, redirect } from "react-router";
import { logInfo } from "@/utils/logger";

export const BaseLayout = ({ children }: { children?: React.ReactNode }) => {
  const [mode, setMode] = useAtom(modeAtom);

  

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Application</h1>
        <Button variant={"secondary"} onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          {mode === "light" ? <FaMoon /> : <FaSun/> } 
        </Button>
        </div>
      </header>
      <div className="flex-grow p-4">
        {children ? children : <Outlet/>}
      </div>
    </div>
  );
};
