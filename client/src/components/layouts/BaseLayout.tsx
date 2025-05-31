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
import { addBearerToken, PrimeApi } from "@/config/axios.config";
import { handleCookeis } from "@/config/features.config";

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
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
    },
    onError: (error: any) => {
      logError("Logout error", error);
    },
    onSuccess: (data: any) => {
      logInfo("Logout success", data);

      // Cookies.remove("blue_monkey_user");
      setUser(null);
      navigate("/");
    },
  });

  useEffect(() => {
    if (handleCookeis) {
      const cookieUser = Cookies.get("blue_monkey_user");

      if (!cookieUser) {
        logInfo("No user cookie found, redirecting to login");
        navigate("/auth/login");
        return;
      }
      const parsedUser = JSON.parse(cookieUser).data;
      logInfo("User cookie found", parsedUser);
      const addBearer = addBearerToken(PrimeApi, parsedUser.accessToken);
      if (addBearer) {

        setUser({
          ...parsedUser.user,
          accessToken: parsedUser.accessToken,
          refreshToken: parsedUser.refreshToken,
        });
        navigate("/home");
      }
    }
  }, []);

  useEffect(() => {
    if(!user) {
      logInfo("No user found, redirecting to login");
      navigate("/auth/login");
      return;
    } 
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Application</h1>
          <div className="flex space-x-4">
            {!user ? (
              <div className="flex space-x-2">
                <Button variant="default">
                  <Link to="/auth/signup">Signup</Link>
                </Button>
                <Button variant="secondary">
                  <Link to="/auth/login">Login</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    mutation.reset();
                    mutation.mutate(user);
                  }}
                >
                  Log Out
                </Button>
              </>
            )}

            <Button
              variant={"secondary"}
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light")
                document.documentElement.classList.toggle("dark");
              }}
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
