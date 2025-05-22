import { Button, Input } from "@/components";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Login</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm mt-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </form>
    </div>
  );
};
