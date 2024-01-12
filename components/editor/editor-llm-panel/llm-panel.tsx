import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { systemPrompt } from "@/prompt/code-gen";

const LLMPanel = () => {
  const params = useParams();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { pageId: params.pageId, projectId: params.project },
      initialMessages: [
        { id: "system", role: "system", content: systemPrompt },
      ],
    });
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <ScrollArea className="h-full">
        {messages.length !== 0 ? (
          messages
            .filter((m) => m.role !== "system")
            .map((m) => (
              <div
                className={cn(
                  "rounded-xl bg-zinc-100 text-card-foreground shadow m-2 p-2",
                  m.role !== "user" && "bg-primary/15",
                  m.role !== "user" ? "mr-8" : "ml-8"
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
