"use client";
import { UserButton } from "@clerk/nextjs";
import { BrainCircuit, Code, Component, LucideIcon } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LLMPanel from "./editor-llm-panel/llm-panel";
import ComponentPanel from "./editor-panel/compoent-panel";
import CodePanel from "./editor-panel/code-panel";

type EditorItemKeys = "LLM" | "component" | "code";
type EditorItemProps = {
  key: EditorItemKeys;
  name: string;
  icon: LucideIcon;
  panel: () => JSX.Element;
};

const EditorSidebar = () => {
  const [selectedItemKey, setSelectedItemKey] = useState<EditorItemKeys>("LLM");
  const EditorItems: EditorItemProps[] = [
    {
      key: "LLM",
      name: "大模型生成",
      icon: BrainCircuit,
      panel: LLMPanel,
    },
    {
      key: "component",
      name: "组件",
      icon: Component,
      panel: ComponentPanel,
    },
    {
      key: "code",
      name: "代码",
      icon: Code,
      panel: CodePanel,
    },
  ];

  return (
    <div className=" flex h-full text-primary w-full bg-[#E3E5E8] ">
      <div className="flex flex-col items-center py-3">
        {EditorItems.map((item) => (
          <div key={item.name} className="mb-4">
            <ActionTooltip label={`${item.name}`} side="right" align="center">
              <button
                onClick={() => setSelectedItemKey(item.key)}
                className="group relative flex items-center"
              >
                <div
                  className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    selectedItemKey !== item.key && "group-hover:h-[20px]",
                    selectedItemKey === item.key ? "h-[36px]" : "h-[8px]"
                  )}
                />
                <div
                  className={cn(
                    "relative group flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] bg-primary/5 group-hover:rounded-[16px] transition-all",
                    selectedItemKey === item.key &&
                      "border-solid border-2 border-indigo-600 bg-primary/15 text-primary rounded-[16px]"
                  )}
                >
                  <item.icon />
                </div>
              </button>
            </ActionTooltip>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-zinc-300">
        {EditorItems.find((v) => v.key === selectedItemKey)?.panel()}
      </div>
    </div>
  );
};

export default EditorSidebar;
