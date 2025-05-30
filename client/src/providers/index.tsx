
import type { ReactNode } from "react";
import { TranstackProviders } from "./transtack.providers";

export const Providers = ({children}: {children: ReactNode}) => {
  return (
    <TranstackProviders>
      {/* Add other providers here if needed */}
      {children}
    </TranstackProviders>
  );
}