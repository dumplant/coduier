"use client";
import { ActionTooltip } from "@/components/action-tooltip";
import CanvasArea from "@/components/showArea.tsx/canvas-area";
import CodeArea from "@/components/showArea.tsx/code-area";
import { Button } from "@/components/ui/button";
import { Code, Computer, Laptop2 } from "lucide-react";
import { useState } from "react";

const EditPage = () => {
  const [showCanvas, setShowCanvas] = useState(true);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="absolute top-[45%] right-0">
        <Button
          variant={"secondary"}
          onClick={() => setShowCanvas((prev) => !prev)}
        >
          {showCanvas ? (
            <ActionTooltip label="展示代码" side="left" align="center">
              <Code />
            </ActionTooltip>
          ) : (
            <ActionTooltip label="展示页面" side="left" align="center">
              <Laptop2 />
            </ActionTooltip>
          )}
        </Button>
      </div>
      {showCanvas ? <CanvasArea /> : <CodeArea />}
    </div>
  );
};

export default EditPage;
