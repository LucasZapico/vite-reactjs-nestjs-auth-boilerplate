import type { ReactNode } from "react"
import clsx from "clsx";

export const Container = ({children, className, ...rest}: {className?: string, children?: ReactNode}) => {

  

  return (
    <div {...rest} className={clsx("mx-auto w-full max-w-6/10 2xl:max-w-8/12 xl:max-w-9/12 lg:max-w-10/12 md:max-w-11/12 sm:max-w-12/12",  className)}>
      {children}
    </div>
  )
}