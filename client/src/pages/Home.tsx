import { PrimeApi } from "@/config/axios.config";
import { userAtom } from "@/store";
import { logInfo } from "@/utils/logger";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const HomePage = () => {
  const [user] = useAtom(userAtom);
  const { isPending, isError, data, error } = useQuery(
    {
      queryKey: ["userInfo"],
      queryFn: () =>
        PrimeApi({
          method: "post",
          url: "/users/profile",
          data: {
            email: user?.email,
          },
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
    },
  );

  useEffect(() => {
    logInfo("HomePage useQuery", {
      isPending,
      isError,
      data,
      error,
    });
  }, [isError, data, error]);

  useEffect(() => {
    logInfo("HomePage useEffect user", user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl ">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg">This is a simple home page.</p>
    </div>
  );
};
