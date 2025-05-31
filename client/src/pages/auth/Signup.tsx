import { useState } from "react";
import { Button, Input } from "@/components";
import { PrimeApi } from "@/config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { logError, logInfo } from "@/utils/logger";
import {
  IoIosCheckmarkCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import Cookie from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "@/store";
import { Link, useNavigate } from "react-router";

export const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await PrimeApi({
        method: "post",
        url: "/auth/signup",
        data,
      });
    },
    onError: (error: any) => {
      logError("Signup error", error);
    },
    onSuccess: (data: any) => {
      logInfo("Signup success", data);
     
      // Cookie.set("blue_monkey_user", JSON.stringify(data));
      setUser({ ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken });
      navigate('/home')
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    mutation.mutate({ ...data, role: "USER" });
  };
  return (
    <div className="max-w-sm mx-auto w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm mt-4"
      >
        <Input
          type="username"
          placeholder="Username"
          {...register("username")}
        />

        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {/* <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        /> */}

        {/* TODO: add loading */}
        <Button>Signup</Button>
      </form>
      <Button variant="link">
        <Link to="/auth/login">Already have an account? Login</Link>
      </Button>
      {mutation?.isSuccess! ? (
        <Alert>
          <IoIosCheckmarkCircleOutline />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your signup was successful.</AlertDescription>
        </Alert>
      ) : (
        <></>
      )}
      {mutation?.isError! ? (
        <Alert variant="destructive">
          <IoIosInformationCircleOutline />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {mutation.error
              ? mutation.error?.response.data.message
              : "An unexpected error occurred."}
          </AlertDescription>
        </Alert>
      ) : (
        <></>
      )}
      {/* TODO: loading */}
    </div>
  );
};

export const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Signup</h1>
      <Signup />
    </div>
  );
};
