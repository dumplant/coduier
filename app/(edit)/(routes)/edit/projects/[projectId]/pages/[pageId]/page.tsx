"use client";
import { ActionTooltip } from "@/components/action-tooltip";
import CanvasArea from "@/components/showArea/canvas-area";
import CodeArea from "@/components/showArea/code-area";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { CodeContext } from "@/context/codeContext";
import { MessageContext } from "@/context/messageContext";
import { extractCodeBlock } from "@/utils/extract";
import axios from "axios";
import { Code, Computer, Laptop2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const EditPage = () => {
  const [showCanvas, setShowCanvas] = useState(true);
  const [messages, setMessages] = useState(null);
  const { code, setCode, isCodeLoading, setSuccess } = useContext(CodeContext);
  const { message, setMessage } = useContext(MessageContext);
  const { pageId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/messages?pageId=${pageId}`);
      setMessages(data);
      setMessage(data);
      setCode(extractCodeBlock(data[0]?.response));
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
      {isCodeLoading ? (
        <LoadingSpinner />
      ) : showCanvas ? (
        <CanvasArea />
      ) : (
        <CodeArea />
      )}
    </div>
  );
};

export default EditPage;
