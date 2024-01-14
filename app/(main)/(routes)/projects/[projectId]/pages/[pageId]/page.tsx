"use client";
import { ActionTooltip } from "@/components/action-tooltip";
import CanvasArea from "@/components/showArea.tsx/canvas-area";
import CodeArea from "@/components/showArea.tsx/code-area";
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

  const { pageId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/messages?pageId=${pageId}`);
      if (data.length < 1) {
        setMessages("export default Empty() => {return <div>暂无内容</div>}");
        setCode("export default Empty() => {return <div>暂无内容</div>}");
      } else {
        setMessages(extractCodeBlock(data[0].response));
        setCode(extractCodeBlock(data[0].response));
      }
    }
    fetchData();
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
      {showCanvas ? <CanvasArea messages={messages} /> : <CodeArea />}
    </div>
  );
};

export default page;
