import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useContext, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { systemPrompt } from "@/prompt/code-gen";
import { systemPromptJSON } from "@/prompt/json-gen";
import { CodeContext } from "@/context/codeContext";
import { MessageContext } from "@/context/messageContext";
import { refineCode } from "@/utils/refineCode";
import axios from "axios";
import { set } from "date-fns";
const LLMPanel = () => {
  const params = useParams();
  const { message } = useContext(MessageContext);
  const { code, setCode, isCodeLoading, setIsCodeLoading } =
    useContext(CodeContext);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { pageId: params.pageId, projectId: params.project },
      initialMessages:
        code == "export default Empty = () => {return <div>暂无内容</div>}"
          ? [{ id: "system", role: "system", content: systemPrompt }]
          : [
              { id: "system", role: "system", content: systemPrompt },
              {
                id: "system",
                role: "system",
                content: `这是先前的代码${code}`,
              },
            ],
    });

  useEffect(() => {
    // 从pageId获取code
    const fetchCode = async () => {
      try {
        const { data } = await axios.get(`/api/pages/${params.pageId}`);
        setCode(data.code);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCode();
  }, [params.pageId]);

  useEffect(() => {
    if (isLoading) return;
    // 从message数组中提取出代码
    const pattern = /```(\w+)?\n([\s\S]+?)\n```/g;
    const output = messages[messages.length - 1].content;
    let matches = pattern.exec(output);

    if (messages.length < 2 || !matches) {
      return;
    }
    console.log("#", matches);

    const language = matches[1];
    const codeBlock = matches[2];
    const refinedCode = refineCode(codeBlock);
    const updateCode = async (refinedCode: string) => {
      try {
        const result = await axios.patch(`/api/pages/${params.pageId}`, {
          code: refinedCode,
        });
        setCode(refinedCode);
      } catch (error) {
        console.log(error);
      }
    };
    if (
      language === undefined ||
      language === "jsx" ||
      language === "tsx" ||
      language === "json"
    ) {
      setCode(refinedCode);
      updateCode(refinedCode);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setIsCodeLoading(isLoading);
  }, [isLoading]);
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <ScrollArea className="h-full">
        {messages.length !== 0 ? (
          // // message数组逆序输出

          // message
          //   .slice()
          //   .reverse()
          //   .map((m) => (
          //     <div
          //       className={cn(
          //         "rounded-xl bg-zinc-100 w-[80%] text-card-foreground shadow m-2 p-2"
          //       )}
          //       key={m.id}
          //     >
          //       {m.content || 123}
          //       {/* {isLoading && m.role !== "user" ? (
          //         "生成中..."
          //       ) : !isLoading && m.role !== "user" && code ? (
          //         <a>生成成功，点击查看代码</a>
          //       ) : (
          //         m.content
          //       )} */}
          //     </div>
          //   ))
          messages
            .filter((m) => m.role !== "system")
            .map((m) => (
              <div
                className={cn(
                  "rounded-xl bg-zinc-100 w-[80%] shadow m-2 p-2",
                  m.role === "user" ? "ml-8" : "mr-8"
                )}
                key={m.id}
              >
                {m.content}
              </div>
            ))
        ) : (
          <div className="flex items-center h-full p-4">
            <p className="text-xs">
              请在输入框中描述你的页面，大模型会帮助你快速生成页面
            </p>
          </div>
        )}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-4 p-4">
          <Textarea
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            autoFocus
            placeholder="// 我需要生成一个xxx页面，具有xxx功能..."
            spellCheck={false}
            disabled={isLoading}
          />
          <Button disabled={isLoading}>发送</Button>
        </div>
      </form>
    </div>
  );
};

export default LLMPanel;
