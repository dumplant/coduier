"use client";

import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface NavigationItemProps {
  id: string;
  description: string;
  name: string;
}

export const NavigationItem = ({
  id,
  description,
  name,
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <ActionTooltip
      label={`${name}：${description}`}
      side="right"
      align="center"
    >
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.projectId !== id && "group-hover:h-[20px]",
            params?.projectId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] bg-primary/5 group-hover:rounded-[16px] transition-all",
            params?.projectId === id &&
              "border-solid border-2 border-indigo-600 bg-primary/15 text-primary rounded-[16px]"
          )}
        >
          <span>{name[0]}</span>
        </div>
      </button>
    </ActionTooltip>
  );
};
