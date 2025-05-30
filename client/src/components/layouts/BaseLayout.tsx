import { FaMoon, FaSun } from "react-icons/fa6";
import { useAtom } from "jotai";
import { modeAtom, userAtom } from "@/store";
import { Button } from "@/components";
import { useEffect } from "react";
import { Link, Outlet, redirect } from "react-router";
import { logError, logInfo } from "@/utils/logger";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { PrimeApi } from "@/config/axios.config";

export const BaseLayout = ({ children }: { children?: React.ReactNode }) => {
  const [mode, setMode] = useAtom(modeAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await PrimeApi({
        method: "post",
        url: "/auth/logout",
        data,
      });
    },
    onError: (error: any) => {
      logError("Logout error", error);
    },
    onSuccess: (data: any) => {
      logInfo("Logout success", data);

      Cookie.set("blue_monkey_user", JSON.stringify(null));
      setUser(null);
      navigate("/");
    },
  });

  useEffect(() => {
    const cookieUser = Cookies.get("blue_monkey_user");
    if (!cookieUser) {
      logInfo("No user cookie found, redirecting to login");
      navigate("/auth/login");
      return;
    }
    setUser(JSON.parse(cookieUser));
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Application</h1>
          <div className="flex space-x-4">
            {!user ? (
              <div>
                <Button variant="default">
                  <Link to="/auth/signup">Signup</Link>
                </Button>
                <Button variant="secondary">
                  <Link to="/auth/login">Login</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="secondary">Log Out</Button>
              </>
            )}

            <Button
              variant={"secondary"}
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-grow p-4">{children ? children : <Outlet />}</div>
    </div>
  );
};
