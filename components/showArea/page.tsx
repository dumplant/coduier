import { Button } from "@/components/ui/button";
import { InvalidComponent } from "invalid-path";
import { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <InvalidComponent></InvalidComponent>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  );
}
