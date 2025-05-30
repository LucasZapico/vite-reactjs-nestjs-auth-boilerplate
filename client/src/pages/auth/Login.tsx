import { useState } from "react";
import { Button, Input } from "@/components";
import { PrimeApi } from "@/config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const LoginPage = () => {
  const [state, setState] = useState<any>(null)
  const mutation = useMutation({
    mutationFn: async (data: any) => {
        return await PrimeApi({
          method: "post",
          url: "/auth/login",
          data,
        })
      }

  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    mutation.mutate(data);
    // Handle login logic here, e.g., API call
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm mt-4"
      >
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("passowrd")}
        />
        {/* TODO: add loading */}
        <Button>Login</Button>
        {state?.isSuccess! ? (
          <Alert>
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
        {state?.isError! ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {state.error instanceof Error
                ? state.error.message
                : "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
        {/* TODO: loading */}
      </form>
    </div>
  );
};
