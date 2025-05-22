import type { ReactNode } from "react"
import { Container } from "./Container"
import type { Meta, Story } from "@ladle/react"

export const ContainerStory: Story = () => {
  return (
    <div className="bg-red-100">
    <Container className="bg-red-300 w-full h-96 3xl:mx-10 2xl:mx-8 xl:mx-6 lg:mx-4 md:mx-2 sm:mx-1">
      
    </Container>
    </div>
  )
}