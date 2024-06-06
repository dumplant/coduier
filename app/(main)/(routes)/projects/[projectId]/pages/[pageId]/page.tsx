"use client";
import { ActionTooltip } from "@/components/action-tooltip";
import CanvasArea from "@/components/showArea/canvas-area";
import CodeArea from "@/components/showArea/code-area";
import { Button } from "@/components/ui/button";
import { CodeContext } from "@/context/codeContext";
import { extractCodeBlock } from "@/utils/extract";
import axios from "axios";
import { Code, Computer, Laptop2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const page = () => {
  const [showCanvas, setShowCanvas] = useState(true);
  const [messages, setMessages] = useState(null);
  const { code, setCode, success, setSuccess } = useContext(CodeContext);
  const [pageCode, setPageCode] = useState<string>("");
  const { pageId } = useParams();
  useEffect(() => {
    async function fetchCode() {
      const { data } = await axios.get(`/api/pages/${pageId}`);
      console.log("data", data);
      setPageCode(data.code);
      setCode(data.code);
    }
    fetchCode();
  }, [pageId]);

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
      {showCanvas ? (
        <CanvasArea pageCode={pageCode} />
      ) : (
        <CodeArea pageCode={pageCode} />
      )}
    </div>
  );
};

export default page;
