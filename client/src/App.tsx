import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BaseLayout, Container } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BaseLayout>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button>Button</Button>
      <Container className="bg-red-300 h-96">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Container>
    </BaseLayout>
  );
}

export default App;
