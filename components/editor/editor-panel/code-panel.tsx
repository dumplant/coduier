import { CodeContext } from "@/context/codeContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useContext } from "react";

const CodePanel = () => {
  const { code, setCode } = useContext(CodeContext);

  return (
    <div className="p-4">
      <ScrollArea className="h-full">{code}</ScrollArea>
    </div>
  );
};

export default CodePanel;
