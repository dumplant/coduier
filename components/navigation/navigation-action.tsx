"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="left" align="center" label="添加一个项目">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createProject")}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background  group-hover:bg-black">
            <Plus
              className="group-hover:text-white transition text-black"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
