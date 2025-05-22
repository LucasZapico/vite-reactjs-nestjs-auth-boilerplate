import { GlobalProvider } from "@ladle/react";
import '../src/styles/index.css' 

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return <>{children}</>;
};
