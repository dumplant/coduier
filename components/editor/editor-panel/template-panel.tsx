import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { CodeContext } from "@/context/codeContext";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { Input } from "postcss";
import { useContext, useEffect, useState } from "react";
import { getHighlighter, setCDN } from "shiki";

const TemplatePanel = () => {
  const templates = [
    {
      id: "T01",
      name: "登录注册页面",
      description: "用户登录和注册的页面",
      code: "",
    },
    {
      id: "T02",
      name: "首页模板",
      description:
        "每个网站的入口页面，包含了网站的总体概览，如网站的简介，最新内容，重要链接等。",
      code: "",
    },
    {
      id: "T03",
      name: "列表页模板",
      description: "用于显示一系列相关内容的列表，如博客文章列表，产品列表等。",
      code: "",
    },
    {
      id: "T04",
      name: "用户主页模板",
      description: "用于显示用户的个人信息，用户的活动，以及与用户相关的内容。",
      code: "",
    },
    {
      id: "T05",
      name: "404错误页模板",
      description: "当用户访问的页面不存在时显示的页面。",
      code: `\`\`\`jsx const ThankYouPage = () => {
        return (
          <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-green-600">Thank You!</h1>
              <p className="text-2xl text-gray-700">Appreciate your time!</p>
            </div>
          </div>
        );
      };
      
      export default ThankYouPage;\`\`\``,
    },
  ];
  const { onOpen } = useModal();
  const { code, setCode, isCodeLoading, setSuccess } = useContext(CodeContext);

  return (
    <div className="p-4 ">
      <p className="mb-2">请选择需要的模版</p>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((c) => {
          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => setCode(c.code)}
                  className="w-[100%] p-2 bg-zinc-100 border-zinc-300 shadow rounded-sm hover:cursor-pointer"
                >
                  <div className="text-base">{c.name}</div>
                  <div className="text-sm text-zinc-500">{c.description}</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">模版信息</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">代码</Label>
                      <Textarea
                        defaultValue={c.code}
                        className="col-span-2 h-40"
                      />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
      <div
        onClick={() => onOpen("createTemplate")}
        className="flex mt-3 h-[48px] w-[100%] rounded-[24px] hover:rounded-[12px] items-center justify-center bg-zinc-100 hover:cursor-pointer"
      >
        <Plus className=" transition text-black" size={25} />
      </div>
    </div>
  );
};

export default TemplatePanel;
